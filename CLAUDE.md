# BetterGoogleMeets

Chrome extension + FastAPI backend that turns live Google Meet captions into a shared,
votable agenda tree. Captions are distilled into ideas by a local LLM, staged as proposals
against a Merkle DAG (the "Arbor"), and merged in once named participants vote them to
consensus -- a git branch/PR/merge model applied to meeting deliberation. See the
project's working doc (linked in recent session notes) for the full architecture writeup,
research citations, and LAN deployment plan; this file is the quick-start for working in
the code.

## Layout

```
better-google-meets/
  backend/            FastAPI app, SQLite persistence, LLM gateway, deliberation engine
  frontend/           React + Vite side-panel UI (builds into chrome-extension/dist/)
  chrome-extension/   Manifest V3 extension: content.js, background.js, dist/ (built UI)
```

## Running it locally

**LM Studio** (LLM backend, must be running with a model actually loaded -- not just the
server started):
```
lms load qwen/qwen2.5-coder-14b --context-length 31488 --gpu max
```
Starting LM Studio's server alone is not enough: if no model is loaded, every chat
completion 400s with "No models loaded," which the backend surfaces as a 503 (see Gotchas).

**Backend** (port 8000, binds `0.0.0.0` by default so it's LAN-reachable):
```
cd better-google-meets/backend
py -3.11 app.py
```

**Frontend dev server** (port 5173) -- only useful for iterating on the React UI in a
plain browser tab. The packaged extension does **not** use it; the side panel loads the
built `chrome-extension/dist/index.html` directly.
```
cd better-google-meets/frontend
npm run dev
```

**Rebuild the extension's UI** after any frontend change -- the side panel will keep
showing the old build otherwise, silently:
```
cd better-google-meets/frontend
npm run build   # tsc && vite build; writes straight into ../chrome-extension/dist/
```

**Load the extension**: `chrome://extensions` -> Developer mode -> Load unpacked ->
`better-google-meets/chrome-extension/`.

**Tests**:
```
cd better-google-meets/backend
py -3.11 -m pytest tests/ -q
```

## Architecture

- `backend/app.py` -- FastAPI routes, WebSocket hub, request/response schemas.
- `backend/models/tree.py` -- `MerkleDAG`: content-hashed nodes, multi-parent merges,
  deterministic state hash. The canonical shared tree, one per `meeting_id`.
- `backend/services/deliberation.py` -- LLM-facing logic: speech distillation, batch idea
  extraction, proposal conflict analysis (Habermas-style compromise synthesis), text
  transforms (knead/stretch).
- `backend/services/llm_gateway.py` -- calls LM Studio's OpenAI-compatible REST API
  directly, extracts JSON from the response, LRU-caches completions.
- `backend/services/session_manager.py` -- in-memory `MerkleDAG` sessions backed by
  SQLite, one per `meeting_id`.
- `backend/core/database.py` -- SQLite (WAL mode), zero external dependencies. Migrations
  are inline `try/except sqlite3.OperationalError` `ALTER TABLE` calls in `_init_schema_sync`.
- `frontend/src/hooks/useArbor.ts` -- all client state for the tree, slate cards, and
  pending proposals; owns the WebSocket event handling.
- `frontend/src/services/api.ts` -- every backend call, plus the LAN-configurable backend
  URL resolution (`chrome.storage.sync`-backed, Settings modal writes it).
- `chrome-extension/content.js` -- Meet caption DOM scraping, speaker attribution,
  debounced dispatch to the backend.

## Conventions specific to this project

- **Zero heuristic fallbacks.** If the LLM call fails, raise `RuntimeError` -> the route
  catches it and returns HTTP 503. Never silently substitute a canned response or guess.
  This extends to provider substitution: the LLM gateway calls LM Studio only, no silent
  proxy to a different local runtime -- a broken primary should be visible, not masked.
- **`provider_used` in every LLM-touched response** must reflect what actually answered
  (`"lm_studio"`, `"cache"`, `"filter"` for the lexical noise pre-filter, or `"gemini_flash"`
  if that optional cloud fallback is configured). Never fake this field.
- **The backend, not the frontend, is the authority on consensus.** Vote tallies and the
  decision to merge a proposal into the tree happen server-side (`POST /proposal/vote`)
  and are broadcast to every attendee via WebSocket. Do not reintroduce client-side vote
  counting or client-triggered merges -- that was a real bug (see Gotchas) that made votes
  invisible across browsers.
- **An unmerged proposal is never deleted.** Ideas short of consensus stay queryable via
  `GET /proposals` indefinitely; this is a deliberate product requirement ("no idea is
  ever lost"), not an oversight to clean up.

## Gotchas (found the hard way this session)

- **A model must be loaded into LM Studio, not just the server running.** `lms ps` shows
  what's actually loaded; `/v1/models` only lists what's *available*, which is misleading.
- **Reasoning-style local models (e.g. Gemma-4's E2B/E4B) emit a hidden chain-of-thought**
  in a separate `reasoning_content` field before the JSON answer lands in `content`. A
  `max_tokens` budget tuned for a direct-answer model (Qwen) will cut a reasoning model off
  mid-thought, so `content` comes back empty -- which `distill_speech` currently treats as
  noise, not an error. `deliberation.py`'s token budgets are deliberately generous (500-1000)
  for this reason; don't tighten them without checking against a reasoning model.
- **The chrome extension's side panel loads a static build**, `chrome-extension/dist/index.html`,
  wired via `manifest.json`'s `side_panel.default_path` -- not a dev server. Editing
  `frontend/src` does nothing to the running extension until `npm run build` runs again.
- **Backend URL is configurable, not hardcoded**, via the Settings modal ->
  `chrome.storage.sync` -> read by `content.js`, `background.js`, and `frontend/src/services/api.ts`.
  This exists so the same extension build can point at a shared LAN host during beta
  testing instead of `127.0.0.1`. `manifest.json`'s host permission is `http://*:8000/*`
  (any host, backend's fixed port) to cover that without needing per-IP permission edits.

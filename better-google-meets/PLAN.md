# BetterGoogleMeets: Architectural Specification & Implementation Plan

> **Epistemic Version Control & Real-Time Deliberation for Video Conferencing**  
> Grounded in HCI & AI Frontier Literature (CHI, CSCW, UIST, Science, ACL)

---

## 1. Executive Overview

**BetterGoogleMeets** transforms video meetings from ephemeral audio streams into an immutable, structured knowledge graph. It implements a Git-inspired **Branch-Commit-Merge** protocol for human deliberation:
- **Private Thoughts Stay Private**: Thoughts and speech utterances materialize on a personal, sandboxed **Slate** (*Upwelling* draft layer) without social inhibition ("fishbowl effect").
- **Candidate Proposals Branch Transparently**: When staged, proposals appear on a shared **Main Stage** as translucent, pulsing **Ghost Sprouts** (*Patchwork* media branching).
- **Automated Conflict & Compromise Synthesis**: When ideas clash, the engine detects semantic collisions and synthesizes integrative compromises (*Habermas Machine*, Science 2024).
- **Cryptographic Merkle Consensus**: Upon peer approval, nodes solidify into the canonical tree, generating a deterministic SHA-256 state hash for verifiable decision provenance (*MedBeads/ConLoc*).

---

## 2. High-Efficiency Dual-Engine LLM Architecture

To balance privacy, zero marginal cost, and massive production scalability, the backend implements a **Dual-Engine LLM Gateway**:

```
                                  Client Request
                                        │
                                        ▼
                             ┌─────────────────────┐
                             │  Prompt Hash Check  │ ───[ Cache Hit ]───► Return in <1ms (0 tokens)
                             │  (SHA-256 LRU Cache)│
                             └──────────┬──────────┘
                                        │ [ Cache Miss ]
                                        ▼
                             ┌─────────────────────┐
                             │   Provider Router   │
                             └──────────┬──────────┘
                                        │
                 ┌──────────────────────┴──────────────────────┐
                 ▼                                             ▼
     [ENGINE 1: LOCAL LM STUDIO]                  [ENGINE 2: GOOGLE GEMINI FLASH]
     • URL: http://localhost:1234/v1              • Model: gemini-2.5-flash / 1.5-flash
     • Format: OpenAI-Compatible REST             • Official Google REST API / google-genai
     • Cost: $0.00 (Zero marginal cost)           • Cost: ~$0.075 / 1M tokens ($0.002 / meeting)
     • Latency: ~80-200ms on RTX GPU              • Latency: ~150-250ms worldwide
     • Privacy: 100% Air-gapped on device         • Scale: Millions of concurrent users
                 │                                             ▲
                 │ [If Unreachable / Times Out > 3s]           │
                 └───────────────── Auto-Fallback ─────────────┘
```

### Key Efficiency & Cost Optimizations:
1. **In-Memory LRU Semantic Cache**: Common analysis prompts (e.g. standard classification turns, repeated node queries) are cached via SHA-256 keying. Hit response time: $<1\text{ms}$ with zero token consumption.
2. **Compact Output Constraints**: All system prompts enforce concise, strict JSON schemas capped at $\le 150$ tokens. Output latency drops to $<500\text{ms}$.
3. **Lexical / Semantic Pre-Filtering**: When diffing candidate proposals against the tree, proposals with $<0.25$ lexical overlap bypass deep LLM conflict analysis, eliminating up to 60% of unnecessary API calls.
4. **Auto-Fallback Resilience**: If local LM Studio is offline or crashes, queries seamlessly roll over to Gemini Flash without raising user-facing errors.

---

## 3. Production Scaling Matrix

| Metric | Local LM Studio | Google Gemini 2.5 Flash | Groq LPU (Llama 3.3 70B) | Dedicated vLLM on GCP (L4) |
|---|---|---|---|---|
| **Cost per 1M Tokens** | **$0.00** | **$0.075 input / $0.30 output** | $0.59 | ~$0.70/hr (Fixed server) |
| **Average Cost per 30m Meeting** | **$0.00** | **~$0.0018** | ~$0.012 | Amortized across streams |
| **Typical Latency (TTFT)** | ~80–180ms | ~150–220ms | ~40–80ms | ~60–120ms |
| **Throughput / Concurrency** | 1–4 local streams | Unlimited | Enterprise tiered | 50–80 concurrent streams |
| **Deployment Target** | Individual devs / confidential | **Default Cloud Production** | Ultra-low-latency agents | Self-hosted enterprise cluster |

---

## 4. Directory Structure

```
better-google-meets/
├── PLAN.md                     # This document
├── backend/
│   ├── app.py                  # FastAPI REST + WebSocket server
│   ├── config.py               # Environment configuration (.env support)
│   ├── requirements.txt        # Backend dependencies
│   ├── models/
│   │   └── tree.py             # MerkleDAG, IdeaNode, NodeType, ProposalDiff
│   ├── services/
│   │   ├── llm_gateway.py      # Dual-Engine Router (LM Studio + Gemini Flash + LRU Cache)
│   │   └── deliberation.py     # DeliberationEngine (Branch-Commit-Merge, Habermas synthesis)
│   └── tests/
│       ├── test_llm_gateway.py # Gateway fallback, cache, and token tests
│       ├── test_deliberation.py# Conflict detection and Merkle state tests
│       └── test_api.py         # REST & WebSocket endpoint tests
│
└── frontend/
    ├── package.json            # React 18, Vite, TypeScript, TailwindCSS, Lucide
    ├── vite.config.ts          # Vite configuration with proxy to backend :8000
    ├── tailwind.config.js      # Dark obsidian theme configuration
    ├── public/
    │   └── manifest.json       # Google Meet Add-on deployment manifest
    └── src/
        ├── App.tsx             # Dual-mode view: Meet Side-Panel vs Main-Stage vs Standalone
        ├── types/
        │   └── tree.ts         # TypeScript models matching backend MerkleDAG
        ├── services/
        │   ├── api.ts          # REST & WebSocket client
        │   └── meetSdk.ts      # Meet Add-on SDK bindings with browser fallback
        ├── hooks/
        │   ├── useWebSocket.ts # Live sync with auto-reconnect
        │   └── useArbor.ts     # Tree state management hook
        └── components/
            ├── SidePanel.tsx   # Personal Slate (Upwelling drafts, Texterial actions)
            ├── MainStage.tsx   # Shared Merkle Arbor (Force graph, ghost sprouts)
            ├── SettingsModal.tsx # Engine selector (LM Studio vs Gemini Flash)
            └── ProvenanceBar.tsx # Cryptographic SHA-256 Merkle root & export
```

---

## 5. Testing & Verification Playbook

### Step 1: Automated Unit & Integration Tests (Backend)
Run the automated pytest suite:
```bash
cd better-google-meets/backend
py -3.11 -m pytest -v tests/
```
**Verification Points**:
- `test_llm_gateway`: Confirms cache hits, LM Studio ping check, and Gemini Flash fallback.
- `test_deliberation`: Validates proposal diffing, conflict detection, Habermas synthesis, and Merkle root calculation.
- `test_api`: Tests `/health`, `/tree`, `/slate/ingest`, `/proposal/analyze`, `/proposal/merge`, and `/ws`.

### Step 2: Running the Local Fullstack Environment
1. **Start the Backend**:
   ```bash
   cd better-google-meets/backend
   py -3.11 -m uvicorn app:app --host 0.0.0.0 --port 8000 --reload
   ```
2. **Start the Frontend**:
   ```bash
   cd better-google-meets/frontend
   npm install
   npm run dev
   ```
3. Open `http://localhost:5173` in your browser.

### Step 3: Interactive Verification Flow
1. **Ingest Thought**: In the **Side Panel**, type `"We should deploy regional Redis caches to maintain sub-15ms latency"` and click **Add Thought**.
   - Verify card is color-coded **[PROPOSAL]** (Gold).
2. **Texterial Transform**: Click **Knead** on the card $\to$ verify text condenses into an executive summary.
3. **Stage to Arbor**: Click **Stage to Arbor ➔**.
   - Verify a translucent, pulsing **Ghost Sprout** appears on the **Main Stage**.
   - Verify an inline **Trade-Off Pill** displays alignment score and conflict evaluation.
4. **Habermas Conflict Synthesis**: Add a conflicting card: `"Zero budget for dedicated cache instances"` $\to$ stage it $\to$ verify the **Habermas Machine** synthesizes an integrative compromise statement.
5. **Consensus Voting**: Click **Approve (Vote)** on the Ghost Sprout until the threshold (3 votes) is met.
   - Verify the Ghost Sprout **solidifies** into a canonical solid node.
   - Verify the **Merkle State Hash** at the bottom changes deterministically.
6. **Engine Switching**: Open **Settings (⚙)**, toggle between **Local LM Studio** and **Gemini Flash**, and verify live latency and engine connectivity.
7. **Export Decision Record**: Click **Export Record** in the Provenance Bar $\to$ download the immutable JSON/Markdown audit artifact.

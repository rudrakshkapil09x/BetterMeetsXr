import os
import re

# 1. Patch deliberation.py
delib_path = os.path.join("better-google-meets", "backend", "services", "deliberation.py")
with open(delib_path, "r", encoding="utf-8") as f:
    delib_content = f.read()

# Replace is_noise function
is_noise_pattern = r"def is_noise\(text: str\) -> bool:[\s\S]*?return False"
new_is_noise = '''def is_noise(text: str) -> bool:
    if not text:
        return True
    clean = text.strip().lower()
    if len(clean) < 2:
        return True
    if clean in {"um", "uh", "hmm", "ah", "er", "like"}:
        return True
    if clean in UI_BLACKLIST_KEYWORDS:
        return True
    return False'''

delib_content = re.sub(is_noise_pattern, new_is_noise, delib_content, count=1)

# In distill_speech, ensure no substantive turn is rejected as noise
rejection_pattern = r"# If LLM classified as noise, or returned an empty distilled text[\s\S]*?return \{[\s\S]*?\"provider_used\": provider\s*\}"
new_rejection = '''# Ensure user idea is preserved and distilled text is never empty
        if not distilled:
            distilled = raw_transcript.strip()
        if not extracted_query:
            extracted_query = distilled'''

delib_content = re.sub(rejection_pattern, new_rejection, delib_content, count=1)

with open(delib_path, "w", encoding="utf-8", newline="\n") as f:
    f.write(delib_content)
print("Successfully patched deliberation.py")

# 2. Patch app.py
app_path = os.path.join("better-google-meets", "backend", "app.py")
with open(app_path, "r", encoding="utf-8") as f:
    app_content = f.read()

# In ingest_speech, eliminate ignored_noise dropping
ingest_noise_pattern = r"if card_info\.get\(\"is_noise\"\):[\s\S]*?return \{[\s\S]*?\"status\": \"ignored_noise\",[\s\S]*?\"reason\": card_info\.get\(\"reason\", \"Filtered by epistemic noise layer\"\)\s*\}"
new_ingest_noise = '''if card_info.get("is_noise") or not card_info.get("distilled_text"):
        card_info["is_noise"] = False
        card_info["distilled_text"] = req.transcript.strip()
        card_info["intent"] = card_info.get("intent") or "claim"
        card_info["extracted_query"] = req.transcript.strip()
        card_info["reason"] = "User explicit input materialized"'''

app_content = re.sub(ingest_noise_pattern, new_ingest_noise, app_content, count=1)

# Add seed-demo endpoint before config routes if not already present
if "/session/seed-demo" not in app_content:
    seed_endpoint_code = '''
@app.post("/session/seed-demo")
async def seed_demo_scenario(meeting_id: str = Query("meet-session-01")):
    """
    Seeds a rich, realistic Smart City Disaster mitigation scenario with:
    - 10 structured Merkle tree nodes (goals, topics, actions, claims, evidence, questions)
    - 3 active pending Ghost Sprouts with trade-offs, consensus votes, and semantic conflict
    - 5 materialized Tangible Slate cards for immediate stretch / knead interaction
    """
    from models.tree import NodeType

    # Reset DAG with rich emergency scenario root
    root_title = "Smart City Disaster Protocol: Category 4 Flash Flood & Power Grid Decoupling"
    dag = await session_manager.reset_dag(meeting_id=meeting_id, goal_title=root_title, author="Alice (Director)")
    root_id = dag.root_id

    # Branch 1: Substation Isolation & Hospital Life Support
    n1 = dag.add_node(
        parent_id=root_id,
        text="Isolate Substation Alpha-9 Cold Disconnect",
        node_type=NodeType.ACTION,
        author="Bob (Grid Chief)"
    )
    dag.add_node(
        parent_id=n1.id,
        text="Hospital trauma center grid secured with zero interruption",
        node_type=NodeType.CLAIM,
        author="Bob (Grid Chief)"
    )
    dag.add_node(
        parent_id=n1.id,
        text="Substation vault telemetry confirms flood breach in 45 minutes",
        node_type=NodeType.EVIDENCE,
        author="Alice (Director)"
    )

    # Branch 2: Subway Evacuation & Tunnel Pumps
    n2 = dag.add_node(
        parent_id=root_id,
        text="Subterranean Transit Evacuation & Flood Containment",
        node_type=NodeType.PROPOSAL,
        author="Charlie (Transit Safety)"
    )
    dag.add_node(
        parent_id=n2.id,
        text="Divert 1,200 platform commuters through elevated North Exit (4m above flood line)",
        node_type=NodeType.ACTION,
        author="Charlie (Transit Safety)"
    )
    dag.add_node(
        parent_id=n2.id,
        text="How many minutes required before complete platform clearance?",
        node_type=NodeType.QUESTION,
        author="You"
    )
    dag.add_node(
        parent_id=n2.id,
        text="Pneumatic Bulkhead Seal at Portal 2 triggers at T+25 minutes",
        node_type=NodeType.ACTION,
        author="Alice (Director)"
    )

    # Branch 3: Mobile Mesh & Drone Photogrammetry
    n3 = dag.add_node(
        parent_id=root_id,
        text="Mobile Mesh Satellite Telemetry & Drone Photogrammetry",
        node_type=NodeType.PROPOSAL,
        author="You"
    )
    dag.add_node(
        parent_id=n3.id,
        text="NeRF point cloud reconstructs river basin flood lines in <60 seconds",
        node_type=NodeType.CLAIM,
        author="You"
    )
    dag.add_node(
        parent_id=n3.id,
        text="Field test confirms 99.98% packet delivery over LoRaWAN mesh fallback",
        node_type=NodeType.EVIDENCE,
        author="Charlie (Transit Safety)"
    )

    await session_manager.persist_dag(dag)

    # Clear prior votes, ghost proposals, and slates for this meeting
    with db._get_connection() as conn:
        c = conn.cursor()
        c.execute("DELETE FROM votes WHERE meeting_id = ?", (meeting_id,))
        c.execute("DELETE FROM proposal_diffs WHERE meeting_id = ?", (meeting_id,))
        c.execute("DELETE FROM speech_slates WHERE meeting_id = ?", (meeting_id,))
        conn.commit()

    # Seed 3 Pending Ghost Sprouts
    ghost_1 = {
        "proposal_id": "pr_sprout_bess",
        "parent_id": n1.id,
        "text": "Reroute subterranean drainage pumps to North Terminal 2.5MW BESS battery before grid cut",
        "author": "Alice",
        "node_type": "proposal",
        "has_conflict": False,
        "conflict_reason": "No semantic collision; aligns with emergency power conservation plan.",
        "trade_off_analysis": "Preserves life-critical tunnel sump pumps for 3.5 hours without back-feeding flooded transformers.",
        "compromise_synthesis": None
    }
    await db.save_proposal_diff(ghost_1, meeting_id=meeting_id)
    await db.record_vote(meeting_id=meeting_id, proposal_id="pr_sprout_bess", voter="Alice")
    await db.record_vote(meeting_id=meeting_id, proposal_id="pr_sprout_bess", voter="You")

    ghost_2 = {
        "proposal_id": "pr_sprout_drones",
        "parent_id": n3.id,
        "text": "Deploy automated thermal tracking drones to inspect structural bridge integrity",
        "author": "Bob",
        "node_type": "action",
        "has_conflict": False,
        "conflict_reason": "Complements spatial drone telemetry branch.",
        "trade_off_analysis": "Provides immediate structural risk maps, but drains drone battery fleet 15% faster.",
        "compromise_synthesis": None
    }
    await db.save_proposal_diff(ghost_2, meeting_id=meeting_id)
    await db.record_vote(meeting_id=meeting_id, proposal_id="pr_sprout_drones", voter="Bob")

    ghost_3 = {
        "proposal_id": "pr_sprout_sandbag",
        "parent_id": n2.id,
        "text": "Manual sandbag diversion at Portal 1 egress ramp",
        "author": "Charlie",
        "node_type": "proposal",
        "has_conflict": True,
        "conflict_reason": "Hazard Warning: Semantic collision with automated North Exit diversion; personnel risk in lower ramp.",
        "trade_off_analysis": "Provides physical water barrier but exposes response teams to rising flash flood waters.",
        "compromise_synthesis": "Replace manual crews with remote-triggered rapid expansion flood barriers."
    }
    await db.save_proposal_diff(ghost_3, meeting_id=meeting_id)
    await db.record_vote(meeting_id=meeting_id, proposal_id="pr_sprout_sandbag", voter="Charlie")

    # Seed 5 Tangible Slate Cards
    slates = [
        ("Alice", "Authorize emergency drone deployment for real-time flood barrier photogrammetry", "Authorize emergency drone deployment for real-time flood barrier photogrammetry", "proposal"),
        ("Bob", "Verify transformer oil temperature telemetry before initiating cold disconnect sequence", "Verify transformer oil temperature telemetry before initiating cold disconnect", "claim"),
        ("Charlie", "Deploy automated audio PA broadcast to guide remaining platform passengers", "Deploy automated audio PA broadcast to guide remaining platform passengers", "action"),
        ("You", "Establish dynamic 3D exclusion zones around structurally unstable bridges", "Establish dynamic 3D exclusion zones around structurally unstable bridges", "claim"),
        ("You", "Integrate real-time flood sensor depth readings directly into the spatial roundtable", "Integrate real-time flood sensor depth readings directly into spatial roundtable", "proposal"),
    ]
    for spk, raw, dist, intent in slates:
        await db.save_speech_slate(meeting_id=meeting_id, speaker=spk, transcript=raw, distilled_text=dist, intent=intent)

    export = dag.export_json()
    await hub.broadcast(meeting_id, {
        "event": "TREE_RESET",
        "state_hash": export["state_hash"],
        "revision": export["revision"],
        "data": export,
        "timestamp": time.time()
    })

    return {
        "status": "seeded",
        "meeting_id": meeting_id,
        "nodes_count": len(dag.nodes),
        "ghost_count": 3,
        "slate_count": 5
    }
'''
    # Insert before config routes
    app_content = app_content.replace('@app.get("/config/engine")', seed_endpoint_code + '\n\n@app.get("/config/engine")')

# Auto-seed in /tree endpoint if tree has <= 1 node
auto_seed_check = '''@app.get("/tree")
async def get_tree_state(meeting_id: str = Query("meet-session-01")):
    dag = await session_manager.get_or_create_dag(meeting_id)
    if len(dag.nodes) <= 1 and meeting_id == "meet-session-01":
        await seed_demo_scenario(meeting_id=meeting_id)
        dag = await session_manager.get_or_create_dag(meeting_id)
    return dag.export_json()'''

app_content = re.sub(r'@app\.get\("/tree"\)[\s\S]*?return dag\.export_json\(\)', auto_seed_check, app_content, count=1)

with open(app_path, "w", encoding="utf-8", newline="\n") as f:
    f.write(app_content)
print("Successfully patched app.py")

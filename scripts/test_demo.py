import requests

print("1. Testing POST /session/seed-demo...")
r = requests.post("http://127.0.0.1:8000/session/seed-demo?meeting_id=meet-session-01")
print("Seed response:", r.json())

print("\n2. Testing GET /tree...")
t = requests.get("http://127.0.0.1:8000/tree?meeting_id=meet-session-01").json()
print("Total nodes:", len(t.get("nodes", {})))
for nid, n in t.get("nodes", {}).items():
    print(f" - [{nid}] ({n['node_type']}) {n['author']}: {n['text'][:65]}...")

print("\n3. Testing GET /proposals...")
p = requests.get("http://127.0.0.1:8000/proposals?meeting_id=meet-session-01").json()
print("Proposals count:", len(p.get("proposals", [])))
for pr in p.get("proposals", []):
    print(f" - [{pr['proposal_id']}] Parent: {pr['parent_id']} Votes: {pr['votes']} Conflict: {pr['has_conflict']} -> {pr['text'][:55]}...")

print("\n4. Testing GET /slate...")
s = requests.get("http://127.0.0.1:8000/slate?meeting_id=meet-session-01").json()
print("Slate cards count:", len(s.get("cards", [])))
for sc in s.get("cards", []):
    print(f" - [{sc['id']}] {sc['speaker']} ({sc['intent']}): {sc['distilledText'][:55]}...")

print("\n5. Testing Ingestion with short/direct input...")
ing = requests.post("http://127.0.0.1:8000/slate/ingest", json={
    "speaker": "You",
    "transcript": "Deploy edge drones now",
    "meeting_id": "meet-session-01"
}).json()
print("Ingestion result:", ing)

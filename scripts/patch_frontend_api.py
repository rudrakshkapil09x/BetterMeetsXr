import os

api_path = os.path.join("better-google-meets", "frontend", "src", "services", "api.ts")
with open(api_path, "r", encoding="utf-8") as f:
    content = f.read()

seed_func = '''
export async function seedDemoScenario(): Promise<{ status: string; meeting_id: string; nodes_count: number; ghost_count: number; slate_count: number }> {
  const API_BASE = await getApiBase();
  const res = await fetch(`${API_BASE}/session/seed-demo?meeting_id=${encodeURIComponent(getActiveMeetingId())}`, {
    method: 'POST'
  });
  if (!res.ok) throw new Error(`Seed demo failed: ${res.statusText}`);
  return res.json();
}
'''

if "seedDemoScenario" not in content:
    content = content.rstrip() + "\n" + seed_func
    with open(api_path, "w", encoding="utf-8", newline="\n") as f:
        f.write(content)
    print("Added seedDemoScenario to api.ts")
else:
    print("seedDemoScenario already present in api.ts")

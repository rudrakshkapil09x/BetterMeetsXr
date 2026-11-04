import os

path = os.path.join("better-google-meets", "frontend", "src", "App.tsx")
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

old_state = "const [viewMode, setViewMode] = useState<'dual' | 'sidePanel' | 'mainStage' | 'vr'>('dual');"
new_state = """const [viewMode, setViewMode] = useState<'dual' | 'sidePanel' | 'mainStage' | 'vr'>(() => {
    if (typeof window !== 'undefined') {
      const p = new URLSearchParams(window.location.search).get('mode');
      if (p === 'vr') return 'vr';
      if (p === 'sidePanel') return 'sidePanel';
      if (p === 'mainStage') return 'mainStage';
    }
    return 'dual';
  });"""

content = content.replace(old_state, new_state)

with open(path, "w", encoding="utf-8", newline="\n") as f:
    f.write(content)
print("Updated App.tsx to support ?mode=vr query parameter")

import os

path = os.path.join("better-google-meets", "frontend", "src", "App.tsx")
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

# Add seedScenario to useArbor destructuring
content = content.replace(
    "    resetMeetingTree,\n    isConnected,",
    "    resetMeetingTree,\n    seedScenario,\n    refreshTree,\n    isConnected,"
)

# Pass onSeedDemo to ArborXR
content = content.replace(
    "              lastRevision={lastRevision}\n            />",
    "              lastRevision={lastRevision}\n              onSeedDemo={seedScenario}\n            />"
)

with open(path, "w", encoding="utf-8", newline="\n") as f:
    f.write(content)
print("Successfully patched App.tsx")

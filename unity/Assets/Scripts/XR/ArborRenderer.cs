using System.Collections.Generic;
using UnityEngine;
using TMPro;
using BetterMeetsXR.Models;

namespace BetterMeetsXR.XR
{
    /// <summary>
    /// Renders the 3D Canonical Arbor at the center of the virtual meeting table.
    /// Manages 3D nodes, curved Bezier branches, and pulsating Ghost Sprouts.
    /// </summary>
    public class ArborRenderer : MonoBehaviour
    {
        [Header("Anchors & Prefabs")]
        [SerializeField] private Transform tableCenterAnchor;
        [SerializeField] private GameObject nodePrefab;
        [SerializeField] private GameObject ghostSproutPrefab;
        [SerializeField] private GameObject branchConnectorPrefab;

        [Header("Radial Tree Layout Settings")]
        [SerializeField] private float levelHeight = 0.28f;
        [SerializeField] private float baseRadius = 0.32f;
        [SerializeField] private float radiusPerDepth = 0.16f;

        private Dictionary<string, GameObject> activeNodeObjects = new();
        private Dictionary<string, GameObject> activeSproutObjects = new();
        private List<GameObject> activeBranchLines = new();

        public void UpdateTree(TreeSnapshot snapshot)
        {
            if (snapshot == null || snapshot.nodes == null) return;

            // Clear previous branches
            foreach (var b in activeBranchLines) Destroy(b);
            activeBranchLines.Clear();

            // Simple radial positioning: root at center, children radiating outward
            int nodeIndex = 0;
            int totalNodes = snapshot.nodes.Count;

            foreach (var kvp in snapshot.nodes)
            {
                IdeaNode node = kvp.Value;
                int depth = node.parent_ids != null && node.parent_ids.Count > 0 ? 1 : 0;
                float angle = (nodeIndex / (float)Mathf.Max(totalNodes, 1)) * 2f * Mathf.PI;
                float r = depth == 0 ? 0 : baseRadius + depth * radiusPerDepth;

                Vector3 targetPosition = tableCenterAnchor.position + new Vector3(
                    Mathf.Sin(angle) * r,
                    0.15f + depth * levelHeight,
                    Mathf.Cos(angle) * r
                );

                if (!activeNodeObjects.TryGetValue(node.id, out GameObject nodeObj))
                {
                    nodeObj = Instantiate(nodePrefab, targetPosition, Quaternion.identity, transform);
                    activeNodeObjects[node.id] = nodeObj;
                }
                else
                {
                    nodeObj.transform.position = targetPosition;
                }

                // Update text
                var tmp = nodeObj.GetComponentInChildren<TextMeshPro>();
                if (tmp != null) tmp.text = node.text;

                // Color by type
                var rend = nodeObj.GetComponentInChildren<MeshRenderer>();
                if (rend != null)
                {
                    rend.material.color = GetColorForNodeType(node.node_type);
                }

                // Connect to parent if present
                if (!string.IsNullOrEmpty(node.parent_id) && activeNodeObjects.TryGetValue(node.parent_id, out GameObject parentObj))
                {
                    CreateBranch(parentObj.transform.position, targetPosition);
                }

                nodeIndex++;
            }
        }

        public void UpdateGhostSprouts(List<GhostSprout> sprouts)
        {
            foreach (var s in sprouts)
            {
                if (!activeSproutObjects.ContainsKey(s.proposal_id))
                {
                    Vector3 parentPos = tableCenterAnchor.position + Vector3.up * 0.3f;
                    if (activeNodeObjects.TryGetValue(s.parent_id, out GameObject parentObj))
                    {
                        parentPos = parentObj.transform.position;
                    }

                    Vector3 sproutPos = parentPos + new Vector3(0.18f, 0.12f, 0.1f);
                    GameObject sproutObj = Instantiate(ghostSproutPrefab, sproutPos, Quaternion.identity, transform);
                    activeSproutObjects[s.proposal_id] = sproutObj;

                    var tmp = sproutObj.GetComponentInChildren<TextMeshPro>();
                    if (tmp != null) tmp.text = $"[PROPOSAL] {s.text}";
                }
            }
        }

        private void CreateBranch(Vector3 start, Vector3 end)
        {
            if (branchConnectorPrefab == null) return;
            GameObject branchObj = Instantiate(branchConnectorPrefab, transform);
            LineRenderer lr = branchObj.GetComponent<LineRenderer>();
            if (lr != null)
            {
                lr.positionCount = 16;
                Vector3 mid = (start + end) * 0.5f + Vector3.up * 0.06f; // Arch curve
                for (int i = 0; i < 16; i++)
                {
                    float t = i / 15f;
                    Vector3 p = Mathf.Pow(1 - t, 2) * start + 2 * (1 - t) * t * mid + Mathf.Pow(t, 2) * end;
                    lr.SetPosition(i, p);
                }
            }
            activeBranchLines.Add(branchObj);
        }

        private Color GetColorForNodeType(string type)
        {
            return type?.ToLower() switch
            {
                "goal" => new Color(0.02f, 0.71f, 0.83f),
                "topic" => new Color(0.23f, 0.51f, 0.96f),
                "claim" => new Color(0.06f, 0.72f, 0.50f),
                "question" => new Color(0.96f, 0.62f, 0.04f),
                "action" => new Color(0.66f, 0.33f, 0.97f),
                _ => new Color(0.06f, 0.72f, 0.50f)
            };
        }
    }
}

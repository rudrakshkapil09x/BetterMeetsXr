using System.Collections;
using UnityEngine;
using TMPro;

namespace BetterMeetsXR.XR
{
    /// <summary>
    /// Handles physical elasticity for text-as-material (Texterial):
    /// - Two-handed Pinch & Pull (>1.4x initial distance): Triggers LLM Elaboration (stretch)
    /// - Two-handed Palm Squeeze (<0.65x initial distance): Triggers LLM Condensation (knead)
    /// </summary>
    public class TexterialDeformer : MonoBehaviour
    {
        [Header("UI & Mesh References")]
        [SerializeField] private TextMeshPro textLabel;
        [SerializeField] private MeshRenderer cardRenderer;

        [Header("Elastic Constraints")]
        [SerializeField] private float stretchThreshold = 1.45f;
        [SerializeField] private float compressThreshold = 0.65f;
        [SerializeField] private float returnSpringSpeed = 8.0f;

        private Vector3 originalScale;
        private float initialDistance;
        private bool isInteracting = false;
        private string cardId;

        void Awake()
        {
            originalScale = transform.localScale;
        }

        public void Initialize(string id, string text, string speaker, string intent)
        {
            cardId = id;
            if (textLabel != null) textLabel.text = text;
        }

        /// <summary>
        /// Called when two hands grasp or pinch opposing corners of this 3D tile.
        /// </summary>
        public void StartDualGrasp(float startDistance)
        {
            initialDistance = Mathf.Max(startDistance, 0.05f);
            isInteracting = true;
            StopAllCoroutines();
        }

        /// <summary>
        /// Continually stretches or squashes the tile mesh during two-handed manipulation.
        /// </summary>
        public void UpdateDualGrasp(float currentDistance)
        {
            if (!isInteracting) return;
            float ratio = currentDistance / initialDistance;

            // Physical Poisson ratio: stretching along X compresses Y and Z
            float scaleX = originalScale.x * ratio;
            float scaleY = originalScale.y * Mathf.Clamp(1.0f / Mathf.Sqrt(ratio), 0.5f, 1.5f);
            float scaleZ = originalScale.z * Mathf.Clamp(1.0f / Mathf.Sqrt(ratio), 0.5f, 1.5f);

            transform.localScale = new Vector3(scaleX, scaleY, scaleZ);

            // Visual strain indicator: tint card based on deformation
            if (ratio > stretchThreshold && cardRenderer != null)
            {
                cardRenderer.material.SetColor("_EmissionColor", new Color(0f, 0.8f, 1f) * 0.5f); // Cyan glow
            }
            else if (ratio < compressThreshold && cardRenderer != null)
            {
                cardRenderer.material.SetColor("_EmissionColor", new Color(1f, 0.7f, 0f) * 0.5f); // Amber glow
            }
        }

        /// <summary>
        /// Triggered upon release of both hands.
        /// </summary>
        public void EndDualGrasp(float finalDistance)
        {
            if (!isInteracting) return;
            isInteracting = false;

            float ratio = finalDistance / initialDistance;

            if (ratio > stretchThreshold)
            {
                // Trigger Texterial Stretch
                StartCoroutine(ExecuteTransformRoutine("stretch"));
            }
            else if (ratio < compressThreshold)
            {
                // Trigger Texterial Knead
                StartCoroutine(ExecuteTransformRoutine("knead"));
            }
            else
            {
                // Spring back smoothly
                StartCoroutine(SpringBackRoutine());
            }
        }

        private IEnumerator ExecuteTransformRoutine(string action)
        {
            string oldText = textLabel != null ? textLabel.text : "";
            if (textLabel != null) textLabel.text = $"[{action.ToUpper()}ING...]";

            yield return Core.BetterMeetsNetworkClient.Instance.TransformCard(
                oldText,
                action,
                (transformedText) =>
                {
                    if (textLabel != null) textLabel.text = transformedText;
                    StartCoroutine(SpringBackRoutine());
                },
                (error) =>
                {
                    if (textLabel != null) textLabel.text = oldText;
                    StartCoroutine(SpringBackRoutine());
                }
            );
        }

        private IEnumerator SpringBackRoutine()
        {
            while (Vector3.Distance(transform.localScale, originalScale) > 0.005f)
            {
                transform.localScale = Vector3.Lerp(transform.localScale, originalScale, Time.deltaTime * returnSpringSpeed);
                yield return null;
            }
            transform.localScale = originalScale;

            if (cardRenderer != null)
            {
                cardRenderer.material.SetColor("_EmissionColor", Color.black);
            }
        }
    }
}

using System;
using System.Collections;
using System.Text;
using UnityEngine;
using UnityEngine.Networking;
using BetterMeetsXR.Models;

namespace BetterMeetsXR.Core
{
    public class BetterMeetsNetworkClient : MonoBehaviour
    {
        public static BetterMeetsNetworkClient Instance { get; private set; }

        [Header("Backend Connection")]
        [SerializeField] private string backendHost = "localhost:8000";
        [SerializeField] private string meetingId = "meet-session-01";

        public string BaseHttpUrl => $"http://{backendHost}";
        public string WebSocketUrl => $"ws://{backendHost}/ws";

        void Awake()
        {
            if (Instance == null) Instance = this;
            else Destroy(gameObject);
        }

        public IEnumerator TransformCard(string text, string action, Action<string> onSuccess, Action<string> onError)
        {
            string url = $"{BaseHttpUrl}/slate/transform";
            string payload = JsonUtility.ToJson(new TransformRequest { text = text, action = action });

            using UnityWebRequest req = new UnityWebRequest(url, "POST");
            byte[] bodyRaw = Encoding.UTF8.GetBytes(payload);
            req.uploadHandler = new UploadHandlerRaw(bodyRaw);
            req.downloadHandler = new DownloadHandlerBuffer();
            req.SetRequestHeader("Content-Type", "application/json");

            yield return req.SendWebRequest();

            if (req.result == UnityWebRequest.Result.Success)
            {
                TransformResponse res = JsonUtility.FromJson<TransformResponse>(req.downloadHandler.text);
                onSuccess?.Invoke(res.transformed);
            }
            else
            {
                onError?.Invoke(req.error);
            }
        }

        public IEnumerator FetchTreeSnapshot(Action<TreeSnapshot> onLoaded)
        {
            string url = $"{BaseHttpUrl}/tree?meeting_id={meetingId}";
            using UnityWebRequest req = UnityWebRequest.Get(url);

            yield return req.SendWebRequest();

            if (req.result == UnityWebRequest.Result.Success)
            {
                TreeSnapshot snapshot = JsonUtility.FromJson<TreeSnapshot>(req.downloadHandler.text);
                onLoaded?.Invoke(snapshot);
            }
        }
    }
}

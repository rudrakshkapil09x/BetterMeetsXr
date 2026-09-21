"""
Lightweight proxy running on port 1234 to bridge LM Studio requests
to the active local inference engine (Ollama with qwen2.5-coder:14b).
"""
import http.server
import socketserver
import json
import requests
import sys

TARGET_URL = "http://127.0.0.1:11434"
PORT = 1234

class LMProxyHandler(http.server.BaseHTTPRequestHandler):
    def log_message(self, format, *args):
        pass

    def do_GET(self):
        if self.path.endswith("/models") or self.path == "/v1/models":
            try:
                r = requests.get(f"{TARGET_URL}/v1/models", timeout=5)
                data = r.json()
                data["data"].append({
                    "id": "qwen/qwen2.5-coder-14b",
                    "object": "model",
                    "owned_by": "local"
                })
                resp = json.dumps(data).encode("utf-8")
                self.send_response(200)
                self.send_header("Content-Type", "application/json")
                self.send_header("Content-Length", str(len(resp)))
                self.end_headers()
                self.wfile.write(resp)
            except Exception as e:
                self.send_error(500, str(e))
        else:
            try:
                r = requests.get(f"{TARGET_URL}{self.path}", timeout=10)
                self.send_response(r.status_code)
                for k, v in r.headers.items():
                    if k.lower() not in ("content-length", "content-encoding", "transfer-encoding"):
                        self.send_header(k, v)
                self.send_header("Content-Length", str(len(r.content)))
                self.end_headers()
                self.wfile.write(r.content)
            except Exception as e:
                self.send_error(500, str(e))

    def do_POST(self):
        content_len = int(self.headers.get("Content-Length", 0))
        post_body = self.rfile.read(content_len)
        try:
            body = json.loads(post_body.decode("utf-8"))
            if body.get("model") == "qwen/qwen2.5-coder-14b":
                body["model"] = "qwen2.5-coder:14b"
            forward_data = json.dumps(body).encode("utf-8")
        except Exception:
            forward_data = post_body

        try:
            r = requests.post(
                f"{TARGET_URL}{self.path}",
                data=forward_data,
                headers={"Content-Type": "application/json"},
                timeout=60
            )
            self.send_response(r.status_code)
            for k, v in r.headers.items():
                if k.lower() not in ("content-length", "content-encoding", "transfer-encoding"):
                    self.send_header(k, v)
            self.send_header("Content-Length", str(len(r.content)))
            self.end_headers()
            self.wfile.write(r.content)
        except Exception as e:
            self.send_error(500, str(e))

if __name__ == "__main__":
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("0.0.0.0", PORT), LMProxyHandler) as httpd:
        print(f"LM Studio bridge running on port {PORT} -> {TARGET_URL}")
        httpd.serve_forever()

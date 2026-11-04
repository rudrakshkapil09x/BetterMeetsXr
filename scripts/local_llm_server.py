"""
Local LLM Server running on port 1234 (OpenAI-Compatible API)
Powered by llama-cpp-python and Qwen2.5-Coder-1.5B-Instruct GGUF
Acts as the drop-in local inference engine for BetterMeetsXR.
"""

import os
import glob
import time
import uuid
import logging
from typing import List, Dict, Any, Optional
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
import uvicorn
from llama_cpp import Llama

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("LocalLLMServer")

# Find the downloaded GGUF model path
hf_cache = os.path.expanduser("~/.cache/huggingface/hub/models--Qwen--Qwen2.5-Coder-1.5B-Instruct-GGUF")
gguf_matches = glob.glob(os.path.join(hf_cache, "**", "*.gguf"), recursive=True)

if not gguf_matches:
    raise FileNotFoundError("Qwen2.5-Coder GGUF model not found in HuggingFace cache.")

model_path = gguf_matches[0]
logger.info(f"Loading local LLM from {model_path}...")

# Initialize Llama instance (4 threads, 4096 context length)
llm = Llama(
    model_path=model_path,
    n_ctx=4096,
    n_threads=6,
    verbose=False
)
logger.info("Local LLM model loaded successfully!")

app = FastAPI(title="BetterMeets Local LLM Server", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatMessage(BaseModel):
    role: str
    content: str

class ChatCompletionRequest(BaseModel):
    model: Optional[str] = "default"
    messages: List[ChatMessage]
    temperature: Optional[float] = 0.2
    max_tokens: Optional[int] = 300
    stream: Optional[bool] = False

@app.get("/v1/models")
@app.get("/models")
async def list_models():
    return {
        "object": "list",
        "data": [
            {
                "id": "qwen/qwen2.5-coder-14b",
                "object": "model",
                "created": int(time.time()),
                "owned_by": "local"
            },
            {
                "id": "default",
                "object": "model",
                "created": int(time.time()),
                "owned_by": "local"
            }
        ]
    }

@app.post("/v1/chat/completions")
@app.post("/chat/completions")
async def chat_completions(req: ChatCompletionRequest):
    try:
        raw_messages = [{"role": m.role, "content": m.content} for m in req.messages]
        
        response = llm.create_chat_completion(
            messages=raw_messages,
            temperature=req.temperature or 0.2,
            max_tokens=req.max_tokens or 300,
            stream=False
        )
        return response
    except Exception as e:
        logger.error(f"Inference error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    logger.info("Starting Local LLM API on http://127.0.0.1:1234 ...")
    uvicorn.run(app, host="127.0.0.1", port=1234)

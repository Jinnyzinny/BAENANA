from transformers import AutoModel, AutoTokenizer
import torch
import numpy as np

# 모델 경로
EMBEDDING_MODEL_PATH = "Alibaba-NLP/gte-Qwen2-7B-instruct"

# 모델 불러오기
tokenizer = AutoTokenizer.from_pretrained(EMBEDDING_MODEL_PATH, trust_remote_code=True)
model = AutoModel.from_pretrained(EMBEDDING_MODEL_PATH, trust_remote_code=True)
model.eval()  # 추론 모드

def embed_text(texts: list) -> np.ndarray:
    """
    텍스트 리스트를 임베딩하여 반환
    """
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    model.to(device)

    inputs = tokenizer(texts, padding=True, truncation=True, return_tensors="pt").to(device)

    with torch.no_grad():
        outputs = model(**inputs)
        embeddings = outputs.last_hidden_state[:, 0, :]  # [CLS] 토큰 임베딩 사용

    embeddings = embeddings.cpu().numpy()
    return embeddings

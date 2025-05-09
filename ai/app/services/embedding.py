from llama_cpp import Llama

EMBED_MODEL_PATH = "app/models/gte-Qwen2-7B-instruct-Q4_K_M.gguf"

llm_embed = Llama(
    model_path=EMBED_MODEL_PATH,
    embedding=True,
    n_threads=8,
    n_gpu_layers=30,
    use_mlock=True
)

def embed_text(texts: list) -> list:
    """
    llama-cpp를 사용한 텍스트 임베딩 → ChromaDB에 사용 가능
    """
    embeddings = []
    for text in texts:
        emb = llm_embed.embed(text)
        if isinstance(emb[0], list):  # 이중 리스트면 평탄화
            emb = emb[0]
        embeddings.append([float(x) for x in emb])
    return embeddings  # ✅ List[List[float]]

import numpy as np
from app.services.embedding import embed_text

def cosine_similarity(vec1, vec2):
    vec1 = np.array(vec1)
    vec2 = np.array(vec2)
    return np.dot(vec1, vec2) / (np.linalg.norm(vec1) * np.linalg.norm(vec2))

def evaluate_retrieval(question, retrieved_contexts):
    question_emb = embed_text([question])[0]
    context_embs = embed_text(retrieved_contexts)

    sims = [cosine_similarity(question_emb, ctx_emb) for ctx_emb in context_embs]
    avg_sim = np.mean(sims)
    print(f"🔍 Retrieval 평균 유사도: {avg_sim:.4f}")
    return avg_sim

def evaluate_answer(question, answer):
    question_emb = embed_text([question])[0]
    answer_emb = embed_text([answer])[0]

    sim = cosine_similarity(question_emb, answer_emb)
    print(f"💬 Question-Answer 유사도: {sim:.4f}")
    return sim

def evaluate_faithfulness(answer, retrieved_contexts):
    answer_emb = embed_text([answer])[0]
    context_embs = embed_text(retrieved_contexts)

    sims = [cosine_similarity(answer_emb, ctx_emb) for ctx_emb in context_embs]
    avg_sim = np.mean(sims)
    print(f"✅ Faithfulness (답변-컨텍스트 평균 유사도): {avg_sim:.4f}")
    return avg_sim

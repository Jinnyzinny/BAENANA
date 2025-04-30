from app.core.config import DB_BACKEND

if DB_BACKEND == "chroma":
    from app.database.chroma_connector import search_from_chroma as search_documents
elif DB_BACKEND == "graph":
    from app.database.graph_connector import GraphDBConnector

    graph_db = GraphDBConnector(uri="bolt://localhost:7687", user="neo4j", password="password")
    def search_documents(query):
        return graph_db.search_document(query)

from app.services.embedding import embed_text
from app.services.prompt_builder import build_prompt
from app.services.llm_generator import generate_answer

def get_rag_answer(question: str) -> str:
    """
    질문 → 검색 → 프롬프트 생성 → 답변 생성
    """
    if DB_BACKEND == "chroma":
        # llama-cpp는 embed_text가 List[List[float]] 반환 → [0]으로 첫 임베딩 사용
        question_embedding = embed_text([question])[0]

        search_result = search_documents(question_embedding, n_results=3)
        contexts = search_result["documents"][0] if search_result["documents"] else []
    else:
        # 그래프DB 검색
        contexts = search_documents(question)

    prompt = build_prompt(question, contexts)
    answer = generate_answer(prompt)

    return {"answer": answer}

from chromadb import PersistentClient
import numpy as np

# ChromaDB 인스턴스 초기화
chroma_client = PersistentClient(
    path="./chroma_store"  # 로컬 디스크 저장 위치
)

# 사용할 컬렉션 이름 (지식베이스)
collection_name = "banana_health"

# 컬렉션 가져오기 (없으면 자동 생성)
collection = chroma_client.get_or_create_collection(name=collection_name, embedding_function=None)

def save_to_chroma(ids: list, documents: list, embeddings: list, metadatas: list):
    try:
        collection.add(
            ids=ids,
            documents=documents,
            embeddings=embeddings,
            metadatas=metadatas
        )
        print(f"✅ 저장 성공: {len(ids)}개")
    except Exception as e:
        print(f"❌ 저장 실패: {e}")


def search_from_chroma(query_embedding: list, n_results: int = 3):
    # ✅ 강제 변환: np.ndarray → List[float]
    if isinstance(query_embedding, np.ndarray):
        query_embedding = query_embedding.tolist()

    # ✅ 방어 로직: query_embeddings는 반드시 List[List[float]]
    if not isinstance(query_embedding[0], (float, int)):
        raise ValueError("query_embedding must be a flat list of floats (List[float])")

    return collection.query(
        query_embeddings=[query_embedding],
        n_results=n_results
    )

from chromadb import PersistentClient

# ChromaDB 인스턴스 초기화
chroma_client = PersistentClient(
    path="./chroma_store"  # 로컬 디스크 저장 위치
)

# 사용할 컬렉션 이름 (지식베이스)
collection_name = "banana_health"

# 컬렉션 가져오기 (없으면 자동 생성)
collection = chroma_client.get_or_create_collection(name=collection_name)

def save_to_chroma(ids: list, documents: list, embeddings: list, metadatas: list):
    """
    ChromaDB에 데이터 저장
    """
    collection.add(
        ids=ids,
        documents=documents,
        embeddings=embeddings,
        metadatas=metadatas
    )

def search_from_chroma(query_embedding: list, n_results: int = 3):
    """
    질문 임베딩 기반으로 Top-K 유사 문서 검색
    """
    result = collection.query(
        query_embeddings=[query_embedding],
        n_results=n_results
    )
    return result

### 실행 순서
1 . 외부 지식 베이스 문서 임베딩 후 chromaDB에 저장

`python ./scripts/embed_documents.py`


2 . FastAPI 서버 실행

`uvicorn app.main:app --reload`
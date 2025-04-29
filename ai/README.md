### ai 폴더 구조
```bash
ai/
├── app/                         # FastAPI 메인 앱
│   ├── main.py                  # FastAPI 실행 진입점, 엔드포인트
│   ├── models/                  # Pydantic 모델 정의
│   │   └── schema.py            # Question, Answer 등
│   ├── core/                    # 설정, 로거 등 공통 모듈
│   │   ├── config.py            # 환경변수 (로컬/EC2 겸용)
│   │   └── logger.py            # 로깅 설정
│   ├── services/                # 핵심 비즈니스 로직
│   │   ├── rag_pipeline.py      # 질문 → 검색 → 생성
│   │   ├── embedding.py         # 임베딩 로직
│   │   ├── llm_generator.py     # 생성 모델 호출
│   │   ├── prompt_builder.py    # 문서 + 질문 → Prompt 구성
│   │   └── mcp_tools.py         # (선택) 외부 시스템 연동 함수
│   ├── database/                # ChromaDB 연결
│   │   └── chroma_connector.py  # Chroma 컬렉션 관리
│   └── utils/                   # 유틸 함수 모음
│       ├── s3_loader.py         # (후에 사용) S3 문서 다운로드
│       └── preprocessor.py      # 문단 분할, 텍스트 정제 등
│
├── data/                       # 로컬 개발용 문서, 테스트셋
│   ├── documents/              # txt/pdf 문서 파일
│   └── test_questions.json     # RAGAS용 테스트 질문
│
├── chroma_store/              # ChromaDB 벡터 저장소
│
├── scripts/                   # API 외부 CLI 스크립트
│   ├── embed_documents.py      # 문서 임베딩
│   ├── evaluate_ragas.py       # 평가용 스크립트
│   └── test_s3_download.py     # s3_loader 디버깅용
│
├── .env                       # 로컬/서버 공통 환경변수
├── requirements.txt           # 패키지 목록
├── Dockerfile                 # 배포 준비용 (선택)
└── README.md
```
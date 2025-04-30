### ignore된 것들 => 코드 수정 시 넣는거 잊지 말자!
- 환경 변수 파일
ai/.env

- 양자화된 모델 파일
ai/models/*.gguf

```
S12P31S205
├─ ai
│  ├─ app
│  │  ├─ core
│  │  │  ├─ config.py
│  │  │  └─ __pycache__
│  │  │     └─ config.cpython-39.pyc
│  │  ├─ database
│  │  │  ├─ chroma_connector.py
│  │  │  ├─ graph_connector.py
│  │  │  └─ __pycache__
│  │  │     └─ chroma_connector.cpython-39.pyc
│  │  ├─ main.py
│  │  ├─ models
│  │  │  ├─ schema.py
│  │  │  └─ __pycache__
│  │  │     └─ schema.cpython-39.pyc
│  │  ├─ services
│  │  │  ├─ embedding.py
│  │  │  ├─ llm_generator.py
│  │  │  ├─ prompt_builder.py
│  │  │  ├─ rag_pipeline.py
│  │  │  └─ __pycache__
│  │  │     ├─ embedding.cpython-39.pyc
│  │  │     ├─ llm_generator.cpython-39.pyc
│  │  │     ├─ prompt_builder.cpython-39.pyc
│  │  │     └─ rag_pipeline.cpython-39.pyc
│  │  ├─ utils
│  │  │  ├─ chunking.py
│  │  │  ├─ s3_loader.py
│  │  │  └─ __pycache__
│  │  │     └─ chunking.cpython-39.pyc
│  │  └─ __pycache__
│  │     └─ main.cpython-39.pyc
│  ├─ chroma_store
│  │  ├─ 374d5e5a-b0d5-43e5-96a6-a1dd12c9f115
│  │  │  ├─ data_level0.bin
│  │  │  ├─ header.bin
│  │  │  ├─ length.bin
│  │  │  └─ link_lists.bin
│  │  └─ chroma.sqlite3
│  ├─ data
│  │  ├─ documents
│  │  │  └─ bless_faq.docx
│  │  └─ test_question.json
│  ├─ README.md
│  ├─ requirements.txt
│  └─ scripts
│     └─ embed_documents.py
└─ README.md

```

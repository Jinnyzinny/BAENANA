import os
import sys
import pandas as pd
from docx import Document

sys.path.append(os.path.dirname(os.path.abspath(__file__)) + "/../app")

from utils.chunking import split_text
from services.embedding import embed_text
from database.chroma_connector import save_to_chroma

DOCS_DIR = "./data/documents"

def load_documents(doc_dir):
    """
    문서 폴더 내 모든 텍스트/워드/엑셀 파일 읽어오기 (.txt, .docx, .xlsx)
    """
    documents = []

    for filename in os.listdir(doc_dir):
        filepath = os.path.join(doc_dir, filename)
        ext = filename.lower().split(".")[-1]

        try:
            if ext == "txt":
                with open(filepath, "r", encoding="utf-8") as f:
                    content = f.read()
                    documents.append((filename, content))

            elif ext == "docx":
                doc = Document(filepath)
                content = "\n".join([para.text for para in doc.paragraphs])
                documents.append((filename, content))

            elif ext == "xlsx":
                df = pd.read_excel(filepath)
                content = "\n".join(["\t".join(map(str, row)) for row in df.values])
                documents.append((filename, content))

            else:
                print(f"⚠️ 지원하지 않는 파일 형식입니다: {filename}")
        except Exception as e:
            print(f"❌ {filename} 처리 중 오류 발생: {e}")

    return documents

def main():
    all_chunks = []
    all_ids = []
    all_metadatas = []

    documents = load_documents(DOCS_DIR)
    
    for doc_name, content in documents:
        chunks = split_text(content, chunk_size=500, chunk_overlap=50)
        for idx, chunk in enumerate(chunks):
            all_chunks.append(chunk)
            all_ids.append(f"{doc_name}_{idx}")
            all_metadatas.append({"filename": doc_name})

    embeddings = embed_text(all_chunks)

    save_to_chroma(
        ids=all_ids,
        documents=all_chunks,
        embeddings=embeddings,
        metadatas=all_metadatas
    )

    print(f"✅ {len(all_chunks)}개의 문서를 ChromaDB에 저장 완료했습니다.")

if __name__ == "__main__":
    main()

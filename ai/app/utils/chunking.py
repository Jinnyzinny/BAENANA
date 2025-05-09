from langchain.text_splitter import RecursiveCharacterTextSplitter

def split_text(text: str, chunk_size: int, chunk_overlap: int) -> list[str]:
    splitter = RecursiveCharacterTextSplitter(
        chunk_size = chunk_size,
        chunk_overlap = chunk_overlap,
        separators=["\n\n", "\n", ".", " ", ""]
    )
    return splitter.split_text(text)
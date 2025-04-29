def build_prompt(question: str, contexts: list) -> str:
    """
    질문과 검색된 문서들을 합쳐서 프롬프트 생성
    Args:
        question (str): 사용자의 질문
        contexts (list): 검색된 문서 리스트
    Returns:
        str: 생성형 모델에 전달할 프롬프트
    """
    context_text = "\n\n".join(contexts)
    prompt = f"""당신은 여성 건강 관리 전문가입니다.
다음 제공된 자료를 참고하여 사용자의 질문에 답변하세요.

자료:
{context_text}

질문:
{question}

답변:"""
    return prompt

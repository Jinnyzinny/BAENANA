def classify_question(question: str) -> str:
    if any(word in question for word in ["어떻게", "방법", "사용", "하는 법"]):
        return "how"
    elif any(word in question for word in ["왜", "이유", "원리", "무엇", "설명", "자세히"]):
        return "info"
    elif any(word in question for word in ["안돼", "오류", "문제", "실패", "에러"]):
        return "error"
    else:
        return "general"


def build_prompt(question: str, contexts: list) -> str:
    q_type = classify_question(question)

    context_text = "\n\n".join(contexts)

    if q_type == "info":
        prompt = f"""당신은 여성 건강 관리 전문가이며 정확하고 신뢰할 수 있는 정보를 제공합니다.
다음 자료를 참고하여 질문에 구체적으로 답변하세요.

==== 자료 ====
{context_text}

==== 질문 ====
{question}

==== 답변 지침 ====
- 질문이 특정 개념, 제품, 기구, 도구에 대한 설명을 요청하는 경우 반드시 구체적으로 설명하세요.
- "설명서를 참조하세요" 등의 안내성 답변 대신, 자료에 기반하여 직접 설명을 작성하세요.
- 자료에 없는 내용은 "자료에 해당 내용이 없습니다."라고 작성하세요.
- 답변 마지막에 출처 (ex: "[출처: 파일명]")를 표기하세요.
- 답변은 3~5문장 이내로 작성하세요.

==== 답변 ===="""

    elif q_type == "how":
        prompt = f"""당신은 사용자가 쉽게 이해할 수 있도록 설명하는 여성 건강 관리 상담사입니다.
아래 자료를 기반으로 질문에 답변하세요. 필요한 경우 단계별로 번호를 붙여 설명하세요.

==== 자료 ====
{context_text}

==== 질문 ====
{question}

==== 답변 지침 ====
- 반드시 자료에 기반하여 작성하세요.
- 단계별 설명은 "1. ~", "2. ~"로 시작하세요.
- 단계는 최대 5단계까지만 작성하세요.

==== 답변 ===="""

    elif q_type == "error":
        prompt = f"""당신은 문제 해결 전문가로서 사용자에게 빠르고 실용적인 해결책을 제시합니다.
다음 자료를 참고하여 질문에 대한 원인과 해결 방법을 안내하세요.

==== 자료 ====
{context_text}

==== 질문 ====
{question}

==== 답변 지침 ====
- 문제의 가능한 원인을 한두 가지로 요약하세요.
- 해결 방법은 단계별로 안내하세요.
- 사용자가 따라하기 쉽게 짧고 명령문으로 작성하세요.

==== 답변 ===="""

    else:
        prompt = f"""당신은 여성 건강 관리 전문가입니다.
다음 제공된 자료를 참고하여 사용자의 질문에 답변하세요.

자료:
{context_text}

질문:
{question}

답변:"""

    return prompt

from transformers import pipeline

generator = pipeline("text-generation", model="rtzr/ko-gemma-2-9b-it", device=0)

def generate_answer(prompt: str) -> str:
    """
    프롬프트를 기반으로 답변 생성
    """
    result = generator(
        prompt,
        max_new_tokens=512,
        do_sample=True,
        temperature=0.7,
        top_p=0.9
    )
    return result[0]["generated_text"]

from llama_cpp import Llama

# 로컬 GGUF 경로
LLM_MODEL_PATH = "app/models/ko-gemma-2-9b-it.Q2_K.gguf"

# 모델 로드
llm = Llama(
    model_path=LLM_MODEL_PATH,
    n_ctx=2048,
    n_threads=8,
    n_gpu_layers=35,  # g4dn의 vGPU에 따라 조정
    use_mlock=True
)

def generate_answer(prompt: str) -> str:
    """
    프롬프트를 기반으로 답변 생성 (llama-cpp 기반)
    """
    print(f"프롬프트 내용 : {prompt}")
    result = llm(prompt, max_tokens=512, temperature=0.7, top_p=0.9)
    return result["choices"][0]["text"].strip()

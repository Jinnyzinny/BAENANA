from fastapi import FastAPI, Response, HTTPException
from app.models.schema import Question, Answer
# from app.services.rag_pipeline import get_rag_answer

app = FastAPI()

@app.get('/')
async def root():
    return {"배나나":"사용자 입력 정보 및 배란/임신 테스트기 데이터 기반 여성 헬스케어 서비스"}

# favicon.ico Not Found 에러 해결 용도
@app.get("/favicon.ico", include_in_schema=False)
async def favicon():
    return Response(content="")

# 챗봇 API
@app.post("/chatbot/rag", response_model=Answer)
async def chatbot(payload: Question):
    if not payload.question.strip():
        raise HTTPException(status_code=400, detail="질문을 입력하세요.")
    return Answer(answer=payload.question)
    # return get_rag_answer(payload.question)
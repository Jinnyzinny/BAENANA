from fastapi import FastAPI, Response

app = FastAPI()

@app.get('/')
async def root():
    return {"배나나":"사용자 입력 정보 및 배란/임신 테스트기 데이터 기반 여성 헬스케어 서비스"}

# favicon.ico Not Found 에러 해결 용도
@app.get("/favicon.ico", include_in_schema=False)
async def favicon():
    return Response(content="")
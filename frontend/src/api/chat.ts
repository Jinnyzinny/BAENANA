import authClient from "./authClient";

// 메시지 전송 및 챗봇 응답 생성
export async function addChatting() {
  try {
    const response = await authClient.post("/chat/message");
    console.log("채팅 메시지 전송 성공: ", response.data);
    return response.data;
  } catch (error: unknown) {
    console.error("채팅 메시지 전송 실패: ", error);
  }
}

// 세션 목록 조회
export async function getSessionList() {
  try {
    const response = await authClient.get("/chat/sessions");
    console.log("세션 목록 조회 성공: ", response.data);
    return response.data;
  } catch (error: unknown) {
    console.error("세션 목록 조회 실패: ", error);
  }
}

// 채팅 내역 조회
export async function getChattingList(sessionId: number) {
  try {
    const response = await authClient.get(
      `/chat/sessions/${sessionId}/messages`
    );
    console.log("채팅 내역 조회 성공: ", response.data);
    return response.data;
  } catch (error: unknown) {
    console.error("채팅 내역 조회 실패: ", error);
  }
}

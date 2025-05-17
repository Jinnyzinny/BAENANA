import { Chat, ChatList, SessionId } from "../types/Chat";
import authClient from "./client/authClient";

// 세션 id 조회(새로운 채팅 생성)
export async function getSessionId(): Promise<SessionId> {
  try {
    const response = await authClient.get("/chat/init");
    console.log("세션 id 조회 성공: ", response.data);
    return response.data;
  } catch (error: unknown) {
    console.error("세션 id 조회 실패: ", error);
    throw error;
  }
}

// 세션 목록 조회
export async function getChatList(): Promise<ChatList[]> {
  try {
    const response = await authClient.get("/chat/sessions");
    console.log("세션 목록 조회 성공: ", response.data.data);
    return response.data.data;
  } catch (error: unknown) {
    console.error("세션 목록 조회 실패: ", error);
    throw error;
  }
}

// 채팅 내역 조회 (세션 기준)
export async function getChat(sessionId: number): Promise<Chat[]> {
  try {
    const response = await authClient.get(
      `/chat/sessions/${sessionId}/messages`
    );
    console.log("채팅 내역 조회 (세션 기준) 성공: ", response.data.data);
    return response.data.data;
  } catch (error: unknown) {
    console.error("채팅 내역 조회 (세션 기준) 실패: ", error);
    throw error;
  }
}

// 챗봇 채팅
export async function addChat(
  inputType: string,
  content: string,
  sessionId: number
) {
  try {
    const response = await authClient.post("/chat", {
      inputType,
      content,
      sessionId,
    });
    console.log("챗봇 채팅 성공: ", response.data.data);
    return response.data.data;
  } catch (error: unknown) {
    console.error("챗봇 채팅 실패: ", error);
    throw error;
  }
}

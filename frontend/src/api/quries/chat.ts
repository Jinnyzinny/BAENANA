import { useQuery } from "@tanstack/react-query";
import { useApiMutation } from "../../hooks/useApiMutation";
import { addChat, getChat, getChatList, getSessionId } from "../chat";

// [GET] 세션 id 조회(새로운 채팅 생성)
// 불필요하게 여러 번 조회하지 않기 위해 props 추가
export function useGetSessionId(isEnabled: boolean) {
  return useQuery({
    queryKey: ["sessionId"],
    queryFn: () => getSessionId(),
    enabled: isEnabled,
  });
}

// [GET] 세션 목록 조회
export function useGetChatList() {
  return useQuery({
    queryKey: ["chatList"],
    queryFn: () => getChatList(),
    enabled: false,
  });
}

// [GET] 채팅 내역 조회 (세션 기준)
// 세션 목록에서 채팅을 조회하기 위해 props 추가
// sessionId가 null이면 비활성화
export function useGetChat(sessionId: string | null, isEnabled: boolean) {
  return useQuery({
    queryKey: ["chat", sessionId],
    queryFn: () => {
      if (!sessionId) {
        console.log("채팅 sessionId: null");
        return null;
      }
      return getChat(sessionId);
    },
    enabled: isEnabled && !!sessionId,
  });
}

// [POST] 챗봇 채팅
export function useAddChat() {
  return useApiMutation({
    mutationFn: ({
      inputType,
      content,
      sessionId,
    }: {
      inputType: string;
      content: string;
      sessionId: string;
    }) => addChat(inputType, content, sessionId),
    keysToInvalidate: [["chatList"]],
    successMessage: null,
    errorMessage: "챗봇 채팅 실패",
  });
}

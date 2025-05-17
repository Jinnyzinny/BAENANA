import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Alert } from "react-native";
import { addChat, getChat, getChatList, getSessionId } from "../chat";

// 세션 id 조회(새로운 채팅 생성)
export function useGetSessionId() {
  return useQuery({
    queryKey: ["sessionId"],
    queryFn: () => getSessionId(),
  });
}

// 세션 목록 조회
export function useGetChatList() {
  return useQuery({
    queryKey: ["chatList"],
    queryFn: () => getChatList(),
  });
}

// 채팅 내역 조회 (세션 기준)
export function useGetChat(sessionId: number) {
  return useQuery({
    queryKey: ["chat", sessionId],
    queryFn: () => getChat(sessionId),
  });
}

// 챗봇 채팅
export function useAddChat() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      inputType,
      content,
      sessionId,
    }: {
      inputType: string;
      content: string;
      sessionId: number;
    }) => addChat(inputType, content, sessionId),
    onSuccess: (data) => {
      console.log("☑️챗봇 채팅 성공: ", data);
      queryClient.invalidateQueries({ queryKey: ["chatList"] });
    },
    onError: (error) => {
      console.log("✖️챗봇 채팅 실패: ", error);
      Alert.alert("챗봇 채팅 실패", "잠시 후 다시 시도해주세요.");
    },
  });
}

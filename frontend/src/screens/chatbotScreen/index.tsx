import { RouteProp, useRoute } from "@react-navigation/native";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Chatting } from "../../components/chatbot/chatting";
import { Conversation } from "../../components/chatbot/conversation";
import { HeaderLogo } from "../../components/common/headerLogo";
import { ChatbotDrawerParamList } from "../../navigation/chatbotDrawerNavigator";
import { useEffect, useState } from "react";
import { useGetSessionId } from "../../api/quries/chat";

type ChatbotScreenRouteProp = RouteProp<ChatbotDrawerParamList, "Chat">;

export function ChatbotScreen() {
  const [isSessionId, setIsSessionId] = useState<string | null>(null);
  const [message, setMessage] = useState<string>("");
  // const { params } = useRoute<ChatbotScreenRouteProp>();

  // sessionId가 없는 경우에만 조회
  // const { data, isSuccess } = useGetSessionId(isSessionId === null);

  // 선택된 채팅이 있는 경우 선택된 채팅, 없는 경우 최근 채팅을 보여줘야 함.
  // const selectedChat =
  //   dummyChats.find((chat) => chat.id === chatId) ??
  //   dummyChats[dummyChats.length - 1];

  // sessionId 조회 성공 시 sessionId 업데이트
  // useEffect(() => {
  //   if (isSuccess && data?.sessionId) {
  //     setIsSessionId(data.sessionId);
  //   }
  // }, [isSuccess, data]);

  return (
    <SafeAreaView className="flex-1" edges={["top"]}>
      <View className="flex-1 justify-between">
        {/* 상단: 헤더 + 채팅 목록 */}
        <View>
          <HeaderLogo before={false} settings={true} />
          <ScrollView className="px-5">
            <View className="gap-3 pb-4">
              {/* 고정 멘트 */}
              <View className="mr-20 gap-3">
                <Conversation
                  bot={true}
                  content={`안녕하세요.\n궁금한 것을 입력해주세요.`}
                />
              </View>
            </View>
          </ScrollView>
        </View>

        {/* 하단 입력창 */}
        <View className="px-5 bg-violet-100 ">
          <Chatting message={message} setMessage={setMessage} />
        </View>
      </View>
    </SafeAreaView>
  );
}

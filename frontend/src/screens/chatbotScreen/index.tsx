import { RouteProp, useRoute } from "@react-navigation/native";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Chatting } from "../../components/chatbot/chatting";
import { Conversation } from "../../components/chatbot/conversation";
import { HeaderLogo } from "../../components/common/headerLogo";
import { ChatbotDrawerParamList } from "../../navigation/chatbotDrawerNavigator";
import { useState } from "react";

const dummyChats = [
  {
    id: "1",
    title: "첫 번째 대화",
    messages: ["안녕하세요!", "무엇을 도와드릴까요?"],
  },
  {
    id: "2",
    title: "두 번째 대화",
    messages: ["두 번째 대화입니다.", "좀 더 도와드릴게요."],
  },
  {
    id: "3",
    title: "세 번째 대화",
    messages: ["세 번째 대화입니다.", "이전 채팅입니다."],
  },
  {
    id: "4",
    title: "네 번째 대화",
    messages: ["네 번째 대화입니다.", "이전 채팅입니다."],
  },
  {
    id: "5",
    title: "다섯 번째 대화",
    messages: ["다섯 번째 대화입니다.", "이전 채팅입니다."],
  },
];

type ChatbotScreenRouteProp = RouteProp<ChatbotDrawerParamList, "Chat">;

export function ChatbotScreen() {
  const [isInit, setIsInit] = useState<boolean>(true);
  const { params } = useRoute<ChatbotScreenRouteProp>();
  const chatId = params?.chatId;

  // 선택된 채팅이 있는 경우 선택된 채팅, 없는 경우 최근 채팅을 보여줘야 함.
  const selectedChat =
    dummyChats.find((chat) => chat.id === chatId) ??
    dummyChats[dummyChats.length - 1];

  return (
    <SafeAreaView className="flex-1" edges={["top"]}>
      <View className="flex-1 justify-between">
        {/* 상단: 헤더 + 채팅 목록 */}
        <View>
          <HeaderLogo before={false} settings={true} />
          <ScrollView className="px-5">
            <View className="gap-3 pb-4">
              {/* 고정 멘트 */}
              <Conversation
                bot={true}
                content={`안녕하세요.\n궁금한 것을 입력해주세요.`}
              />
              {selectedChat.messages.map((message, index) => (
                <Conversation
                  key={index}
                  bot={index % 2 !== 0}
                  content={message}
                />
              ))}
            </View>
          </ScrollView>
        </View>

        {/* 하단 입력창 */}
        <View className="px-5 bg-violet-100 ">
          <Chatting />
        </View>
      </View>
    </SafeAreaView>
  );
}

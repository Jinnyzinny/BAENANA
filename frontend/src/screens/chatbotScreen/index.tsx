import { RouteProp, useRoute } from "@react-navigation/native";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Chatting } from "../../components/chatbot/chatting";
import { Conversation } from "../../components/chatbot/conversation";
import { HeaderLogo } from "../../components/common/headerLogo";
import { ChatbotDrawerParamList } from "../../navigation/chatbotDrawerNavigator";
import { useEffect, useState } from "react";
import { useAddChat, useGetChat, useGetSessionId } from "../../api/quries/chat";
import { ChatData } from "../../types/Chat";

type ChatbotScreenRouteProp = RouteProp<ChatbotDrawerParamList, "Chat">;

export function ChatbotScreen() {
  const [chatList, setChatList] = useState<ChatData[]>([]);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [message, setMessage] = useState<string>("");
  const [selectedButton, setSelectedButton] = useState<string | null>(null);

  const { mutate: addChat } = useAddChat();

  const { params } = useRoute<ChatbotScreenRouteProp>();
  const { data: previousChats, isSuccess: isChatLoaded } = useGetChat(
    sessionId,
    !!sessionId && !!params?.sessionId
  );

  // drawer에서 세션을 선택한 경우
  useEffect(() => {
    if (params?.sessionId) {
      setSessionId(params.sessionId);
    }
  }, [params]);

  useEffect(() => {
    if (isChatLoaded && previousChats && params?.sessionId) {
      // 대화 내역 초기화
      const parsed: ChatData[] = [];

      for (let i = 0; i < previousChats.length; i++) {
        const current = previousChats[i];
        const next = previousChats[i + 1];

        if (current.sender === "user" && next?.sender === "bot") {
          parsed.push({
            userMessage: current.message,
            message: next.message,
          });
          i++;
        } else if (current.sender === "bot") {
          parsed.push({
            message: current.message,
          });
        } else if (current.sender === "user") {
          parsed.push({
            userMessage: current.message,
            message: "",
          });
        }
      }

      setChatList(parsed);
    }
  }, [isChatLoaded, previousChats, params?.sessionId]);

  // sessionId가 없는 경우에만 조회
  const { data, isSuccess } = useGetSessionId(sessionId === null);

  // sessionId 조회 성공 시 sessionId 업데이트
  useEffect(() => {
    if (isSuccess && data?.sessionId) {
      setSessionId(data.sessionId);

      setChatList([
        {
          message: data.message,
          buttons: data.buttons,
        },
      ]);
    }
  }, [isSuccess, data]);

  // 메시지를 전송하는 경우
  function handleSend() {
    if (!sessionId || !message.trim()) return;

    const userText = message;
    setMessage("");

    // 챗봇 응답 전
    let tempIndex = -1;
    setChatList((prev) => {
      const next = [...prev, { userMessage: userText, message: "응답 중..." }];
      tempIndex = next.length - 1;
      return next;
    });

    // console.log("inputType: text");
    // console.log("content: ", message);
    // console.log("sessionId: ", sessionId);

    // 챗봇 응답 후
    addChat(
      {
        inputType: "text",
        content: userText,
        sessionId,
      },
      {
        onSuccess: (response) => {
          setChatList((prev) => {
            const updated = [...prev];
            updated[tempIndex] = {
              ...updated[tempIndex],
              message: response.message,
              buttons: response.buttons,
            };
            return updated;
          });
        },
      }
    );
  }

  // 버튼을 클릭한 경우
  useEffect(() => {
    if (!selectedButton || !sessionId) return;

    const buttonText = selectedButton;
    setSelectedButton(null);

    // 챗봇 응답 전
    let tempIndex = -1;
    setChatList((prev) => {
      const next = [
        ...prev,
        { userMessage: buttonText, message: "응답 중..." },
      ];
      tempIndex = next.length - 1;
      return next;
    });

    // 챗봇 응답 후
    addChat(
      {
        inputType: "button",
        content: buttonText,
        sessionId,
      },
      {
        onSuccess: (res) => {
          setChatList((prev) => {
            const updated = [...prev];
            updated[tempIndex] = {
              ...updated[tempIndex],
              message: res.message,
              buttons: res.buttons,
            };
            return updated;
          });
        },
      }
    );
  }, [selectedButton, sessionId]);

  return (
    <SafeAreaView className="flex-1" edges={["top"]}>
      <View className="flex-1 justify-between">
        {/* 상단: 헤더 + 채팅 목록 */}
        <View>
          <HeaderLogo before={false} settings={true} />
          <ScrollView className="px-5">
            <View className="gap-3 pb-4">
              {chatList.map((chat, index) => (
                <View key={index} className="mr-20 gap-3">
                  {chat.userMessage && (
                    <View className="ml-20">
                      <Conversation bot={false} content={chat.userMessage} />
                    </View>
                  )}
                  <View className="mr-20">
                    <Conversation
                      bot={true}
                      content={chat.message}
                      buttons={chat.buttons}
                      onChatButtonPress={(id) => setSelectedButton(id)}
                    />
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* 하단 입력창 */}
        <View className="px-5 bg-violet-100 ">
          <Chatting
            message={message}
            setMessage={setMessage}
            onSend={handleSend}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

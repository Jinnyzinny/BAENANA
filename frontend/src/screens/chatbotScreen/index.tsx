import { RouteProp, useRoute } from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";
import { KeyboardAvoidingView, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAddChat, useGetChat, useGetSessionId } from "../../api/quries/chat";
import { Chatting } from "../../components/chatbot/chatting";
import { Conversation } from "../../components/chatbot/conversation";
import { HeaderLogo } from "../../components/common/headerLogo";
import { ChatbotDrawerParamList } from "../../navigation/chatbotDrawerNavigator";
import { Button, ChatData } from "../../types/Chat";

type ChatbotScreenRouteProp = RouteProp<ChatbotDrawerParamList, "Chat">;

export function ChatbotScreen() {
  const [chatList, setChatList] = useState<ChatData[]>([]);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [message, setMessage] = useState<string>("");
  const [selectedButton, setSelectedButton] = useState<Button | null>(null);
  const [responseTrigger, setResponseTrigger] = useState(0);
  const scrollRef = useRef<ScrollView>(null);

  const responseQueue = useRef<
    {
      index: number;
      message: string;
      buttons?: ChatData["buttons"];
    }[]
  >([]);

  const { params } = useRoute<ChatbotScreenRouteProp>();
  const { data: previousChats, isSuccess: isChatLoaded } = useGetChat(
    sessionId,
    !!sessionId && !!params?.sessionId
  );
  const { mutate: addChat } = useAddChat();

  // drawer에서 세션을 선택한 경우
  useEffect(() => {
    if (params?.sessionId) {
      console.log("sessionId: ", sessionId);
      setSessionId(params.sessionId);
    }
  }, [params]);

  useEffect(() => {
    if (params?.sessionId === null) {
      setSessionId(null);
    } else if (params?.sessionId) {
      setSessionId(params.sessionId);
    }
  }, [params?.sessionId]);

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
    console.log("sessionId: ", sessionId);
    if (isSuccess && data?.sessionId) {
      setSessionId(data.sessionId);

      setChatList([
        {
          message: data.message,
          buttons: data.buttons
            ? data.buttons.map((b) => ({ ...b }))
            : undefined,
        },
      ]);
    }
  }, [isSuccess, data]);

  // 사용자가 채팅을 버튼 또는 내용을 입력한 경우
  useEffect(() => {
    if (responseQueue.current.length === 0) return;

    setChatList((prev) => {
      const updated = [...prev];
      for (const res of responseQueue.current) {
        updated[res.index] = {
          ...updated[res.index],
          message: res.message,
          buttons: res.buttons ? res.buttons.map((b) => ({ ...b })) : undefined,
        };
      }
      responseQueue.current = [];
      return updated;
    });
  }, [responseTrigger]);

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

    console.log("inputType: text");
    console.log("content: ", message);
    console.log("sessionId: ", sessionId);

    // 챗봇 응답 후
    addChat(
      {
        inputType: "text",
        content: userText,
        sessionId,
      },
      {
        onSuccess: (response) => {
          const botMessage = response.data.messages.find(
            (msg: any) => msg.sender === "bot"
          );

          responseQueue.current.push({
            index: tempIndex,
            message: botMessage?.message || "",
            buttons: botMessage?.buttons || undefined,
          });
          setResponseTrigger((prev) => prev + 1);
        },
      }
    );
  }

  // 버튼을 클릭한 경우
  useEffect(() => {
    if (!selectedButton || !sessionId) return;

    const buttonId = selectedButton.id;
    const buttonText = selectedButton.text;
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

    console.log("inputType: button");
    console.log("content: ", buttonText);
    console.log("sessionId: ", sessionId);

    // 챗봇 응답 후
    addChat(
      {
        inputType: "button",
        content: buttonId,
        sessionId,
      },
      {
        onSuccess: (response) => {
          const botMessage = response.data.messages.find(
            (msg: any) => msg.sender === "bot"
          );

          responseQueue.current.push({
            index: tempIndex,
            message: botMessage?.message || "",
            buttons: botMessage?.buttons || undefined,
          });
          setResponseTrigger((prev) => prev + 1);
        },
      }
    );
  }, [selectedButton, sessionId]);

  return (
    <SafeAreaView className="flex-1" edges={["top"]}>
      <KeyboardAvoidingView className="flex-1" keyboardVerticalOffset={0}>
        <View className="flex-1 justify-between">
          {/* 상단: 헤더 + 채팅 목록 */}
          <HeaderLogo before={false} settings={true} />
          <ScrollView
            ref={scrollRef}
            contentContainerStyle={{ flexGrow: 1, paddingBottom: 32 }}
            className="px-5"
            onContentSizeChange={() => {
              scrollRef.current?.scrollToEnd({ animated: true });
            }}
          >
            <View className="gap-3">
              {chatList.map((chat, index) => (
                <View key={index} className="gap-3">
                  {chat.userMessage && (
                    <View style={{ marginLeft: 120 }}>
                      <Conversation bot={false} content={chat.userMessage} />
                    </View>
                  )}
                  <View style={{ marginRight: 80 }}>
                    <Conversation
                      bot={true}
                      content={chat.message}
                      buttons={chat.buttons}
                      onChatButtonPress={(id, text) =>
                        setSelectedButton({ id, text })
                      }
                    />
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* 하단 입력창 */}
        <View className="px-5 bg-violet-100">
          <Chatting
            message={message}
            setMessage={setMessage}
            onSend={handleSend}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

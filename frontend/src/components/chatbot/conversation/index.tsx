import { Image, Text, View } from "react-native";
import { ChatButton } from "../chatButton";

export function Conversation({
  bot,
  content,
  buttons,
  onChatButtonPress,
}: {
  bot: boolean;
  content: string;
  buttons?: { id: string; text: string }[];
  onChatButtonPress?: (buttonId: string, buttonText: string) => void;
}) {
  // 챗봇 답변인 경우
  if (bot) {
    return (
      <View className="gap-2">
        <View className="flex-row items-start">
          <Image
            source={require("../../../assets/images/mascot.png")}
            className="w-12 h-12"
          />
          <View className="flex-1">
            <View
              className={`rounded-xl p-3 ${bot ? "bg-yellow-100" : "bg-violet-200"}`}
            >
              {content.split("\n").map((line, index) => (
                <Text key={index} className="text-neutral-800 text-sm">
                  {line}
                </Text>
              ))}
            </View>
          </View>
        </View>
        {buttons && buttons.length > 0 && (
          <View style={{ marginLeft: 40 }}>
            <ChatButton items={buttons} onPress={onChatButtonPress} />
          </View>
        )}
      </View>
    );
  }

  // 사용자 입력 메시지
  return (
    <View className="rounded-xl p-3 bg-violet-200">
      <Text className="text-neutral-800 text-sm">{content}</Text>
    </View>
  );
}

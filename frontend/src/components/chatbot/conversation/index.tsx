import { View, Text, Image } from "react-native";

export function Conversation({
  bot,
  content,
}: {
  bot: boolean;
  content: string;
}) {
  if (bot) {
    return (
      <View className="flex-row items-start">
        <Image
          source={require("../../../assets/images/mascot.png")}
          className="w-12 h-12"
        />
        <View className="w-1/2">
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
    );
  }

  return (
    <View className="w-1/2 self-end">
      <View
        className={`rounded-xl p-3 ${bot ? "bg-yellow-100" : "bg-violet-200"}`}
      >
        <Text className="text-neutral-800 text-sm">{content}</Text>
      </View>
    </View>
  );
}

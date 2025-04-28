import { Text, View } from "react-native";

export function Tag({ fill, content }: { fill: boolean; content: string }) {
  return (
    <View
      className={`px-3 py-1 rounded-full border border-violet-400 ${fill ? "bg-violet-400" : "bg-white"}`}
    >
      <Text className={`text-sm ${fill ? "text-white" : "text-violet-400"}`}>
        {content}
      </Text>
    </View>
  );
}

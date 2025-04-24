import { Text, View } from "react-native";

export function Tag({ content }: { content: string }) {
  return (
    <View className="px-3 py-1 rounded-full bg-violet-300">
      <Text className="text-white text-sm">{content}</Text>
    </View>
  );
}

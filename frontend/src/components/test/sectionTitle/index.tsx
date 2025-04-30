import { Text, View } from "react-native";

export function SectionTitle({ title }: { title: string }) {
  return (
    <View className="w-2/3 py-2 self-center roundend-full bg-violet-400 rounded-full items-center">
      <Text className="text-white text-lg font-bold">{title}</Text>
    </View>
  );
}

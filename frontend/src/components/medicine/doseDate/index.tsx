import { Text, View } from "react-native";

export function DoseDate({
  name,
  start,
  end,
}: {
  name: string;
  start: string;
  end: string;
}) {
  return (
    <View className="flex-row justify-between">
      <Text className="text-neutral-600 text-sm">{name}</Text>
      <View className="flex-row gap-2">
        <Text className="text-neutral-400 text-sm">{start}</Text>
        <Text className="text-neutral-400 text-sm">-</Text>
        <Text className="text-neutral-400 text-sm">{end}</Text>
      </View>
    </View>
  );
}

import { Text, TouchableOpacity, View } from "react-native";
import { Button } from "../../../types/Chat";

export function ChatButton({
  items,
  onPress,
}: {
  items: Button[];
  onPress?: (buttonId: string, buttonText: string) => void;
}) {
  return (
    <View className="flex-row flex-wrap gap-2">
      {items.map((item) => (
        <TouchableOpacity
          key={item.id}
          onPress={() => onPress?.(item.id, item.text)}
          className="px-3 py-2 bg-violet-400 border border-violet-400 rounded-full"
        >
          <Text className="text-xs text-white">{item.text}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

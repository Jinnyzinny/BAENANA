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
    <View className="overflow-hidden rounded-xl">
      {items.map((item, index) => {
        const isFirst = index === 0;
        const isLast = index === items.length - 1;
        const isSingle = items.length === 1;

        const borderRadiusClass = isSingle
          ? "rounded-xl"
          : isFirst
            ? "rounded-t-xl"
            : isLast
              ? "rounded-b-xl"
              : "rounded-none";

        return (
          <TouchableOpacity
            key={index}
            onPress={() => onPress?.(item.id, item.text)}
            className={`p-3 bg-yellow-100 ${index !== items.length - 1 && "border-b border-neutral-400"} ${borderRadiusClass}`}
          >
            <Text className="text-center text-sm text-neutral-600">
              {item.text}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

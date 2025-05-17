import { Text, TouchableOpacity, View } from "react-native";
import { Button } from "../../../types/Chat";

export function ChatButton({ items }: { items: Button[] }) {
  return (
    <View className="overflow-hidden rounded-xl">
      {items.map((item, index) => {
        const isFirst = index === 0;
        const isLast = index === items.length - 1;
        const isSingle = items.length === 1;

        const bgColor = index % 2 === 0 ? "bg-violet-100" : "bg-yellow-100";
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
            onPress={() => {}}
            className={`p-2 ${bgColor} ${borderRadiusClass}`}
          >
            <Text className="text-center text-xs text-neutral-600 font-medium">
              {item.text}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

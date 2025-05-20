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
          className="px-3 py-2 bg-white border border-white rounded-full"
        >
          <Text className="text-xs text-neutral-800">{item.text}</Text>
        </TouchableOpacity>
      ))}
    </View>

    // 박스 내부에 버튼 정렬
    // <View className="overflow-hidden rounded-xl">
    //   {items.map((item, index) => {
    //     const isFirst = index === 0;
    //     const isLast = index === items.length - 1;
    //     const isSingle = items.length === 1;

    //     const borderRadiusClass = isSingle
    //       ? "rounded-xl"
    //       : isFirst
    //         ? "rounded-t-xl"
    //         : isLast
    //           ? "rounded-b-xl"
    //           : "rounded-none";

    //     return (
    //       <TouchableOpacity
    //         key={item.id}
    //         onPress={() => onPress?.(item.id, item.text)}
    //         className={`p-3 bg-yellow-50 ${index % 2 !== 0 && "bg-yellow-50"} ${borderRadiusClass}`}
    //       >
    //         <Text className="text-center text-xs text-neutral-600">
    //           {item.text}
    //         </Text>
    //       </TouchableOpacity>
    //     );
    //   })}
    // </View>
  );
}

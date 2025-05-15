import { ChevronRight } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";

export function Card({
  title,
  content,
  onPress,
}: {
  title: string;
  content: string | string[];
  onPress: () => void;
}) {
  const size: number = 22;
  const color: string = "#A1A1A1";

  return (
    <View className="bg-white p-5 rounded-xl gap-3">
      <View className="flex-row items-center justify-between">
        <Text className="text-neutral-800 font-bold">{title}</Text>
        <TouchableOpacity onPress={onPress}>
          <ChevronRight size={size} color={color} />
        </TouchableOpacity>
      </View>
      <Text className="text-sm text-neutral-600">{content}</Text>
    </View>
  );
}

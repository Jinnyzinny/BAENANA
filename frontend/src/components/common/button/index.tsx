import { Text, TouchableOpacity, View } from "react-native";

export function Button({
  fill,
  content,
  onPress,
}: {
  fill: boolean;
  content: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        className={`py-3 items-center rounded-xl border border-violet-400 ${fill ? "bg-violet-400" : "bg-white"}`}
      >
        <Text className={`${fill ? "text-white" : "text-violet-400"}`}>
          {content}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

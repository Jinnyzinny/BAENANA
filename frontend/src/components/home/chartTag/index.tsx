import { Text, View } from "react-native";

export function ChartTag({
  fill,
  content,
}: {
  fill: boolean;
  content: string;
}) {
  return (
    <View
      className={`px-2 py-1 rounded-full border border-violet-400 ${fill ? "bg-violet-400" : "bg-white"}`}
    >
      <Text
        className={`text-xs font-semibold ${fill ? "text-white" : "text-violet-400"}`}
      >
        {content}
      </Text>
    </View>
  );
}

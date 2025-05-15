import { BadgeCheck, TriangleAlert } from "lucide-react-native";
import { Text, View } from "react-native";

export function BeforePeriod({
  type,
  title,
  date,
}: {
  type: "warn" | "normal";
  title: string;
  date: number;
}) {
  const size: number = 16;

  return (
    <View className="flex-1 p-5 rounded-xl gap-3 bg-white shadow-neutral-300">
      <View className="flex-row items-end gap-1">
        <Text className="text-neutral-800 font-bold">{title}</Text>
        {type === "normal" ? (
          <BadgeCheck size={size} color={"#7FD19B"} />
        ) : (
          <TriangleAlert size={size} color={"#EC6344"} />
        )}
      </View>
      <Text className="text-violet-700 font-semibold text-lg">{date}일 </Text>
    </View>
  );
}

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
      {date ? (
        <Text className="text-violet-700 font-semibold text-lg">{date}일 </Text>
      ) : title === "월경 주기" ? (
        <View className="gap-1">
          <View className="flex-row items-center">
            <Text className="text-neutral-400 text-sm">월경 기간이 </Text>
            <Text className="text-violet-700 font-bold text-sm">2회 이상</Text>
          </View>
          <Text className="text-neutral-400 text-sm">입력되어야 합니다.</Text>
        </View>
      ) : (
        <View className="gap-1">
          <Text className="text-neutral-400 text-sm">월경 기간이 </Text>
          <Text className="text-neutral-400 text-sm">입력되어야 합니다.</Text>
        </View>
      )}
    </View>
  );
}

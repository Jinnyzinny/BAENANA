import { BadgeCheck, TriangleAlert } from "lucide-react-native";
import { Text, View } from "react-native";
import { Report } from "../../../types/Report";

export function Summary({ data }: { data: Report }) {
  return (
    <View className="p-5 rounded-xl gap-5 bg-white shadow-neutral-300">
      <View className="gap-3">
        <View className="flex-row items-end gap-2">
          <Text className="text-neutral-800 font-bold">
            이번 달 월경 출혈량
          </Text>
          {data?.menstrual.normal ? (
            <BadgeCheck size={16} color={"#7FD19B"} />
          ) : (
            <TriangleAlert size={16} color={"#EC6344"} />
          )}
        </View>
        <View className="flex-row">
          <Text className="text-neutral-600 text-sm">
            {data?.menstrual.bleeding_level}
          </Text>
        </View>
      </View>

      <View className="w-full h-0.5 bg-neutral-100" />

      <View className="gap-3">
        <View className="flex-row items-end gap-2">
          <Text className="text-neutral-800 font-bold">스트레스 지수</Text>
          {data?.stress.normal ? (
            <BadgeCheck size={16} color={"#7FD19B"} />
          ) : (
            <TriangleAlert size={16} color={"#EC6344"} />
          )}
        </View>
        <View className="flex-row">
          <Text className="text-neutral-600 text-sm">
            {data?.stress.stress}
          </Text>
        </View>
      </View>

      <View className="w-full h-0.5 bg-neutral-100" />

      <View className="gap-3">
        <Text className="text-neutral-800 font-bold">이번 달 월경 증상</Text>
        <View className="flex-row">
          <Text className="text-neutral-600 text-sm">
            {data?.menstrual.symptom}
          </Text>
        </View>
      </View>
    </View>
  );
}

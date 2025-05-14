import { Text, View } from "react-native";
import { Report } from "../../../types/Report";

export function Summary({ data }: { data: Report }) {
  const size: number = 16;

  return (
    <View className="p-5 rounded-xl gap-5 bg-white shadow-neutral-300">
      <View className="gap-3">
        <View className="flex-row items-center gap-2">
          <Text className="text-neutral-800 font-bold">
            이번 달 월경 출혈량
          </Text>
          {/* {type1 === "normal" ? (
            <BadgeCheck size={size} color={"#7FD19B"} />
          ) : (
            <TriangleAlert size={size} color={"#EC6344"} />
          )} */}
        </View>
        <View className="flex-row">
          <Text className="text-neutral-600 text-sm">
            출혈량이 매우 많음 상태로 3일 이상 지속되었습니다.
          </Text>
        </View>
      </View>

      <View className="w-full h-0.5 bg-neutral-100" />

      <View className="gap-3">
        <View className="flex-row items-center gap-2">
          <Text className="text-neutral-800 font-bold">스트레스 지수</Text>
          {/* {type2 === "normal" ? (
            <BadgeCheck size={size} color={"#7FD19B"} />
          ) : (
            <TriangleAlert size={size} color={"#EC6344"} />
          )} */}
        </View>
        <View className="flex-row">
          <Text className="text-neutral-600 text-sm">
            최근 3개월 스트레스 지수가 보통입니다.
          </Text>
        </View>
      </View>

      <View className="w-full h-0.5 bg-neutral-100" />

      <View className="gap-3">
        <Text className="text-neutral-800 font-bold">이번 달 월경 증상</Text>
        <View className="flex-row">
          <Text className="text-neutral-600 text-sm">
            복통과 우울감이 동반되고 있습니다.
          </Text>
        </View>
      </View>
    </View>
  );
}

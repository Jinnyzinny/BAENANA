import { Text, View } from "react-native";

export function SchedulePeriodList({
  predictedPeriod,
  childbearingAge,
}: {
  predictedPeriod: Record<"startDate" | "endDate", string>;
  childbearingAge: Record<"startDate" | "endDate", string>;
}) {
  return (
    <View
      className="bg-white rounded-xl p-5 gap-5
    "
    >
      {/* 헤더 */}
      <Text className="text-neutral-800 font-bold">월경 예정일 & 가임기</Text>

      {/* 가임기 */}
      {childbearingAge.startDate && childbearingAge.endDate && (
        <View className="flex-row items-center gap-3">
          <View className="flex-row items-center">
            <View className="w-3 h-3 rounded-full bg-yellow-100 z-10" />
            <View className="-ml-1 w-4 h-3 bg-yellow-50 z-0" />
            <View className="-ml-1 w-3 h-3 rounded-full bg-yellow-100 z-10" />
          </View>
          <View className="flex-row items-center gap-2">
            <Text className="text-neutral-600 text-sm  font-semibold">
              {childbearingAge.startDate.slice(5, 7)}월{" "}
              {childbearingAge.startDate.slice(8, 10)}일 ~{" "}
              {childbearingAge.endDate.slice(5, 7)}월{" "}
              {childbearingAge.endDate.slice(8, 10)}일
            </Text>
            <Text className="text-neutral-800 text-sm">가임기</Text>
          </View>
        </View>
      )}

      {/* 월경 예정일 */}
      {predictedPeriod.startDate && predictedPeriod.endDate && (
        <View className="flex-row items-center gap-3">
          <View className="flex-row items-center">
            <View className="w-3 h-3 rounded-full bg-violet-100 z-10" />
            <View className="-ml-1 w-4 h-3 bg-violet-50 z-0" />
            <View className="-ml-1 w-3 h-3 rounded-full bg-violet-100 z-10" />
          </View>
          <View className="flex-row items-center gap-2">
            <Text className="text-neutral-600 text-sm font-semibold">
              {predictedPeriod.startDate.slice(5, 7)}월{" "}
              {predictedPeriod.startDate.slice(8, 10)}일 ~{" "}
              {predictedPeriod.endDate.slice(5, 7)}월{" "}
              {predictedPeriod.endDate.slice(8, 10)}일
            </Text>
            <Text className="text-neutral-800 text-sm">월경 예정일</Text>
          </View>
        </View>
      )}
    </View>
  );
}

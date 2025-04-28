import { Text, View } from "react-native";

export function ScheduleList() {
  return (
    <View
      className="bg-white rounded-xl h-[40%] p-5 gap-5
    "
    >
      <Text className="text-neutral-800 font-bold">4월 주요 일정</Text>
      <View className="flex-row items-center gap-3">
        <View className="w-2" />
        <View className="w-3 h-3 rounded-full bg-yellow-300" />
        <Text className="text-neutral-800 text-sm">
          4월 8일 ~ 4월 12일 오가루트란주 주사
        </Text>
      </View>
      <View className="flex-row items-center gap-3">
        <View className="w-2" />
        <View className="w-3 h-3 rounded-full bg-violet-400" />
        <Text className="text-neutral-800 text-sm">
          4월 18일 14시 더블유 여성병원 검진 예약
        </Text>
      </View>
      <View className="flex-row items-center gap-3">
        <View className="flex-row items-center">
          <View className="w-3 h-3 rounded-full bg-violet-100 z-10" />
          <View className="-ml-1 w-4 h-3 bg-violet-50 z-0" />
          <View className="-ml-1 w-3 h-3 rounded-full bg-violet-100 z-10" />
        </View>
        <Text className="text-neutral-800 text-sm">
          4월 7일 ~ 11일 월경 예정일
        </Text>
      </View>
      <View className="flex-row items-center gap-3">
        <View className="flex-row items-center">
          <View className="w-3 h-3 rounded-full bg-yellow-100 z-10" />
          <View className="-ml-1 w-4 h-3 bg-yellow-50 z-0" />
          <View className="-ml-1 w-3 h-3 rounded-full bg-yellow-100 z-10" />
        </View>
        <Text className="text-neutral-800 text-sm">
          4월 24일 ~ 5월 2일 가임기
        </Text>
      </View>
    </View>
  );
}

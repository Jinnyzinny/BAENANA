import { Text, View } from "react-native";

export function ScheduleList() {
  return (
    <View
      className="bg-white rounded-lg p-3 gap-5
    "
    >
      <Text className="text-neutral-800 font-bold">4월 주요 일정</Text>
      <View className="flex-row items-center gap-3">
        <View className="w-3" />
        <View className="w-3 h-3 rounded-full bg-violet-400" />
        <Text className="text-neutral-800 text-sm">
          매일 오후 8시 ㅇㅇ정 복용
        </Text>
      </View>
      <View className="flex-row items-center gap-3">
        <View className="w-3" />
        <View className="w-3 h-3 rounded-full bg-violet-700" />
        <Text className="text-neutral-800 text-sm">
          4월 18일 14시 ㅇㅇ 산부인과 정기 검진
        </Text>
      </View>
      <View className="flex-row items-center gap-3">
        <View className="flex-row items-center">
          <View className="w-3 h-3 rounded-full bg-violet-300 z-10" />
          <View className="-ml-1 w-5 h-3 bg-violet-100 z-0" />
          <View className="-ml-1 w-3 h-3 rounded-full bg-violet-300 z-10" />
        </View>
        <Text className="text-neutral-800 text-sm">
          4월 7일 ~ 11일 월경 예정일
        </Text>
      </View>
    </View>
  );
}

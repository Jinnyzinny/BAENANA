import { ChevronRight } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";
import { BarChart } from "../barChart";

export function CurrentPeriod() {
  const size: number = 22;
  const color: string = "#A1A1A1";

  return (
    <View className="p-5 rounded-xl gap-5 bg-white shadow-neutral-300">
      <View className="flex-row justify-between">
        <View className="gap-1">
          <Text className="text-neutral-800 font-bold">최근 주기</Text>
          <View className="flex-row">
            <Text className="text-neutral-600 text-sm">현재 평균 주기는 </Text>
            <Text className="text-violet-700 text-sm font-bold">32일</Text>
            <Text className="text-neutral-600 text-sm">입니다.</Text>
          </View>
        </View>
        <TouchableOpacity>
          <ChevronRight size={size} color={color} />
        </TouchableOpacity>
      </View>
      {/* 반복문 사용해서 최근 6개월 간 기록 보여줄 예정 */}
      <View className="gap-3">
        <BarChart
          startDate="2025년 04월 18일"
          endDate="2025년 04월 18일"
          period={32}
          maxPeriod={40}
        />
        <BarChart
          startDate="2025년 04월 18일"
          endDate="2025년 04월 18일"
          period={32}
          maxPeriod={40}
        />
        <BarChart
          startDate="2025년 04월 18일"
          endDate="2025년 04월 18일"
          period={32}
          maxPeriod={40}
        />
        <BarChart
          startDate="2025년 04월 18일"
          endDate="2025년 04월 18일"
          period={32}
          maxPeriod={40}
        />
        <BarChart
          startDate="2025년 04월 18일"
          endDate="2025년 04월 18일"
          period={32}
          maxPeriod={40}
        />
        <BarChart
          startDate="2025년 04월 18일"
          endDate="2025년 04월 18일"
          period={32}
          maxPeriod={40}
        />
      </View>
    </View>
  );
}

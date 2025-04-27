import { ChevronRight } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";
import { BarChart } from "../barChart";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ReportStackParamList } from "../../../navigation/types";

export function CurrentPeriod() {
  const navigation =
    useNavigation<NativeStackNavigationProp<ReportStackParamList>>();
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
        <TouchableOpacity onPress={() => navigation.navigate("Period")}>
          <ChevronRight size={size} color={color} />
        </TouchableOpacity>
      </View>
      {/* 반복문 사용해서 최근 6개월 간 기록 보여줄 예정 */}
      <View className="gap-3">
        <BarChart
          startDate="2025년 03월 04일"
          endDate="2025년 04월 06일"
          period={33}
          maxPeriod={40}
        />
        <BarChart
          startDate="2025년 02월 01일"
          endDate="2025년 03월 04일"
          period={31}
          maxPeriod={40}
        />
        <BarChart
          startDate="2025년 01월 01일"
          endDate="2025년 01월 31일"
          period={30}
          maxPeriod={40}
        />
        <BarChart
          startDate="2024년 11월 30일"
          endDate="2024년 12월 31일"
          period={31}
          maxPeriod={40}
        />
        <BarChart
          startDate="2024년 10월 28일"
          endDate="2024년 11월 29일"
          period={32}
          maxPeriod={40}
        />
        <BarChart
          startDate="2024년 09월 25일"
          endDate="2024년 10월 27일"
          period={32}
          maxPeriod={40}
        />
      </View>
    </View>
  );
}

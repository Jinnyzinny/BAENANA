import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { HeaderLogo } from "../../components/common/headerLogo";
import { BarChart } from "../../components/report/barChart";

export function PeriodScreen() {
  return (
    <SafeAreaView className="flex-1">
      <HeaderLogo before={true} settings={true} />
      <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
        <View className="flex-1 rounded-xl shadow-neutral-300">
          <View className="mx-5 flex-row justify-between">
            <View className="gap-1">
              <Text className="text-neutral-800 text-xl font-bold">
                최근 주기
              </Text>
              <View className="flex-row">
                <Text className="text-neutral-600 text-lg">
                  현재 평균 주기는{" "}
                </Text>
                <Text className="text-violet-700 font-bold text-lg">32일</Text>
                <Text className="text-neutral-600 text-lg">입니다.</Text>
              </View>
            </View>
          </View>
          {/* 반복문 사용해서 모든 기록 보여줄 예정 */}
          <View className="mx-5 gap-3">
            <View className="m-3" />
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
            <BarChart
              startDate="2024년 09월 25일"
              endDate="2024년 10월 27일"
              period={32}
              maxPeriod={40}
            />
            <BarChart
              startDate="2024년 09월 25일"
              endDate="2024년 10월 27일"
              period={32}
              maxPeriod={40}
            />
            <BarChart
              startDate="2024년 09월 25일"
              endDate="2024년 10월 27일"
              period={32}
              maxPeriod={40}
            />
            <BarChart
              startDate="2024년 09월 25일"
              endDate="2024년 10월 27일"
              period={32}
              maxPeriod={40}
            />
            <BarChart
              startDate="2020년 09월 25일"
              endDate="2024년 10월 27일"
              period={32}
              maxPeriod={40}
            />
            <BarChart
              startDate="2024년 09월 25일"
              endDate="2024년 10월 27일"
              period={32}
              maxPeriod={40}
            />
            <BarChart
              startDate="2024년 09월 25일"
              endDate="2024년 10월 27일"
              period={32}
              maxPeriod={40}
            />
            <BarChart
              startDate="2024년 09월 25일"
              endDate="2024년 10월 27일"
              period={32}
              maxPeriod={40}
            />
            <BarChart
              startDate="2021년 09월 25일"
              endDate="2024년 10월 27일"
              period={32}
              maxPeriod={40}
            />
            <BarChart
              startDate="2024년 09월 25일"
              endDate="2024년 10월 27일"
              period={32}
              maxPeriod={40}
            />
            <BarChart
              startDate="2024년 09월 25일"
              endDate="2024년 10월 27일"
              period={32}
              maxPeriod={40}
            />
            <BarChart
              startDate="1999년 09월 25일"
              endDate="1999년 10월 27일"
              period={32}
              maxPeriod={40}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { format, parseISO } from "date-fns";
import { ko } from "date-fns/locale";
import { ChevronRight } from "lucide-react-native";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { ReportStackParamList } from "../../../navigation/types";
import { RecentPeriod as RecentPeriodType } from "../../../types/Report";
import { BarChart } from "../barChart";

export function RecentPeriod({ data }: { data: RecentPeriodType }) {
  const navigation =
    useNavigation<NativeStackNavigationProp<ReportStackParamList>>();
  const size: number = 22;
  const color: string = "#A1A1A1";

  const formatDate = (date: string) =>
    format(parseISO(date), "yyyy년 MM월 dd일", { locale: ko });

  return (
    <View className="p-5 rounded-xl gap-5 bg-white shadow-neutral-300">
      <View className="flex-row justify-between">
        <View className="gap-1">
          <Text className="text-neutral-800 font-bold">최근 주기</Text>
          <View className="flex-row">
            {data.average_cycle ? (
              <>
                <Text className="text-neutral-600 text-sm">
                  현재 평균 주기는{" "}
                </Text>
                <Text className="text-violet-700 text-sm font-bold">
                  {data.average_cycle}일
                </Text>
                <Text className="text-neutral-600 text-sm">입니다.</Text>
              </>
            ) : (
              <Text className="text-neutral-400 text-sm">
                평균 주기는 다음 월경 주기 입력 후 확인 가능합니다.
              </Text>
            )}
          </View>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("Period")}>
          <ChevronRight size={size} color={color} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={data.cycle_record}
        keyExtractor={(item, index) => `${item.start_date}-${index}`}
        scrollEnabled={false}
        renderItem={({ item }) => (
          <BarChart
            startDate={formatDate(item.start_date)}
            endDate={formatDate(item.end_date)}
            cycle={item.cycle}
            maxPeriod={data.average_cycle}
          />
        )}
        contentContainerStyle={{ gap: 12 }}
      />
    </View>
  );
}

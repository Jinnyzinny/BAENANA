import { useFocusEffect } from "@react-navigation/native";
import { format, parseISO } from "date-fns";
import { ko } from "date-fns/locale";
import { useCallback } from "react";
import { FlatList, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGetPeriodList } from "../../api/quries/report";
import { HeaderLogo } from "../../components/common/headerLogo";
import { BarChart } from "../../components/report/barChart";

export function PeriodScreen() {
  const { data, refetch } = useGetPeriodList();

  const formatDate = (date: string) =>
    format(parseISO(date), "yyyy년 MM월 dd일", { locale: ko });

  const averageCycle = data?.data.average_cycle ?? 0;
  const records = data?.data.cycle_record ?? [];

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [])
  );

  return (
    <SafeAreaView edges={["top", "left", "right"]} className="flex-1">
      <HeaderLogo before={true} settings={true} />
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 32 }}>
        <View className="flex-1 rounded-xl shadow-neutral-300">
          <View className="mx-5 flex-row justify-between">
            <View className="gap-1">
              <Text className="text-neutral-800 text-lg font-bold">
                전체 주기
              </Text>
              {averageCycle ? (
                <>
                  <View className="flex-row">
                    <Text className="text-neutral-600 text-sm">
                      현재 평균 주기는{" "}
                    </Text>
                    <Text className="text-violet-700 text-sm font-bold">
                      {averageCycle}일
                    </Text>
                    <Text className="text-neutral-600 text-sm">입니다.</Text>
                  </View>
                </>
              ) : (
                <Text className="text-neutral-400 text-sm">
                  평균 주기는 다음 월경 주기 입력 후 확인 가능합니다.
                </Text>
              )}
            </View>
          </View>
          <View className="m-3" />
          <View className="mx-5 p-5 bg-white rounded-xl">
            <FlatList
              data={records}
              keyExtractor={(item, index) => `${item.start_date}-${index}`}
              scrollEnabled={false}
              renderItem={({ item, index }) => (
                <View className={index !== records.length - 1 ? "mb-3" : ""}>
                  <BarChart
                    startDate={formatDate(item.start_date)}
                    endDate={formatDate(item.end_date)}
                    cycle={item.cycle}
                    maxPeriod={averageCycle}
                  />
                </View>
              )}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { FlatList, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGetMedicineList } from "../../api/quries/report";
import { HeaderLogo } from "../../components/common/headerLogo";
import { DoseDate } from "../../components/medicine/doseDate";

export function MedicineScreen() {
  const { data, refetch } = useGetMedicineList();

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
            <Text className="text-neutral-800 text-lg font-bold">
              전체 복용약
            </Text>
          </View>
          <View className="m-3" />

          {/* 최근 복용약 */}
          <View className="mx-5 gap-3">
            <View className="p-5 rounded-xl gap-5 bg-white shadow-neutral-300">
              <View className="flex-row justify-between">
                <View className="gap-1">
                  <Text className="text-neutral-800 font-bold">
                    최근 복용약
                  </Text>
                  <View className="flex-row">
                    <Text className="text-neutral-600 text-sm">
                      현재 복용 중인 약은{" "}
                    </Text>
                    <Text className="text-violet-700 text-sm font-bold">
                      {data?.data.today_medicine.length}개
                    </Text>
                    <Text className="text-neutral-600 text-sm">입니다.</Text>
                  </View>
                </View>
              </View>
              <FlatList
                data={data?.data.today_medicine}
                scrollEnabled={false}
                keyExtractor={(_, index) => `today-${index}`}
                renderItem={({ item }) => (
                  <DoseDate
                    name={item.name}
                    start={item.start_date}
                    end={item.end_date}
                  />
                )}
              />
            </View>
            <View className="p-5 rounded-xl gap-5 bg-white shadow-neutral-300">
              <View className="flex-row justify-between">
                <View className="gap-1">
                  <Text className="text-neutral-800 font-bold">
                    과거 복용약
                  </Text>
                </View>
              </View>
              <FlatList
                data={data?.data.medicine_record}
                scrollEnabled={false}
                keyExtractor={(_, index) => `today-${index}`}
                renderItem={({ item }) => (
                  <DoseDate
                    name={item.name}
                    start={item.start_date}
                    end={item.end_date}
                  />
                )}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

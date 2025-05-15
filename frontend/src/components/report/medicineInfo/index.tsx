import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ChevronRight } from "lucide-react-native";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { ReportStackParamList } from "../../../navigation/types";
import { RecentMedicine } from "../../../types/Report";

export function MedicineInfo({ data }: { data: RecentMedicine }) {
  const navigation =
    useNavigation<NativeStackNavigationProp<ReportStackParamList>>();
  const size: number = 22;
  const color: string = "#A1A1A1";

  return (
    <View className="p-5 rounded-xl gap-5 bg-white shadow-neutral-300">
      <View className="flex-row justify-between">
        <View className="gap-1">
          <Text className="text-neutral-800 font-bold">최근 복용약</Text>
          <View className="flex-row">
            <Text className="text-neutral-600 text-sm">
              현재 복용 중인 약은{" "}
            </Text>
            <Text className="text-violet-700 text-sm font-bold">
              {data?.today_medicine.length}개
            </Text>
            <Text className="text-neutral-600 text-sm">입니다.</Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("Medicine")}>
          <ChevronRight size={size} color={color} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={data?.today_medicine}
        scrollEnabled={false}
        keyExtractor={(_, index) => `today-${index}`}
        renderItem={({ item }) => (
          <Text className="text-neutral-600 text-sm">{item.name}</Text>
        )}
      />
      <View className="w-full h-0.5 bg-neutral-100" />
      <View className="flex-row">
        <Text className="text-neutral-600 text-sm">
          최근 3개월 복용했던 약은{" "}
        </Text>
        <Text className="text-violet-700 text-sm font-bold">
          {data?.medicine_record.length}개
        </Text>
        <Text className="text-neutral-600 text-sm">입니다.</Text>
      </View>
      <FlatList
        data={data?.medicine_record}
        scrollEnabled={false}
        keyExtractor={(_, index) => `today-${index}`}
        renderItem={({ item }) => (
          <Text className="text-neutral-600 text-sm">{item.name}</Text>
        )}
      />
    </View>
  );
}

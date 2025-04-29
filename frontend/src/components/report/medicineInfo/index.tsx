import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ChevronRight } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";
import { ReportStackParamList } from "../../../navigation/types";

export function MedicineInfo() {
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
            <Text className="text-violet-700 text-sm font-bold">1개</Text>
            <Text className="text-neutral-600 text-sm">입니다.</Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("Medicine")}>
          <ChevronRight size={size} color={color} />
        </TouchableOpacity>
      </View>
      {/* 반복문 사용해서 복용약 보여줄 예정 */}
      <View className="gap-2">
        <Text className="text-neutral-600 text-sm">오가루트란주 주사</Text>
      </View>
      <View className="w-full h-0.5 bg-neutral-100" />
      <View className="flex-row">
        <Text className="text-neutral-600 text-sm">
          최근 3개월 복용했던 약은{" "}
        </Text>
        <Text className="text-violet-700 text-sm font-bold">2개</Text>
        <Text className="text-neutral-600 text-sm">입니다.</Text>
      </View>
      <View className="gap-2">
        <Text className="text-neutral-600 text-sm">고날-에프펜</Text>
        <Text className="text-neutral-600 text-sm">타이레놀</Text>
      </View>
    </View>
  );
}

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ChevronRight } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";
import { SettingsStackParamList } from "../../../navigation/types";

const dummyNotice = [
  {
    id: 1,
    type: "업데이트",
    title: "iOS 업데이트 관련",
    date: "2025.04.25",
  },
  {
    id: 2,
    type: "업데이트",
    title: "안드로이드 업데이트 관련",
    date: "2025.04.24",
  },
  {
    id: 3,
    type: "보안",
    title: "안드로이드 보안 관련",
    date: "2025.04.23",
  },
];

export function Notice() {
  const navigation =
    useNavigation<NativeStackNavigationProp<SettingsStackParamList>>();
  const size: number = 22;
  const color: string = "#A1A1A1";

  return (
    <View className="bg-white p-5 rounded-xl gap-3">
      <View className="flex-row items-center justify-between">
        <Text className="text-neutral-800 font-bold">시스템 공지</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Notice")}>
          <ChevronRight size={size} color={color} />
        </TouchableOpacity>
      </View>
      <View className="gap-1">
        {dummyNotice.map((item) => (
          <View key={item.id} className="flex-row gap-3">
            <Text className="text-sm text-neutral-600">{item.date}</Text>
            <Text className="text-sm text-neutral-600">
              [{item.type}] {item.title}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

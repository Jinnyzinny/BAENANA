import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ChevronRight } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";
import { SettingsStackParamList } from "../../../navigation/types";

const dummyFaq = [
  {
    id: 1,
    type: "캘린더",
    title: "주기 입력은 어떻게 하나요?",
  },
  {
    id: 2,
    type: "보안",
    title: "개인 정보는 어떻게 관리되나요?",
  },
  {
    id: 3,
    type: "챗봇",
    title: "과거 채팅 이력을 확인하고 싶어요",
  },
  {
    id: 4,
    type: "기록",
    title: "배란테스트 결과 전체를 보고 싶어요",
  },
  {
    id: 5,
    type: "시스템",
    title: "다크모드로 사용하고 싶어요",
  },
];

export function Faq() {
  const navigation =
    useNavigation<NativeStackNavigationProp<SettingsStackParamList>>();
  const size: number = 22;
  const color: string = "#A1A1A1";

  return (
    <View className="bg-white p-5 rounded-xl gap-3">
      <View className="flex-row items-center justify-between">
        <Text className="text-neutral-800 font-bold">자주 묻는 질문</Text>
        <TouchableOpacity onPress={() => navigation.navigate("FAQ")}>
          <ChevronRight size={size} color={color} />
        </TouchableOpacity>
      </View>
      <View className="gap-1">
        {dummyFaq.map((item) => (
          <Text key={item.id} className="text-sm text-neutral-600">
            [{item.type}] {item.title}
          </Text>
        ))}
      </View>
    </View>
  );
}

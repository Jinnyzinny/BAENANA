import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ChevronRight } from "lucide-react-native";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { SettingsStackParamList } from "../../../navigation/types";
import { useGetFaqList } from "../../../api/quries/faq";

export function Faq() {
  const navigation =
    useNavigation<NativeStackNavigationProp<SettingsStackParamList>>();
  const size: number = 22;
  const color: string = "#A1A1A1";

  const { data } = useGetFaqList();

  return (
    <View className="bg-white p-5 rounded-xl gap-3">
      <View className="flex-row items-center justify-between">
        <Text className="text-neutral-800 font-bold">자주 묻는 질문</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Faq")}>
          <ChevronRight size={size} color={color} />
        </TouchableOpacity>
      </View>
      {data && (
        <FlatList
          data={data.slice(0, 5)}
          renderItem={({ item, index }) => (
            <View className={index === data.length ? "" : "pb-1"}>
              <Text className="text-neutral-600 text-sm">{item.question}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

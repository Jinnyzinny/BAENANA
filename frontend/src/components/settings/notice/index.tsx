import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ChevronRight } from "lucide-react-native";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { SettingsStackParamList } from "../../../navigation/types";
import { useGetNoticeList } from "../../../api/quries/notice";

export function Notice() {
  const navigation =
    useNavigation<NativeStackNavigationProp<SettingsStackParamList>>();
  const size: number = 22;
  const color: string = "#A1A1A1";

  const { data } = useGetNoticeList();

  return (
    <View className="bg-white p-5 rounded-xl gap-3">
      <View className="flex-row items-center justify-between">
        <Text className="text-neutral-800 font-bold">시스템 공지</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Notice")}>
          <ChevronRight size={size} color={color} />
        </TouchableOpacity>
      </View>
      {data && (
        <FlatList
          data={data.slice(0, 5)}
          renderItem={({ item, index }) => (
            <View className={index === data.length ? "" : "pb-1"}>
              <View className="flex-row items-center gap-2">
                <Text className="text-neutral-600 text-sm">
                  {item.createdAt.slice(0, 10).replaceAll("-", ".")}
                </Text>
                <Text className="text-neutral-600 text-sm">{item.title}</Text>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}

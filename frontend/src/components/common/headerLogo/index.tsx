import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ArrowLeft, Settings } from "lucide-react-native";
import { Image, TouchableOpacity, View } from "react-native";
import { RootStackParamList } from "../../../navigation/types";

export function HeaderLogo({
  before,
  settings,
}: {
  before: boolean;
  settings: boolean;
}) {
  const color: string = "#737373";
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  function handleBackPress() {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  }

  function handleSettingPress() {
    navigation.navigate("Settings");
  }

  return (
    <View className="relative mx-5 h-16 justify-center mb-2">
      {/* 좌측 이전 */}
      {before && (
        <View className="absolute left-0 top-3 bottom-0 justify-center">
          <TouchableOpacity onPress={handleBackPress}>
            <ArrowLeft size={22} color={color} />
          </TouchableOpacity>
        </View>
      )}

      {/* 중앙 로고 */}
      <View className="absolute left-0 right-0 flex-row justify-center items-center">
        <Image
          source={require("../../../assets/images/mascot.png")}
          className="w-16 h-16"
        />
        {/* <Text>타이틀</Text> */}
      </View>

      {/* 우측 톱니바퀴 */}
      {settings && (
        <View className="absolute right-0 top-3 bottom-0 justify-center">
          <TouchableOpacity onPress={handleSettingPress}>
            <Settings size={22} color={color} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

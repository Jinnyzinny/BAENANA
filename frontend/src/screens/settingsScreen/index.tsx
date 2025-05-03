import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { HeaderLogo } from "../../components/common/headerLogo";
import { Card } from "../../components/settings/card";
import { Faq } from "../../components/settings/faq";
import { Notice } from "../../components/settings/notice";
import { SettingsStackParamList } from "../../navigation/types";
import { CustomButton } from "../../components/common/customButton";

export function SettingsScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<SettingsStackParamList>>();

  return (
    <SafeAreaView>
      <HeaderLogo before={true} settings={false} />
      <View className="mx-5 gap-10">
        <View className="gap-3">
          <Card
            title="건강 정보"
            content="다양한 건강 정보를 확인해보세요"
            onPress={() => navigation.navigate("HealthInfo")}
          />
          <Notice />
          <Faq />
          <Card
            title="문의 사항"
            content="사용 중 궁금한 점을 남겨주세요"
            onPress={() => navigation.navigate("Inquriy")}
          />
        </View>
        <View className="gap-3">
          <CustomButton fill={true} content="로그아웃" onPress={() => {}} />
          <TouchableOpacity onPress={() => {}}>
            <Text className="self-center text-violet-400">탈퇴하기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

import { logout as kakaoLogout } from "@react-native-seoul/kakao-login";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CustomButton } from "../../components/common/customButton";
import { HeaderLogo } from "../../components/common/headerLogo";
import { Card } from "../../components/settings/card";
import { Faq } from "../../components/settings/faq";
import { Notice } from "../../components/settings/notice";
import { WithdrawModal } from "../../components/settings/withdrawModal";
import { SettingsStackParamList } from "../../navigation/types";
import { useLoginStore } from "../../store/loginStore";

export function SettingsScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<SettingsStackParamList>>();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const logout = useLoginStore((state) => state.logout);

  async function handleLogout() {
    try {
      await kakaoLogout();
      logout();
      console.log("☑️카카오, 앱 로그아웃 성공");
    } catch (error) {
      console.error("카카오 로그아웃 실패: ", error);
    }
  }

  return (
    <>
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
            <CustomButton
              fill={true}
              content="로그아웃"
              onPress={handleLogout}
            />
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Text className="self-center text-violet-400">탈퇴하기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>

      {/* SafeAreaView 외부 */}
      <WithdrawModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </>
  );
}

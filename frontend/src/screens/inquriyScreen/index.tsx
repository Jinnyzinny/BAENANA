import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { HeaderLogo } from "../../components/common/headerLogo";
import { UserInquriy } from "../../components/inquiry/userInquriy";
import { useLoginStore } from "../../store/loginStore";
import { AdminInquriy } from "../../components/inquiry/adminInquriy";

export function InquriyScreen() {
  const { user } = useLoginStore();
  // console.log("계정: ", user?.role);

  return (
    <SafeAreaView>
      <HeaderLogo before={true} settings={false} />
      <ScrollView>
        <View className="mx-5 gap-3 pb-16">
          {/* 문의사항 정보 설명 */}
          <View>
            <Text className="text-neutral-800 text-lg font-bold">문의사항</Text>
            <Text className="text-neutral-600 text-sm">
              사용 중 궁금한 점을 남겨주세요
            </Text>
          </View>
          <View className="m-1" />

          {/* 사용자인 경우 */}
          {user?.role === "USER" && <UserInquriy />}

          {/* 관리자인 경우 */}
          {user?.role === "ADMIN" && <AdminInquriy />}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { HeaderLogo } from "../../components/common/headerLogo";

export function NoticeScreen() {
  return (
    <SafeAreaView>
      <HeaderLogo />
      <ScrollView>
        <View className="mx-5 gap-3 pb-16">
          {/* 시스템 공지 정보 설명 */}
          <View>
            <Text className="text-neutral-800 text-lg font-bold">
              시스템 공지
            </Text>
            <Text className="text-neutral-600 text-sm">
              업데이트 및 버그 수정 등을 확인해보세요
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

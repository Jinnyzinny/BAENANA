import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { HeaderLogo } from "../../components/common/headerLogo";
import { Card } from "../../components/settings/card";

export function SettingsScreen() {
  return (
    <SafeAreaView>
      <HeaderLogo />
      <ScrollView>
        <View className="mx-5 gap-3">
          <Card
            title="건강 정보"
            content="다양한 건강 정보를 확인해보세요"
            onPress={() => {}}
          />
          <Card
            title="문의 사항"
            content="사용 중 궁금한 점을 남겨주세요"
            onPress={() => {}}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

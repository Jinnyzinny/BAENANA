import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { HeaderLogo } from "../../components/common/headerLogo";

export function InquriyScreen() {
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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

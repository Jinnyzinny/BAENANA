import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { HeaderLogo } from "../../components/common/headerLogo";

export function FAQScreen() {
  return (
    <SafeAreaView>
      <HeaderLogo before={true} settings={false} />
      <ScrollView>
        <View className="mx-5 gap-3 pb-16">
          {/* 자주 묻는 질문 정보 설명 */}
          <View>
            <Text className="text-neutral-800 text-lg font-bold">
              자주 묻는 질문
            </Text>
            <Text className="text-neutral-600 text-sm">
              자주 묻는 질문을 확인해보세요
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

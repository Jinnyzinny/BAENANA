import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { HeaderLogo } from "../../components/common/headerLogo";

export function PeriodScreen() {
  return (
    <SafeAreaView>
      <HeaderLogo />
      <View className="mx-5">
        <Text>주기</Text>
      </View>
    </SafeAreaView>
  );
}

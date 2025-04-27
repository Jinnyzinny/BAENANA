import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { HeaderLogo } from "../../components/common/headerLogo";

export function MedicineScreen() {
  return (
    <SafeAreaView>
      <HeaderLogo />
      <View className="mx-5">
        <Text>약 정보</Text>
      </View>
    </SafeAreaView>
  );
}

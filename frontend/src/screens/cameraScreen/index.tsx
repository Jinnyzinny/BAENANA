import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { HeaderLogo } from "../../components/common/headerLogo";

export function CameraScreen() {
  return (
    <SafeAreaView>
      <HeaderLogo before={true} settings={true} />
      <View className="mx-5">
        <Text>카메라</Text>
      </View>
    </SafeAreaView>
  );
}

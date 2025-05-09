import { ActivityIndicator, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { HeaderLogo } from "../headerLogo";

export function Loading() {
  return (
    <SafeAreaView className="flex-1">
      <HeaderLogo before={true} settings={false} />
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#3B82F6" />
        <Text className="mt-4 text-lg font-bold text-neutral-600">
          로딩 중...
        </Text>
      </View>
    </SafeAreaView>
  );
}

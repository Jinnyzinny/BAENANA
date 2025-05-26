import { ActivityIndicator, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { HeaderLogo } from "../headerLogo";

export function PermissionCheck({ name }: { name: string }) {
  return (
    <SafeAreaView className="flex-1">
      <HeaderLogo before={true} settings={false} />
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#A684FF" />
        <Text className="mt-4 text-neutral-400">{name} 권한 확인 중...</Text>
      </View>
    </SafeAreaView>
  );
}

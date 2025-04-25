import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "../../components/common/button";
import { HeaderLogo } from "../../components/common/headerLogo";

export function TestScreen() {
  return (
    <SafeAreaView className="flex-1">
      <HeaderLogo />
      <View className="flex-1 mx-5">
        <Text className="text-xl font-bold text-neutral-800">
          배란테스트 & 임신 테스트
        </Text>
        <Text className="text-neutral-600">
          카메라를 키트랑 수평으로 놓고 찍어 주세요!
        </Text>
        {/* 컴포넌트 추가 예정(컴포넌트는 ScrollView로 감싸야 함) */}
        <View className="h-32">
          <Button content="타이머 시작" fill={false} onPress={() => {}} />
          <Button content="촬영하러 가기" fill={true} onPress={() => {}} />
        </View>
      </View>
    </SafeAreaView>
  );
}

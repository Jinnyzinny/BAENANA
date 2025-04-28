import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "../../components/common/button";
import { HeaderLogo } from "../../components/common/headerLogo";
import { TestStackParamList } from "../../navigation/types";
import { TabMenu } from "../../components/common/tabMenu";
import { useState } from "react";
import { PregnancyInfo } from "../../components/test/pregnancyInfo";
import { OvulationInfo } from "../../components/test/ovulationInfo";

export function TestInfoScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<TestStackParamList>>();
  const [selectedMenu, setSelectedMenu] = useState<string>("ovulation");

  return (
    <SafeAreaView className="flex-1">
      <HeaderLogo before={false} settings={true} />
      <View className="flex-1 gap-3">
        {/* 테스트 정보 */}
        <View className="mx-5">
          <Text className="text-xl font-bold text-neutral-800">
            배란테스트 & 임신 테스트
          </Text>
          <Text className="text-neutral-600 text-sm">
            카메라를 키트랑 수평으로 놓고 찍어 주세요!
          </Text>
        </View>
        <TabMenu
          tabs={[
            { key: "ovulation", label: "배란 테스트 안내" },
            { key: "pregnancy", label: "임신 테스트 안내" },
          ]}
          onSelect={(key) => {
            setSelectedMenu(key);
          }}
        />
        {/* 컴포넌트 추가 예정(컴포넌트는 ScrollView로 감싸야 함) */}
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View className="mx-5 gap-5 flex-1">
            {selectedMenu === "ovulation" ? (
              <OvulationInfo />
            ) : (
              <PregnancyInfo />
            )}
            <View className="gap-3">
              <Button content="타이머 시작" fill={false} onPress={() => {}} />
              <Button
                content="촬영하러 가기"
                fill={true}
                onPress={() => navigation.navigate("Camera")}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "../../components/common/button";
import { HeaderLogo } from "../../components/common/headerLogo";
import { TabMenu } from "../../components/common/tabMenu";
import { ResultInfo } from "../../components/test/resultInfo";
import { TestInfo } from "../../components/test/testInfo";
import { TimerModal } from "../../components/test/timerModal";
import { TestStackParamList } from "../../navigation/types";

export function TestInfoScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<TestStackParamList>>();
  const [selectedMenu, setSelectedMenu] = useState<string>("test");
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <SafeAreaView edges={["top", "left", "right"]} className="flex-1">
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
              { key: "test", label: "테스트 준비" },
              { key: "result", label: "결과 확인" },
            ]}
            onSelect={(key) => {
              setSelectedMenu(key);
            }}
          />
          <ScrollView
            contentContainerStyle={{ flexGrow: 1, paddingBottom: 32 }}
          >
            <View className="mx-5 gap-5">
              {selectedMenu === "test" ? <TestInfo /> : <ResultInfo />}
              <View className="gap-3">
                <Button
                  content="타이머 시작"
                  fill={false}
                  onPress={() => setModalVisible(true)}
                />
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

      <TimerModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </>
  );
}

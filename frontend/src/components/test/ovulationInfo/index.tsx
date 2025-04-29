import { Image, Text, View } from "react-native";
import { SectionTitle } from "../sectionTitle";
import { StepInfo } from "../stepInfo";

export function OvulationInfo() {
  return (
    <View className="gap-2">
      <StepInfo
        title="5. 타이머 시작"
        contents={[
          {
            first: "",
            middle: "[타이머 시작]",
            last: "을 누르고 잠시만 기다려주세요.",
          },
        ]}
      />

      <View className="m-1" />

      {/* 그림 */}
      <View className="w-full h-36 items-center justify-center">
        <Image
          source={require("../../../assets/images/mascot_test_02.png")}
          className="w-[30%] h-full"
          resizeMode="contain"
        />
      </View>

      <View className="m-1" />

      {/* 결과 확인 방법 */}
      <View className="bg-white rounded-xl p-5 gap-5">
        <SectionTitle title="결과 확인 방법" />

        <View className="items-center gap-2">
          <Text className="text-lg text-neutral-800 font-bold">
            1. 촬영 준비
          </Text>
          <View className="items-center">
            <View className="flex-row">
              <Text className="text-sm text-neutral-600">타이머가 끝나면 </Text>
              <Text className="text-sm text-neutral-600 font-bold">
                [촬영하러 가기]
              </Text>
              <Text className="text-sm text-neutral-600">를 눌러주세요.</Text>
            </View>
            <Text className="text-sm text-violet-400">
              ※ 카메라 권한 허용을 해야 촬영할 수 있어요.
            </Text>
          </View>
        </View>
        <View className="items-center gap-2">
          <Text className="text-lg text-neutral-800 font-bold">
            2. 카메라 위치 맞추기
          </Text>
          <View className="items-center">
            <View className="flex-row">
              <Text className="text-sm text-neutral-600">
                파우치의 검정 사각형을 화면의{" "}
              </Text>
              <Text className="text-sm text-neutral-600 font-bold">
                붉은 사각형
              </Text>
              <Text className="text-sm text-neutral-600">에 맞춰주세요.</Text>
            </View>
          </View>
        </View>
        <View className="items-center gap-2">
          <Text className="text-lg text-neutral-800 font-bold">
            3. 결과 분석
          </Text>
          <View className="items-center">
            <View className="flex-row">
              <Text className="text-sm text-neutral-600">붉은 사각형이 </Text>
              <Text className="text-sm text-neutral-600 font-bold">녹색</Text>
              <Text className="text-sm text-neutral-600">으로 바뀌고</Text>
            </View>
            <View className="flex-row">
              <Text className="text-sm text-neutral-600 font-bold">
                "흔들리지 않게 유지하세요"
              </Text>
              <Text className="text-sm text-neutral-600"> 문구가 나오면,</Text>
            </View>
            <Text className="text-sm text-neutral-600">
              그대로 기다려주세요
            </Text>
          </View>
        </View>
        <View className="m-1" />
      </View>
    </View>
  );
}

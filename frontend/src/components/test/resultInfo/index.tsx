import { Image, View } from "react-native";
import { SectionTitle } from "../sectionTitle";
import { StepInfo } from "../stepInfo";

export function ResultInfo() {
  return (
    <View className="gap-2">
      <View className="h-40">
        <View className="m-1" />
        {/* 그림 */}
        <View className="w-full h-36 items-center justify-center">
          <Image
            source={require("../../../assets/images/mascot_test_02.png")}
            className="w-[30%] h-full"
            resizeMode="contain"
          />
        </View>
      </View>

      {/* 결과 확인 방법 */}
      <View className="bg-white rounded-xl p-5 gap-5">
        <SectionTitle title="결과 확인 방법" />
        <StepInfo
          title="1. 촬영 준비"
          contents={[
            {
              first: "타이머가 끝나면 ",
              middle: "[촬영하러 가기]",
              last: "를 눌러주세요.",
            },
          ]}
          alert="※ 카메라 권한 허용을 해야 촬영할 수 있어요."
        />
        <StepInfo
          title="2. 카메라 위치 맞추기"
          contents={[
            {
              first: "파우치의 검정 사각형을",
              middle: "",
              last: "",
            },
            {
              first: "화면의 ",
              middle: "붉은 사각형",
              last: "에 맞춰주세요.",
            },
          ]}
        />
        <StepInfo
          title="3. 결과 분석"
          contents={[
            {
              first: "붉은 사각형이 ",
              middle: "녹색",
              last: "으로 바뀌고",
            },
            {
              first: "",
              middle: `"흔들리지 않게 유지하세요" `,
              last: "문구가 나오면,",
            },
            {
              first: "그대로 기다려주세요",
              middle: "",
              last: "",
            },
          ]}
        />

        <View className="m-1" />
      </View>
    </View>
  );
}

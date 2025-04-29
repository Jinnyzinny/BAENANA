import { Image, View } from "react-native";
import { SectionTitle } from "../sectionTitle";
import { StepInfo } from "../stepInfo";

export function TestInfo() {
  return (
    <View className="gap-2">
      <View className="h-40">
        {/* 그림 */}
        <View className="w-full h-36 items-center justify-center">
          <Image
            source={require("../../../assets/images/mascot_test_01.png")}
            className="w-[30%] h-full"
            resizeMode="contain"
          />
        </View>
      </View>

      {/* 검체 준비 방법 */}
      <View className="bg-white rounded-xl p-5 gap-5">
        <SectionTitle title="검체 준비 방법" />

        <StepInfo
          title="1. 사전 준비"
          contents={[
            {
              first: "",
              middle: "깨끗하게 건조된 컵",
              last: "에 소변을 받아주세요.",
            },
          ]}
        />
        <StepInfo
          title="2. 파우치 개봉"
          contents={[
            {
              first: "파우치를 개봉해 ",
              middle: "스트립",
              last: "을 꺼내주세요.",
            },
          ]}
          alert="※ 테스트 완료 전까지 파우치는 버리지 마세요!"
        />
        <StepInfo
          title="3. 스트립 담그기"
          contents={[
            {
              first: "스트립을 소변에 ",
              middle: "5초",
              last: "간 담갔다 빼주세요.",
            },
          ]}
          alert="※ 화살표 아래 선을 넘지 않도록 주의하세요."
        />
        <StepInfo
          title="4. 스트립 올리기"
          contents={[
            {
              first: "편평한 곳에 파우치를 놓고,",
              middle: "",
              last: "",
            },
            {
              first: "소변에 적신 ",
              middle: "스트립을 괄호([ ])",
              last: "안에 맞춰 올려주세요.",
            },
          ]}
        />
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
      </View>

      <View className="m-1" />
    </View>
  );
}

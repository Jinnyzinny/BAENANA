import { Image, Text, View } from "react-native";

export function OvulationInfo() {
  return (
    <View className="gap-2">
      {/* 그림 */}
      <View className="w-full h-36 items-center justify-center">
        <Image
          source={require("../../../assets/images/mascot_test_01.png")}
          className="w-[30%] h-full"
          resizeMode="contain"
        />
      </View>

      {/* 검체 준비 방법 */}
      <View className="bg-white rounded-xl p-5 gap-5">
        <View className="w-2/3 py-2 self-center roundend-full bg-violet-400 rounded-full items-center">
          <Text className="text-white text-lg font-bold">검체 준비 방법</Text>
        </View>
        <View className="items-center gap-2">
          <Text className="text-lg text-neutral-800 font-bold">
            1. 사전 준비
          </Text>
          <View className="flex-row">
            <Text className="text-sm text-neutral-600 font-bold">
              깨끗하게 건조된 컵
            </Text>
            <Text className="text-sm text-neutral-600">
              에 소변을 받아주세요.
            </Text>
          </View>
        </View>
        <View className="items-center gap-2">
          <Text className="text-lg text-neutral-800 font-bold">
            2. 파우치 개봉
          </Text>
          <View className="items-center">
            <View className="flex-row">
              <Text className="text-sm text-neutral-600">파우치를 개봉해 </Text>
              <Text className="text-sm text-neutral-600 font-bold">스트립</Text>
              <Text className="text-sm text-neutral-600">을 꺼내주세요.</Text>
            </View>
            <Text className="text-sm text-violet-400">
              ※ 테스트 완료 전까지 파우치는 버리지 마세요!
            </Text>
          </View>
        </View>
        <View className="items-center gap-2">
          <Text className="text-lg text-neutral-800 font-bold">
            3. 스트립 담그기
          </Text>
          <View className="items-center">
            <View className="flex-row">
              <Text className="text-sm text-neutral-600">스트립을 소변에 </Text>
              <Text className="text-sm text-neutral-600 font-bold">5초</Text>
              <Text className="text-sm text-neutral-600">
                간 담갔다 빼주세요.
              </Text>
            </View>
            <Text className="text-sm text-violet-400">
              ※ 화살표 아래 선을 넘지 않도록 주의하세요.
            </Text>
          </View>
        </View>
        <View className="items-center gap-2">
          <Text className="text-lg text-neutral-800 font-bold">
            4. 스트립 올리기
          </Text>
          <View className="items-center">
            <Text className="text-sm text-neutral-600">
              편평한 곳에 파우치를 놓고,
            </Text>
            <View className="flex-row">
              <Text className="text-sm text-neutral-600">소변에 적신 </Text>
              <Text className="text-sm text-neutral-600 font-bold">
                스트립을 괄호([ ]){" "}
              </Text>
              <Text className="text-sm text-neutral-600">
                안에 맞춰 올려주세요.
              </Text>
            </View>
          </View>
        </View>
        <View className="items-center gap-2">
          <Text className="text-lg text-neutral-800 font-bold">
            5. 타이머 시작
          </Text>
          <View className="flex-row">
            <Text className="text-sm text-neutral-600 font-bold">
              [타이머 시작]
            </Text>
            <Text className="text-sm text-neutral-600">
              을 누르고 잠시만 기다려주세요.
            </Text>
          </View>
        </View>
        <View className="m-1" />
      </View>

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
        <View className="w-2/3 py-2 self-center roundend-full bg-violet-400 rounded-full items-center">
          <Text className="text-white text-lg font-bold">결과 확인 방법</Text>
        </View>
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

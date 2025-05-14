import { Text, View } from "react-native";
import { OvulationGraph } from "../ovulationGraph";

export function OvulationInfo() {
  // const { data, refetch } = useGetOvulationTest();

  // useFocusEffect(() => {
  //   useCallback(() => {
  //     refetch();
  //   }, []);
  // });

  return (
    <View className="p-5 rounded-xl bg-white shadow-neutral-300">
      <View className="gap-1">
        <Text className="text-neutral-800 font-bold">배란 테스트 결과</Text>

        {/* 가임기 정보 */}
        <View className="flex-row gap-1">
          <Text className="text-neutral-600 text-sm">예상 가임기:</Text>
          <Text className="text-violet-700 text-sm font-bold">05월 01일</Text>
          <Text className="text-violet-700 text-sm font-bold">~</Text>
          <Text className="text-violet-700 text-sm font-bold">05월 03일</Text>
        </View>

        {/* 배란일 정보 */}
        <View className="flex-row gap-1">
          <Text className="text-neutral-600 text-sm">예상 배란일:</Text>
          <Text className="text-violet-700 text-sm font-bold">05월 02일</Text>
        </View>
      </View>

      {/* 배란테스트 결과 그래프 */}
      <OvulationGraph />
    </View>
  );
}

import { Text, View } from "react-native";
import { OvulationGraph } from "../ovulationGraph";
import { Ovulation } from "../../../types/Report";
import { Date } from "../../../types/Period";
import { addDays, differenceInCalendarDays, format, parseISO } from "date-fns";

export function OvulationInfo({
  ovulationData,
  childbearingAgeData,
}: {
  ovulationData: Ovulation;
  childbearingAgeData: Date;
}) {
  const start = parseISO(childbearingAgeData.start_date);
  const end = parseISO(childbearingAgeData.end_date);
  const diffDays = differenceInCalendarDays(end, start);
  const ovulationDate = addDays(start, Math.floor(diffDays / 2));
  const calculateDate = format(ovulationDate, "yyyy-MM-dd");

  return (
    <View className="p-5 rounded-xl bg-white shadow-neutral-300">
      <View className="gap-1">
        <Text className="text-neutral-800 font-bold">배란 테스트 결과</Text>

        {/* 가임기 정보 */}
        <View className="flex-row gap-1">
          <Text className="text-neutral-600 text-sm">예상 가임기:</Text>
          <Text className="text-violet-700 text-sm font-bold">
            {childbearingAgeData.start_date.slice(5, 7)}월{" "}
            {childbearingAgeData.start_date.slice(8, 10)}일 ~{" "}
            {childbearingAgeData.end_date.slice(5, 7)}월{" "}
            {childbearingAgeData.end_date.slice(8, 10)}일
          </Text>
        </View>

        {/* 배란일 정보 */}
        <View className="flex-row gap-1">
          <Text className="text-neutral-600 text-sm">예상 배란일:</Text>
          <Text className="text-violet-700 text-sm font-bold">
            {calculateDate.slice(5, 7)}월 {calculateDate.slice(8, 10)}일
          </Text>
        </View>
      </View>

      {/* 배란테스트 결과 그래프 */}
      <OvulationGraph
        data={ovulationData}
        start={childbearingAgeData.start_date}
        middle={calculateDate}
        end={childbearingAgeData.end_date}
      />
    </View>
  );
}

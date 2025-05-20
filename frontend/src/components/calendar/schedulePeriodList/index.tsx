import { SquarePen, Trash2 } from "lucide-react-native";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { useDeletePeriod } from "../../../api/quries/period";
import { Period } from "../../../types/Period";

export function SchedulePeriodList({
  period,
  predictedPeriod,
  childbearingAge,
}: {
  period: Period[];
  predictedPeriod: Record<"startDate" | "endDate", string>;
  childbearingAge: Record<"startDate" | "endDate", string>;
}) {
  const color: string = "#A3A3A3";
  const size: number = 18;

  const { mutate: deletePeriod } = useDeletePeriod();

  function handleEdit() {}
  function handleDelete(cycleId: number) {
    Alert.alert("삭제", "입력된 내용을 삭제하시겠습니까?", [
      { text: "취소", style: "cancel" },
      {
        text: "확인",
        style: "destructive",
        onPress: () => {
          deletePeriod(cycleId);
        },
      },
    ]);
  }

  return (
    <View className="bg-white rounded-xl p-5 gap-5">
      {/* 헤더 */}
      <Text className="text-neutral-800 font-bold">월경 관련 일정</Text>

      {/* 월경일 */}
      {(period ?? []).map((p, index) => (
        <View className="flex-row items-center gap-3" key={index}>
          <View className="flex-row items-center gap-1">
            <View
              className="rounded-full bg-violet-300"
              style={{
                width: 8,
                height: 8,
              }}
            />
            <View
              className="rounded-full bg-violet-200"
              style={{
                width: 8,
                height: 8,
              }}
            />
            <View
              className="rounded-full bg-violet-300"
              style={{
                width: 8,
                height: 8,
              }}
            />
          </View>
          <View className="flex-1">
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center gap-2">
                <Text className="text-neutral-600 text-sm font-semibold">
                  {p.start_date.slice(5, 7)}월 {p.start_date.slice(8, 10)}일 ~{" "}
                  {p.end_date.slice(5, 7)}월 {p.end_date.slice(8, 10)}일
                </Text>
                <Text className="text-neutral-800 text-sm">월경일</Text>
              </View>
              <View className="pt-1 flex-row items-center gap-1">
                <TouchableOpacity onPress={() => handleEdit()}>
                  <SquarePen color={color} size={size - 2} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDelete(p.cycle_id)}>
                  <Trash2 color={color} size={size - 2} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      ))}

      {/* 가임기 */}
      {childbearingAge.startDate && childbearingAge.endDate && (
        <View className="flex-row items-center gap-3">
          <View className="flex-row items-center gap-1">
            <View
              className="rounded-full bg-yellow-100"
              style={{
                width: 8,
                height: 8,
              }}
            />
            <View
              className="rounded-full bg-yellow-50"
              style={{
                width: 8,
                height: 8,
              }}
            />
            <View
              className="rounded-full bg-yellow-100"
              style={{
                width: 8,
                height: 8,
              }}
            />
          </View>
          <View className="flex-row items-center gap-2">
            <Text className="text-neutral-600 text-sm  font-semibold">
              {childbearingAge.startDate.slice(5, 7)}월{" "}
              {childbearingAge.startDate.slice(8, 10)}일 ~{" "}
              {childbearingAge.endDate.slice(5, 7)}월{" "}
              {childbearingAge.endDate.slice(8, 10)}일
            </Text>
            <Text className="text-neutral-800 text-sm">가임기</Text>
          </View>
        </View>
      )}

      {/* 월경 예정일 */}
      {predictedPeriod.startDate && predictedPeriod.endDate && (
        <View className="flex-row items-center gap-3">
          <View className="flex-row items-center gap-1">
            <View
              className="rounded-full bg-violet-100"
              style={{
                width: 8,
                height: 8,
              }}
            />
            <View
              className="rounded-full bg-violet-50"
              style={{
                width: 8,
                height: 8,
              }}
            />
            <View
              className="rounded-full bg-violet-100"
              style={{
                width: 8,
                height: 8,
              }}
            />
          </View>
          <View className="flex-row items-center gap-2">
            <Text className="text-neutral-600 text-sm font-semibold">
              {predictedPeriod.startDate.slice(5, 7)}월{" "}
              {predictedPeriod.startDate.slice(8, 10)}일 ~{" "}
              {predictedPeriod.endDate.slice(5, 7)}월{" "}
              {predictedPeriod.endDate.slice(8, 10)}일
            </Text>
            <Text className="text-neutral-800 text-sm">월경 예정일</Text>
          </View>
        </View>
      )}

      {/* 정보가 입력되지 않은 경우 */}
      {period.length === 0 &&
        !childbearingAge.startDate &&
        !childbearingAge.endDate &&
        !predictedPeriod.startDate &&
        !predictedPeriod.endDate && (
          <Text className="text-neutral-400 text-sm">
            입력된 정보가 없습니다.
          </Text>
        )}
    </View>
  );
}

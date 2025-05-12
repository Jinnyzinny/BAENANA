import { Text, View } from "react-native";
import { HospitalReservation } from "../../../types/Hospital";
import { Medicine } from "../../../types/Medicine";

export function ScheduleList({
  selectedMonth,
  hospitalReservation,
  medicineReservation,
  predictedPeriod,
  childbearingAge,
}: {
  selectedMonth: number;
  hospitalReservation: HospitalReservation[];
  medicineReservation: Medicine[];
  predictedPeriod: Record<"startDate" | "endDate", string>;
  childbearingAge: Record<"startDate" | "endDate", string>;
}) {
  return (
    <View
      className="bg-white rounded-xl p-5 gap-5
    "
    >
      {/* 헤더 */}
      <Text className="text-neutral-800 font-bold">
        {selectedMonth}월 주요 일정
      </Text>

      {/* 복용약 일정 */}
      {medicineReservation.length > 0 &&
        medicineReservation.map((item) => (
          <View
            key={item.medication_id}
            className="flex-row items-center gap-3"
          >
            <View className="w-2" />
            <View className="w-3 h-3 rounded-full bg-yellow-300" />
            <Text className="text-neutral-800 text-sm">
              {item.start_date.slice(5, 7)}월 {item.start_date.slice(8, 10)}일 ~{" "}
              {item.end_date.slice(5, 7)}월 {item.end_date.slice(8, 10)}일{" "}
              {item.name}
            </Text>
          </View>
        ))}

      {/* 병원 일정 */}
      {hospitalReservation.length > 0 &&
        hospitalReservation.map((item) => (
          <View
            key={item.reservation_id}
            className="flex-row items-center gap-3"
          >
            <View className="w-2" />
            <View className="w-3 h-3 rounded-full bg-violet-400" />
            <Text className="text-neutral-800 text-sm">
              {item.reservation_date_time.slice(5, 7)}월{" "}
              {item.reservation_date_time.slice(8, 10)}일{" "}
              {item.reservation_date_time.slice(11, 13)}시 {item.hospital_name}{" "}
              {item.purpose}
            </Text>
          </View>
        ))}

      {/* 월경 예정일 */}
      {predictedPeriod.startDate && predictedPeriod.endDate && (
        <View className="flex-row items-center gap-3">
          <View className="flex-row items-center">
            <View className="w-3 h-3 rounded-full bg-violet-100 z-10" />
            <View className="-ml-1 w-4 h-3 bg-violet-50 z-0" />
            <View className="-ml-1 w-3 h-3 rounded-full bg-violet-100 z-10" />
          </View>
          <Text className="text-neutral-800 text-sm">
            {predictedPeriod.startDate.slice(5, 7)}월{" "}
            {predictedPeriod.startDate.slice(8, 10)}일 ~{" "}
            {predictedPeriod.endDate.slice(5, 7)}월{" "}
            {predictedPeriod.endDate.slice(8, 10)}일 가임기
          </Text>
        </View>
      )}

      {/* 가임기 */}
      {childbearingAge.startDate && childbearingAge.endDate && (
        <View className="flex-row items-center gap-3">
          <View className="flex-row items-center">
            <View className="w-3 h-3 rounded-full bg-yellow-100 z-10" />
            <View className="-ml-1 w-4 h-3 bg-yellow-50 z-0" />
            <View className="-ml-1 w-3 h-3 rounded-full bg-yellow-100 z-10" />
          </View>
          <Text className="text-neutral-800 text-sm">
            {childbearingAge.startDate.slice(5, 7)}월{" "}
            {childbearingAge.startDate.slice(8, 10)}일 ~{" "}
            {childbearingAge.endDate.slice(5, 7)}월{" "}
            {childbearingAge.endDate.slice(8, 10)}일 가임기
          </Text>
        </View>
      )}
    </View>
  );
}

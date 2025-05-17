import { Text, View } from "react-native";
import { HospitalReservation } from "../../../types/Hospital";
import { Medicine } from "../../../types/Medicine";

export function ScheduleList({
  selectedMonth,
  hospitalReservation,
  medicineReservation,
}: {
  selectedMonth: number;
  hospitalReservation: HospitalReservation[];
  medicineReservation: Medicine[];
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
        medicineReservation.map((item) => {
          const isSameDay = item.start_date === item.end_date;
          const startMonth = item.start_date.slice(5, 7);
          const startDay = item.start_date.slice(8, 10);
          const endMonth = item.end_date.slice(5, 7);
          const endDay = item.end_date.slice(8, 10);

          return (
            <View
              key={item.medication_id}
              className="flex-row items-center gap-3"
            >
              <View className="w-4" />
              <View
                style={{
                  width: 6,
                  height: 6,
                }}
                className="rounded-full bg-yellow-300"
              />
              <View className="flex-row items-center gap-2">
                <Text className="text-neutral-600 text-sm font-semibold">
                  {isSameDay
                    ? `${startMonth}월 ${startDay}일`
                    : `${startMonth}월 ${startDay}일 ~ ${endMonth}월 ${endDay}일`}{" "}
                </Text>
                <Text className="text-neutral-800 text-sm">{item.name}</Text>
              </View>
            </View>
          );
        })}

      {/* 병원 일정 */}
      {hospitalReservation.length > 0 &&
        hospitalReservation.map((item) => (
          <View
            key={item.reservation_id}
            className="flex-row items-center gap-3"
          >
            <View className="w-4" />
            <View
              style={{
                width: 6,
                height: 6,
              }}
              className="rounded-full bg-violet-400"
            />
            <View className="flex-row items-center gap-2">
              <Text className="text-neutral-600 text-sm font-semibold">
                {item.reservation_date_time.slice(5, 7)}월{" "}
                {item.reservation_date_time.slice(8, 10)}일{" "}
                {item.reservation_date_time.slice(11, 13)}시{" "}
              </Text>
              <Text className="text-neutral-800 text-sm">
                {item.hospital_name}
              </Text>
            </View>
          </View>
        ))}
    </View>
  );
}

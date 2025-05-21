import {
  ChevronDown,
  ChevronUp,
  Minus,
  Plus,
  SquarePen,
  Trash2,
} from "lucide-react-native";
import { useRef, useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import {
  useDeleteMedicineReservation,
  useEditMedicineReservation,
} from "../../../api/quries/medicine";
import { Daily } from "../../../types/Daily";
import { FormatDateKST } from "../../../utils/formatDate";
import { parseDate } from "../../../utils/parseDate";
import { parseTime } from "../../../utils/parseTime";
import { CustomButton } from "../../common/customButton";
import { DateDropdown } from "../../common/dateDropdown";
import { TimeDropdown } from "../../common/timeDropdown";

export function MedicineInfo({ data }: { data: Daily }) {
  const color = "#A3A3A3";
  const size = 18;

  return (
    <View className="gap-4">
      {data.medication.map((medicine, index) => {
        const initStartDate = parseDate(medicine.start_date);
        const initEndDate = parseDate(medicine.end_date);

        const startYear = initStartDate.getFullYear();
        const startMonth = initStartDate.getMonth() + 1;
        const startDay = initStartDate.getDate();

        const endYear = initEndDate.getFullYear();
        const endMonth = initEndDate.getMonth() + 1;
        const endDay = initEndDate.getDate();

        const first = medicine.injection_time[0]
          ? parseTime(medicine.injection_time[0])
          : null;
        const second = medicine.injection_time[1]
          ? parseTime(medicine.injection_time[1])
          : null;
        const third = medicine.injection_time[2]
          ? parseTime(medicine.injection_time[2])
          : null;

        const firstTime = first
          ? new Date(0, 0, 0, first.hour, first.minute)
          : null;
        const secondTime = second
          ? new Date(0, 0, 0, second.hour, second.minute)
          : null;
        const thirdTime = third
          ? new Date(0, 0, 0, third.hour, third.minute)
          : null;

        const initTimes = [firstTime, secondTime, thirdTime]
          .filter(Boolean)
          .map((t, i) => ({ id: i + 1, time: t }));

        const [isToggleOpen, setIsToggleOpen] = useState(false);
        const [isEdit, setIsEdit] = useState(false);
        const [medicineName, setMedicineName] = useState(
          medicine.medication_name
        );
        const [startDate, setStartDate] = useState<Date | null>(initStartDate);
        const [endDate, setEndDate] = useState<Date | null>(initEndDate);
        const [memo, setMemo] = useState(medicine.memo);
        const [times, setTimes] = useState(initTimes);
        const idCounter = useRef(initTimes.length + 1);

        const { mutate: editMedicineReservation } =
          useEditMedicineReservation();
        const { mutate: deleteMedicineReservation } =
          useDeleteMedicineReservation();

        function addTime() {
          if (times.length < 3) {
            setTimes([...times, { id: idCounter.current++, time: null }]);
          }
        }

        function removeTime(id: number) {
          if (times.length > 1) {
            setTimes((prev) => prev.filter((t) => t.id !== id));
          }
        }

        function handleTimeChange(id: number, date: Date) {
          setTimes((prev) =>
            prev.map((t) => (t.id === id ? { ...t, time: date } : t))
          );
        }

        function cancelEdit() {
          setMedicineName(medicine.medication_name);
          setStartDate(initStartDate);
          setEndDate(initEndDate);
          setMemo(medicine.memo);
          setTimes(initTimes);
          setIsEdit(false);
        }

        function saveEdit() {
          if (!startDate || !endDate || times.some((t) => !t.time)) {
            Alert.alert("입력 오류", "모든 날짜와 복용 시간을 입력해주세요.");
            return;
          }

          const formatStartDate = FormatDateKST(startDate);
          const formatEndDate = FormatDateKST(endDate);
          const timeTaken = times.map(
            (t) => t.time!.toTimeString().slice(0, 5) // "HH:mm"
          );

          // console.log(
          //   medicine.medication_id,
          //   medicineName,
          //   start,
          //   end,
          //   timeTaken,
          //   memo
          // );

          editMedicineReservation({
            id: medicine.medication_id,
            medicineName,
            startDate: formatStartDate,
            endDate: formatEndDate,
            timeTaken,
            memo,
          });

          setIsEdit(false);
        }

        function handleDelete() {
          Alert.alert("삭제", "이 복용약 정보를 삭제하시겠습니까?", [
            { text: "취소", style: "cancel" },
            {
              text: "확인",
              style: "destructive",
              onPress: () => deleteMedicineReservation(medicine.medication_id),
            },
          ]);
        }

        return (
          <View key={index} className="gap-3">
            {/* 헤더 */}
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center gap-2">
                <Text className="text-neutral-800 text-lg font-bold">
                  {medicine.medication_name}
                </Text>
                <View className="pt-1 flex-row items-center gap-1">
                  <TouchableOpacity
                    onPress={() => {
                      setIsEdit(true);
                      setIsToggleOpen(true);
                    }}
                  >
                    <SquarePen color={color} size={size - 2} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={handleDelete}>
                    <Trash2 color={color} size={size - 2} />
                  </TouchableOpacity>
                </View>
              </View>
              <TouchableOpacity onPress={() => setIsToggleOpen(!isToggleOpen)}>
                {isToggleOpen ? (
                  <ChevronUp color={color} size={size} />
                ) : (
                  <ChevronDown color={color} size={size} />
                )}
              </TouchableOpacity>
            </View>

            {isToggleOpen &&
              (isEdit ? (
                <>
                  {/* 복용약 이름 */}
                  <View className="gap-3">
                    <Text className="text-neutral-800 text-sm font-bold">
                      복용약 이름
                    </Text>
                    <View className="mx-5 border-b border-neutral-400">
                      <TextInput
                        className="pl-3 h-12 font-bold text-lg"
                        placeholder="복용약 이름을 입력해주세요."
                        value={medicineName}
                        onChangeText={setMedicineName}
                      />
                    </View>
                  </View>

                  {/* 시작일 */}
                  <View className="gap-3">
                    <Text className="text-neutral-800 text-sm font-bold">
                      복용 시작일
                    </Text>
                    <View className="mx-5">
                      <DateDropdown
                        title="복용 시작일"
                        year={startYear}
                        month={startMonth}
                        day={startDay}
                        onChange={setStartDate}
                      />
                    </View>
                  </View>

                  {/* 종료일 */}
                  <View className="gap-3">
                    <Text className="text-neutral-800 text-sm font-bold">
                      복용 종료일
                    </Text>
                    <View className="mx-5">
                      <DateDropdown
                        title="복용 종료일"
                        year={endYear}
                        month={endMonth}
                        day={endDay}
                        onChange={setEndDate}
                      />
                    </View>
                  </View>

                  {/* 복용 시간 */}
                  <View className="gap-3">
                    <Text className="text-neutral-800 text-sm font-bold">
                      복용 시간
                    </Text>
                    {times.map((item, i) => (
                      <View
                        key={item.id}
                        className="mx-5 flex-row items-center gap-3"
                      >
                        <TimeDropdown
                          title="복용 시간"
                          hour={item.time?.getHours() ?? 9}
                          minute={item.time?.getMinutes() ?? 0}
                          onChange={(d) => handleTimeChange(item.id, d)}
                        />
                        {times.length < 3 && i === times.length - 1 && (
                          <TouchableOpacity onPress={addTime}>
                            <View className="p-1 bg-violet-400 rounded-full">
                              <Plus color="#FFFFFF" size={12} strokeWidth={3} />
                            </View>
                          </TouchableOpacity>
                        )}
                        {times.length > 1 && (
                          <TouchableOpacity onPress={() => removeTime(item.id)}>
                            <View className="p-1 bg-violet-400 rounded-full">
                              <Minus
                                color="#FFFFFF"
                                size={12}
                                strokeWidth={3}
                              />
                            </View>
                          </TouchableOpacity>
                        )}
                      </View>
                    ))}
                  </View>

                  {/* 메모 */}
                  <View className="gap-3">
                    <Text className="text-neutral-800 text-sm font-bold">
                      메모
                    </Text>
                    <View className="mx-5 border-b border-neutral-400">
                      <TextInput
                        className="text-sm"
                        placeholder="메모할 사항을 입력해주세요 (선택)"
                        value={memo}
                        onChangeText={setMemo}
                      />
                    </View>
                  </View>

                  <View className="pt-5 flex-row gap-3">
                    <View className="flex-1">
                      <CustomButton
                        fill={false}
                        content="취소"
                        onPress={cancelEdit}
                      />
                    </View>
                    <View className="flex-1">
                      <CustomButton
                        fill={true}
                        content="저장"
                        onPress={saveEdit}
                      />
                    </View>
                  </View>
                </>
              ) : (
                <>
                  {/* 복용 시간 */}
                  <View className="gap-3">
                    <Text className="text-neutral-800 text-sm font-bold">
                      복용 시간
                    </Text>
                    {times.map((item, i) => (
                      <Text
                        key={item.id}
                        className="mx-5 text-lg font-bold text-violet-400"
                      >
                        {i + 1}.{" "}
                        {item.time?.toLocaleTimeString("ko-KR", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </Text>
                    ))}
                  </View>

                  {/* 메모 */}
                  {memo && (
                    <View className="gap-3">
                      <Text className="text-neutral-800 text-sm font-bold">
                        메모
                      </Text>
                      <View className="mx-5 border-b border-neutral-400">
                        <Text className="text-neutral-800 text-sm pl-1 pb-3">
                          {memo}
                        </Text>
                      </View>
                    </View>
                  )}
                </>
              ))}
          </View>
        );
      })}
    </View>
  );
}

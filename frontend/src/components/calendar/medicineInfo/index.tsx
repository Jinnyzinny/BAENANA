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
import { Daily } from "../../../types/Daily";
import { parseDate } from "../../../utils/parseDate";
import { parseTime } from "../../../utils/parseTime";
import { CustomButton } from "../../common/customButton";
import { DateDropdown } from "../../common/dateDropdown";
import { TimeDropdown } from "../../common/timeDropdown";

export function MedicineInfo({ data }: { data: Daily }) {
  const color: string = "#A3A3A3";
  const size: number = 18;
  const [isToggleOpen, setIsToggleOpen] = useState<boolean>(false); // 토글 상태(t/f)
  const [isEdit, setIsEdit] = useState<boolean>(false); // 편집 상태(t/f)

  // 약 이름
  const [medicineName, setMedicineName] = useState<string>(
    data.medication.medication_name
  );

  // 복용일(시작, 종료) - 초기값
  const initStartDate = parseDate(data.medication.start_date);
  const initEndDate = parseDate(data.medication.end_date);

  // 복용일 - 초기값
  const startYear: number = initStartDate.getFullYear(); // 연도
  const startMonth: number = initStartDate.getMonth() + 1; // 월
  const startDay: number = initStartDate.getDate(); // 일

  const endYear: number = initEndDate.getFullYear(); // 연도
  const endMonth: number = initEndDate.getMonth() + 1; // 월
  const endDay: number = initEndDate.getDate(); // 일

  // 복용일(시작, 종료) - 수정
  const [startDate, setStartDate] = useState<Date | null>(initStartDate);
  const [endDate, setEndDate] = useState<Date | null>(initEndDate);

  // 복용 시간 - 초기값
  const injectionTimes = data.medication.injection_time;
  const first = injectionTimes[0] ? parseTime(injectionTimes[0]) : null;
  const second = injectionTimes[1] ? parseTime(injectionTimes[1]) : null;
  const third = injectionTimes[2] ? parseTime(injectionTimes[2]) : null;
  const firstTime = first ? new Date(0, 0, 0, first.hour, first.minute) : null;
  const secondTime = second
    ? new Date(0, 0, 0, second.hour, second.minute)
    : null;
  const thirdTime = third ? new Date(0, 0, 0, third.hour, third.minute) : null;
  const initReservationTimes = [
    firstTime && { id: 1, time: firstTime },
    secondTime && { id: 2, time: secondTime },
    thirdTime && { id: 3, time: thirdTime },
  ].filter(Boolean) as { id: number; time: Date | null }[];
  console.log("💉 injectionTimes:", injectionTimes);
  console.log("⏱️ initReservationTimes:", initReservationTimes);

  // 복용 시간(배열)
  const [reservationTimes, setReservationTimes] =
    useState<{ id: number; time: Date | null }[]>(initReservationTimes);

  const idCounter = useRef(initReservationTimes.length + 1);

  // 메모
  const [memo, setMemo] = useState<string>(data.medication.memo);

  // 복용 시간 추가: 최대 3개까지 가능하도록 설정
  function addReservationTime() {
    if (reservationTimes.length < 3) {
      setReservationTimes([
        ...reservationTimes,
        { id: idCounter.current++, time: null },
      ]);
    }
  }

  // 복용약 시간 삭제
  function removeReservationTime(id: number) {
    if (reservationTimes.length > 1) {
      setReservationTimes((prev) => prev.filter((item) => item.id !== id));
    }
  }

  // 복용약 시간 변경
  function handleTimeChange(id: number, date: Date) {
    setReservationTimes((prev) =>
      prev.map((item) => (item.id === id ? { ...item, time: date } : item))
    );
  }

  // 수정 시 토글 열기, 상태 변경
  function handleEdit() {
    setIsEdit(true);
    setIsToggleOpen(true);
  }

  // 수정 취소(입력 내용 초기화, 상태 변경)
  function cancelEdit() {
    setMedicineName(data.medication.medication_name);
    setStartDate(parseDate(data.medication.start_date));
    setEndDate(parseDate(data.medication.end_date));
    setReservationTimes(initReservationTimes);
    setMemo(data.medication.memo);
    setIsEdit(false);
  }

  // 수정 내용 저장(상태 변경)
  function saveEdit() {
    setIsEdit(false);
  }

  // 삭제
  function handleDelete() {
    Alert.alert("삭제", "입력된 내용을 삭제하시겠습니까?", [
      {
        text: "취소",
        style: "cancel",
      },
      {
        text: "확인",
        style: "destructive",
        onPress: () => {},
      },
    ]);
  }

  return (
    <View className="gap-3">
      {/* 헤더 - 제목 / 수정 / 삭제 / 토글 */}
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-2">
          <Text className="text-neutral-800 text-lg font-bold">
            {data.medication.medication_name}
          </Text>
          <View className="pt-1 flex-row items-center gap-1">
            {/* 수정 버튼 */}
            <TouchableOpacity onPress={handleEdit}>
              <SquarePen color={color} size={size - 2} />
            </TouchableOpacity>
            {/* 삭제 버튼 */}
            <TouchableOpacity onPress={handleDelete}>
              <Trash2 color={color} size={size - 2} />
            </TouchableOpacity>
          </View>
        </View>
        {/* 토글 */}
        <TouchableOpacity onPress={() => setIsToggleOpen(!isToggleOpen)}>
          {isToggleOpen ? (
            <ChevronUp color={color} size={size} />
          ) : (
            <ChevronDown color={color} size={size} />
          )}
        </TouchableOpacity>
      </View>

      {/* 본문 */}
      {isToggleOpen &&
        (isEdit ? (
          // 수정 중인 경우
          <>
            {/* 복용약 이름 입력 */}
            <View className="gap-3">
              <Text className="text-neutral-800 text-sm font-bold ">
                복용약 이름
              </Text>
              <View className="mx-5 border-b border-neutral-400">
                <View className="relative justify-center h-12">
                  {medicineName === "" && (
                    <Text className="absolute left-3 text-neutral-400 font-bold text-lg">
                      복용약 이름을 입력해주세요.
                    </Text>
                  )}
                  <TextInput
                    className="pl-3 h-12 font-bold text-lg"
                    value={medicineName}
                    onChangeText={setMedicineName}
                  />
                </View>
              </View>
            </View>

            {/* 복용 시작일 */}
            <View className="gap-3">
              <Text className="text-neutral-800 text-sm font-bold ">
                복용 시작일
              </Text>
              <View className="flex-row mx-5 items-center justify-between">
                <DateDropdown
                  year={startYear}
                  month={startMonth}
                  day={startDay}
                  title="복용 시작일"
                  onChange={setStartDate}
                />
              </View>
            </View>

            {/* 복용 종료일 */}
            <View className="gap-3">
              <Text className="text-neutral-800 text-sm font-bold ">
                복용 종료일
              </Text>
              <View className="flex-row mx-5 items-center justify-between">
                <DateDropdown
                  year={endYear}
                  month={endMonth}
                  day={endDay}
                  title="복용 종료일"
                  onChange={setEndDate}
                />
              </View>
            </View>

            {/* 복용 시간 */}
            <View className="gap-3">
              <Text className="text-neutral-800 text-sm font-bold ">
                복용 시간
              </Text>
              {reservationTimes.map((item, index) => (
                <View
                  key={item.id}
                  className="mx-5 flex-row justify-center items-center gap-3"
                >
                  <TimeDropdown
                    title="복용 시간"
                    hour={item.time?.getHours() ?? 9}
                    minute={item.time?.getMinutes() ?? 0}
                    onChange={(date) => handleTimeChange(item.id, date)}
                  />
                  {reservationTimes.length < 3 &&
                    index === reservationTimes.length - 1 && (
                      <TouchableOpacity onPress={addReservationTime}>
                        <View className="p-1 bg-violet-400 rounded-full">
                          <Plus color="#FFFFFF" size={12} strokeWidth={3} />
                        </View>
                      </TouchableOpacity>
                    )}
                  {reservationTimes.length > 1 && (
                    <TouchableOpacity
                      onPress={() => removeReservationTime(item.id)}
                    >
                      <View className="p-1 bg-violet-400 rounded-full">
                        <Minus color="#FFFFFF" size={12} strokeWidth={3} />
                      </View>
                    </TouchableOpacity>
                  )}
                </View>
              ))}
            </View>

            {/* 메모 */}
            <View className="gap-3">
              <Text className="text-neutral-800 text-sm font-bold">메모</Text>
              <View className="mx-5 flex-1 border-b border-neutral-400">
                {memo === "" && (
                  <Text
                    className="absolute text-neutral-400 text-sm"
                    style={{ left: 4, top: 10 }}
                  >
                    메모할 사항을 입력해주세요 (선택)
                  </Text>
                )}
                <TextInput
                  value={memo}
                  onChangeText={setMemo}
                  className="text-sm"
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
                <CustomButton fill={true} content="저장" onPress={saveEdit} />
              </View>
            </View>
          </>
        ) : (
          // 수정하지 않는 경우
          <>
            {/* 복용 시간 */}
            <View className="gap-3">
              <Text className="text-neutral-800 text-sm font-bold ">
                복용 시간
              </Text>
              {initReservationTimes.map((item, index) => (
                <Text
                  key={item.id}
                  className="mx-5 text-lg font-bold text-violet-400"
                >
                  {index + 1}.{" "}
                  {item.time?.toLocaleTimeString("ko-KR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Text>
              ))}
            </View>

            {/* 메모 */}
            {data.medication.memo && (
              <View className="gap-3">
                <Text className="text-neutral-800 text-sm font-bold">메모</Text>
                <View className="mx-5 flex-1 border-b border-neutral-400">
                  <Text className="text-neutral-800 text-sm pl-1 pb-3">
                    {data.medication.memo}
                  </Text>
                </View>
              </View>
            )}
          </>
        ))}
    </View>
  );
}

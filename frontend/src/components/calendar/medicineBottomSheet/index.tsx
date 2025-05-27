import { Minus, Plus } from "lucide-react-native";
import { RefObject, useRef, useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { Modalize } from "react-native-modalize";
import { useAddMedicineReservation } from "../../../api/quries/medicine";
import { formatDateKST } from "../../../utils/Date";
import { CustomButton } from "../../common/customButton";
import { DateDropdown } from "../../common/dateDropdown";
import { TimeDropdown } from "../../common/timeDropdown";

export function MedicineBottomSheet({
  height,
  sheetRef,
  selectedDate,
}: {
  height: number;
  sheetRef: RefObject<Modalize | null>;
  selectedDate: string | null;
}) {
  const [medicineName, setMedicineName] = useState<string>("");
  const year = Number(selectedDate?.slice(0, 4));
  const month = Number(selectedDate?.slice(5, 7));
  const day = Number(selectedDate?.slice(8, 10));
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const [reservationTimes, setReservationTimes] = useState<
    { id: number; time: Date | null }[]
  >([{ id: 1, time: null }]);

  const idCounter = useRef(2);
  const [memo, setMemo] = useState<string>("");

  // 복용약 시간 추가: 최대 3개까지 가능하도록 설정
  function addReservationTime() {
    if (reservationTimes.length < 3) {
      setReservationTimes([
        ...reservationTimes,
        { id: idCounter.current++, time: null },
      ]);
    }
  }

  const { mutate: addMedicineReservation } = useAddMedicineReservation();

  // 복용약 일정 저장
  function handleSave() {
    if (!medicineName) {
      Alert.alert("입력 오류", "복용약 이름을 입력해주세요.");
      return;
    }

    if (!startDate || !endDate) {
      Alert.alert("입력 오류", "시작일과 종료일을 모두 입력해주세요.");
      return;
    }

    const formatStartDate = formatDateKST(startDate);
    const formatEndDate = formatDateKST(endDate);

    const timeTaken = reservationTimes
      .map((item) => {
        if (!item.time) return null;

        const hours = String(item.time.getHours()).padStart(2, "0");
        const minutes = String(item.time.getMinutes()).padStart(2, "0");

        return `${hours}:${minutes}`;
      })
      .filter((t): t is string => !!t);

    if (timeTaken.length === 0) {
      Alert.alert("입력 오류", "복용 시간을 한 개 이상 설정해주세요.");
      return;
    }

    console.log("복용약 이름: ", medicineName);
    console.log("복용 시작일: ", formatStartDate);
    console.log("복용 종료일: ", formatEndDate);
    console.log("시간: ", timeTaken);
    console.log("메모: ", memo);

    addMedicineReservation(
      {
        medicineName,
        startDate: formatStartDate,
        endDate: formatEndDate,
        timeTaken,
        memo,
      },
      {
        onSuccess: () => {
          sheetRef.current?.close();
        },
      }
    );
  }

  // 입력 폼 초기화
  function resetForm() {
    setMedicineName("");
    setStartDate(null);
    setEndDate(null);
    setReservationTimes([{ id: 1, time: null }]);
    idCounter.current = 2;
    setMemo("");
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

  return (
    <Modalize
      ref={sheetRef}
      snapPoint={height * 0.9}
      onOpen={resetForm}
      panGestureEnabled={false}
      scrollViewProps={{ keyboardShouldPersistTaps: "handled" }}
    >
      {/* 헤더 */}
      <View className="mx-5 mt-7 mb-5 flex-row items-start justify-start gap-2">
        <Image
          source={require("../../../assets/images/mascot.png")}
          className="w-10 h-10"
        />
        <Text className="text-lg font-bold self-center">복용약 입력</Text>
      </View>
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}>
        <View className="mx-7 gap-7">
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
                year={year}
                month={month}
                day={day}
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
                year={year}
                month={month}
                day={day}
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

          {/* 저장 버튼 */}
          <View className="mt-10">
            <CustomButton fill={true} content="저장" onPress={handleSave} />
          </View>
        </View>
      </ScrollView>
    </Modalize>
  );
}

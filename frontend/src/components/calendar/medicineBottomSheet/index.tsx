import { RefObject, useRef, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Modalize } from "react-native-modalize";
import { TextInput } from "react-native-gesture-handler";
import { DateDropdown } from "../../common/dateDropdown";
import { TimeDropdown } from "../../common/timeDropdown";
import { CustomButton } from "../../common/customButton";
import { Minus, Plus } from "lucide-react-native";

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
    <Modalize ref={sheetRef} snapPoint={height * 0.843}>
      {/* 헤더 */}
      <View className="mx-5 mt-7 mb-5 flex-row items-start justify-start gap-2">
        <Image
          source={require("../../../assets/images/mascot.png")}
          className="w-10 h-10"
        />
        <Text className="text-lg font-bold self-center">복용약 입력</Text>
      </View>
      <ScrollView>
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
                year={year}
                month={month}
                day={day}
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
            <CustomButton fill={true} content="저장" onPress={() => {}} />
          </View>
        </View>
      </ScrollView>
    </Modalize>
  );
}

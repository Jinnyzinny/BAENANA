import { useRef, useState } from "react";
import {
  InteractionManager,
  ScrollView,
  useWindowDimensions,
  View,
} from "react-native";
import { Modalize } from "react-native-modalize";
import { SafeAreaView } from "react-native-safe-area-context";
import { HospitalBottomSheet } from "../../components/calendar/hospitalBottomSheet";
import { MedicineBottomSheet } from "../../components/calendar/medicineBottomSheet";
import { Monthly } from "../../components/calendar/monthly";
import { PeriodBottomSheet } from "../../components/calendar/periodBottomSheet";
import { ScheduleList } from "../../components/calendar/scheduleList";
import { ScheduleModal } from "../../components/calendar/scheduleModal";
import { SymptomBottomSheet } from "../../components/calendar/symptomBottomSheet";
import { CustomButton } from "../../components/common/customButton";
import { HeaderLogo } from "../../components/common/headerLogo";

export function CalendarScreen() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedType, setSelectedType] = useState<
    "period" | "symptom" | "hospital" | "medicine" | null
  >(null);
  const sheetRef = useRef<Modalize>(null);
  const { height } = useWindowDimensions();
  const month = new Date().getMonth() + 1;
  const [selectedMonth, setSelectedMonth] = useState<number>(month);

  // 날짜 선택 시 선택된 날짜 저장, 모달 열기
  function handleDatePress(date: string) {
    setSelectedDate(date);
    setModalVisible(true);
  }

  // 바텀시트(증상 / 병원 / 약): 모달 닫기
  function handleBottomSheet(type: "symptom" | "hospital" | "medicine" | null) {
    setSelectedType(type);
    setModalVisible(false);
    InteractionManager.runAfterInteractions(() => {
      sheetRef.current?.open();
    });
  }

  // 주기 입력 바텀시트: 모달 닫기
  function handlePeriodOpen() {
    setSelectedType("period");
    InteractionManager.runAfterInteractions(() => {
      sheetRef.current?.open();
    });
  }

  return (
    <>
      <SafeAreaView className="flex-1">
        <HeaderLogo before={false} settings={true} />
        <ScrollView>
          <View className="flex-1 mx-5 gap-3">
            <Monthly
              onDateSelect={handleDatePress}
              selectedMonth={selectedMonth}
              setSelectedMonth={() => setSelectedMonth}
            />
            <ScheduleList selectedMonth={selectedMonth} />
            <CustomButton
              fill={true}
              content="월경일 입력"
              onPress={handlePeriodOpen}
            />
          </View>
        </ScrollView>
      </SafeAreaView>

      {/* SafeAreaView 외부 */}

      {/* 일정 및 입력 버튼 모달 */}
      <ScheduleModal
        visible={modalVisible}
        date={selectedDate}
        onClose={() => setModalVisible(false)}
        handleBottomSheet={handleBottomSheet}
      />

      {/* 바텀 시트 */}
      {selectedType === "period" && (
        // 월경일 입력
        <PeriodBottomSheet height={height} sheetRef={sheetRef} period={6} />
      )}

      {selectedType === "symptom" && (
        // 월경 증상 입력
        <SymptomBottomSheet
          height={height}
          sheetRef={sheetRef}
          selectedDate={selectedDate}
        />
      )}

      {selectedType === "hospital" && (
        // 병원 입력
        <HospitalBottomSheet
          height={height}
          sheetRef={sheetRef}
          selectedDate={selectedDate}
        />
      )}

      {selectedType === "medicine" && (
        // 복용약 입력
        <MedicineBottomSheet
          height={height}
          sheetRef={sheetRef}
          selectedDate={selectedDate}
        />
      )}
    </>
  );
}

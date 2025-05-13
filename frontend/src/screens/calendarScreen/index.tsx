import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  InteractionManager,
  ScrollView,
  useWindowDimensions,
  View,
} from "react-native";
import { Modalize } from "react-native-modalize";
import { useGetHospitalReservation } from "../../api/quries/hospital";
import { useGetMedicineReservation } from "../../api/quries/medicine";
import {
  useGetChildbearingAge,
  useGetPredictedPeriod,
} from "../../api/quries/period";
import { HospitalBottomSheet } from "../../components/calendar/hospitalBottomSheet";
import { MedicineBottomSheet } from "../../components/calendar/medicineBottomSheet";
import { Monthly } from "../../components/calendar/monthly";
import { PeriodBottomSheet } from "../../components/calendar/periodBottomSheet";
import { ScheduleList } from "../../components/calendar/scheduleList";
import { ScheduleModal } from "../../components/calendar/scheduleModal";
import { SymptomBottomSheet } from "../../components/calendar/symptomBottomSheet";
import { CustomButton } from "../../components/common/customButton";
import { HeaderLogo } from "../../components/common/headerLogo";
import { HospitalReservation } from "../../types/Hospital";
import { Medicine } from "../../types/Medicine";
import { SchedulePeriodList } from "../../components/calendar/schedulePeriodList";
import { SafeAreaView } from "react-native-safe-area-context";

export function CalendarScreen() {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedType, setSelectedType] = useState<
    "period" | "symptom" | "hospital" | "medicine" | null
  >(null);
  const sheetRef = useRef<Modalize>(null);
  const { height } = useWindowDimensions();
  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1;
  const [selectedYear, setSelectedYear] = useState<number>(year);
  const [selectedMonth, setSelectedMonth] = useState<number>(month);

  // 월별 병원 예약 일정
  const [hospitalReservation, setHospitalReservation] = useState<
    HospitalReservation[]
  >([]);
  const { data: hospitalReservationData, refetch: refetchHospitalReservation } =
    useGetHospitalReservation(selectedYear, selectedMonth);

  // 월별 복용약 일정
  const [medicineReservation, setMedicineReservation] = useState<Medicine[]>(
    []
  );
  const { data: medicineReservationData, refetch: refetchMedicineReservation } =
    useGetMedicineReservation(selectedYear, selectedMonth);

  // 월별 가임기
  const [childbearingAge, setChildbearingAge] = useState({
    startDate: "",
    endDate: "",
  });
  const { data: childbearingAgeData, refetch: refetchChildbearingAge } =
    useGetChildbearingAge();

  // 월경 예정일
  const [predictedPeriod, setPredictedPeriod] = useState({
    startDate: "",
    endDate: "",
  });
  const { data: predictedPeriodData, refetch: refetchPredictedPeriod } =
    useGetPredictedPeriod();

  useEffect(() => {
    // 병원 예약
    setHospitalReservation(hospitalReservationData?.data ?? []);

    // 복용약 예약
    setMedicineReservation(medicineReservationData?.data ?? []);

    // 가임기
    if (childbearingAgeData?.data) {
      setChildbearingAge({
        startDate: childbearingAgeData.data.start_date,
        endDate: childbearingAgeData.data.end_date,
      });
    } else {
      setChildbearingAge({ startDate: "", endDate: "" });
    }

    // 월경 예정일
    if (predictedPeriodData?.data) {
      setPredictedPeriod({
        startDate: predictedPeriodData.data.start_date,
        endDate: predictedPeriodData.data.end_date,
      });
    } else {
      setPredictedPeriod({ startDate: "", endDate: "" });
    }
  }, [
    hospitalReservationData,
    medicineReservationData,
    childbearingAgeData,
    predictedPeriodData,
  ]);

  useFocusEffect(
    useCallback(() => {
      refetchHospitalReservation();
      refetchMedicineReservation();
      refetchChildbearingAge();
      refetchPredictedPeriod();
    }, [])
  );

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
    <SafeAreaView>
      <HeaderLogo before={false} settings={true} />
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 52 }}>
        <View className="flex-1 mx-5 gap-3">
          {/* 캘린더 */}
          <Monthly
            onDateSelect={handleDatePress}
            selectedMonth={selectedMonth}
            setSelectedYear={setSelectedYear}
            setSelectedMonth={setSelectedMonth}
            hospitalReservation={hospitalReservation}
            medicineReservation={medicineReservation}
            predictedPeriod={predictedPeriod}
            childbearingAge={childbearingAge}
          />
          {/* 월경 예정일 & 가임기 */}
          <SchedulePeriodList
            predictedPeriod={predictedPeriod}
            childbearingAge={childbearingAge}
          />
          {/* 월별 주요 일정 */}
          <ScheduleList
            selectedMonth={selectedMonth}
            hospitalReservation={hospitalReservation}
            medicineReservation={medicineReservation}
          />
          <CustomButton
            fill={true}
            content="월경일 입력"
            onPress={handlePeriodOpen}
          />
        </View>
      </ScrollView>

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
    </SafeAreaView>
  );
}

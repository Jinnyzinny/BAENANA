import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { useGetHospitalReservation } from "../../api/quries/hospital";
import { useGetMedicineReservation } from "../../api/quries/medicine";
import {
  useGetChildbearingAge,
  useGetPeriod,
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
import { Period } from "../../types/Period";

export function CalendarScreen() {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedType, setSelectedType] = useState<
    "period" | "symptom" | "hospital" | "medicine" | null
  >(null);
  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1;
  const [selectedYear, setSelectedYear] = useState<number>(year);
  const [selectedMonth, setSelectedMonth] = useState<number>(month);
  const [periodVisible, setPeriodVisible] = useState<boolean>(false);
  const [symptomVisible, setSymptomVisible] = useState<boolean>(false);
  const [hospitalVisible, setHospitalVisible] = useState<boolean>(false);
  const [medicineVisible, setMedicineVisible] = useState<boolean>(false);

  // 월별 월경일
  const [period, setPeriod] = useState<Period[]>([]);
  const { data: periodData, refetch: refetchPeriod } = useGetPeriod(
    selectedYear,
    selectedMonth
  );

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
    // 월경일
    setPeriod(periodData?.data ?? []);
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
    periodData,
    hospitalReservationData,
    medicineReservationData,
    childbearingAgeData,
    predictedPeriodData,
  ]);

  useFocusEffect(
    useCallback(() => {
      refetchPeriod();
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

    if (type === "symptom") {
      setSymptomVisible(true);
    } else if (type === "hospital") {
      setHospitalVisible(true);
    } else if (type === "medicine") {
      setMedicineVisible(true);
    }
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
            period={period}
            hospitalReservation={hospitalReservation}
            medicineReservation={medicineReservation}
            predictedPeriod={predictedPeriod}
            childbearingAge={childbearingAge}
          />
          {/* 월경 예정일 & 가임기 */}
          <SchedulePeriodList
            period={period}
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
            onPress={() => setPeriodVisible(true)}
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
      {/* 월경일 입력 */}
      <PeriodBottomSheet
        visible={periodVisible}
        onClose={() => setPeriodVisible(false)}
        period={6}
      />

      {/* 월경 증상 입력 */}
      <SymptomBottomSheet
        visible={symptomVisible}
        onClose={() => setSymptomVisible(false)}
        selectedDate={selectedDate}
      />

      {/* 병원 입력 */}
      <HospitalBottomSheet
        visible={hospitalVisible}
        onClose={() => setHospitalVisible(false)}
        selectedDate={selectedDate}
      />

      {/* 복용약 입력 */}
      <MedicineBottomSheet
        visible={medicineVisible}
        onClose={() => setMedicineVisible(false)}
        selectedDate={selectedDate}
      />
    </SafeAreaView>
  );
}

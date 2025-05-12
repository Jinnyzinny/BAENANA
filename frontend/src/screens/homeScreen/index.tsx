import { useFocusEffect } from "@react-navigation/native";
import { differenceInCalendarDays, parseISO } from "date-fns";
import { useCallback, useMemo, useRef } from "react";
import { InteractionManager, useWindowDimensions, View } from "react-native";
import { Modalize } from "react-native-modalize";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGetHospitalAlert } from "../../api/quries/hospital";
import { useGetMedicineAlert } from "../../api/quries/medicine";
import { useGetDday } from "../../api/quries/period";
import { PeriodBottomSheet } from "../../components/calendar/periodBottomSheet";
import { AlertMessage } from "../../components/common/alertMessage";
import { CustomButton } from "../../components/common/customButton";
import { HeaderLogo } from "../../components/common/headerLogo";
import { DonutChart } from "../../components/home/donutChart";

export function HomeScreen() {
  const sheetRef = useRef<Modalize>(null);
  const { height } = useWindowDimensions();
  const { data: dDayData, refetch: refetchDday } = useGetDday();
  const { data: hospitalData, refetch: refetchHospitalData } =
    useGetHospitalAlert();
  const { data: medicineData, refetch: refetchMedicineData } =
    useGetMedicineAlert();

  // 오늘 날짜 문자열("yyyy-MM-dd")로 변경
  function getTodayDateString(): string {
    const today = new Date();
    return today.toISOString().split("T")[0];
  }

  // 도넛차트 - 퍼센트, D-day 계산
  const { percentage, dDay } = useMemo(() => {
    if (!dDayData?.data) return { percentage: 0, dDay: 0 };

    const todayStr = getTodayDateString();
    const today = parseISO(todayStr);
    const start = parseISO(dDayData.data.recorded_menstrual.start_date);
    const end = parseISO(dDayData.data.PMS);

    const totalDays = differenceInCalendarDays(end, start);
    const currentDay = differenceInCalendarDays(today, start);
    const percent = Math.round((currentDay / totalDays) * 100);

    const predictedStart = parseISO(dDayData.data.predict_menstrual.start_date);
    const dDayValue = differenceInCalendarDays(predictedStart, today);

    console.log("도넛차트 - 퍼센트: ", Math.max(0, Math.min(percent, 100)));
    console.log("도넛차트 - D-day: ", dDayValue);

    return {
      percentage: Math.max(0, Math.min(percent, 100)),
      dDay: dDayValue,
    };
  }, [dDayData]);

  // 월경일 입력 바텀시트 열기
  function handlePeriodOpen() {
    InteractionManager.runAfterInteractions(() => {
      sheetRef.current?.open();
    });
  }

  useFocusEffect(
    useCallback(() => {
      refetchDday();
      refetchHospitalData();
      refetchMedicineData();
    }, [])
  );

  return (
    <>
      <SafeAreaView className="flex-1 relative">
        <HeaderLogo before={false} settings={true} />
        <View className="flex-1 relative mx-5">
          {/* 알림 메시지 */}
          <View className="gap-3">
            {hospitalData?.data?.reservation && (
              <AlertMessage
                type="hospital"
                title="병원 예약이 있어요"
                content={hospitalData.data.reservation as string}
              />
            )}
            {medicineData?.data?.medicine && (
              <AlertMessage
                type="medicine"
                title="복용약 알림이 있어요"
                content={medicineData.data.medicine as string}
              />
            )}
          </View>

          {/* 도넛 차트 */}
          <View className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <DonutChart percentage={percentage} dDay={dDay} />
          </View>
          {/* 버튼 */}
          <View className="w-full absolute bottom-16 -translate-y-1/2">
            <View className="mx-24">
              <CustomButton
                fill={false}
                content="월경일 입력"
                onPress={handlePeriodOpen}
              />
            </View>
          </View>
        </View>
      </SafeAreaView>
      <PeriodBottomSheet height={height} sheetRef={sheetRef} period={6} />
    </>
  );
}

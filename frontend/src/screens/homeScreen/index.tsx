import { useFocusEffect } from "@react-navigation/native";
import { differenceInCalendarDays, parseISO } from "date-fns";
import { useCallback, useMemo, useRef } from "react";
import {
  Image,
  InteractionManager,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
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
  const { percentage, dDay, isValid } = useMemo(() => {
    if (!dDayData?.data) return { percentage: 0, dDay: 0, isValid: false };

    const todayStr = getTodayDateString();
    const today = parseISO(todayStr);
    const start = parseISO(dDayData.data.recorded_menstrual.start_date);
    const end = parseISO(dDayData.data.pms);

    const totalDays = differenceInCalendarDays(end, start);
    const currentDay = differenceInCalendarDays(today, start);
    const percent = Math.round((currentDay / totalDays) * 100);

    const predictedStart = parseISO(
      dDayData.data.predicted_menstrual.start_date
    );
    const dDayValue = differenceInCalendarDays(predictedStart, today);

    console.log("도넛차트 퍼센트: ", Math.max(0, Math.min(percent, 100)));
    console.log("도넛차트 D-day: ", dDayValue);

    return {
      percentage: Math.max(0, Math.min(percent, 100)),
      dDay: dDayValue,
      isValid: true,
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

  if (!dDayData?.data) {
    return (
      <>
        <SafeAreaView className="flex-1 relative">
          <HeaderLogo before={false} settings={true} />
          <View
            className="flex-1 relative mx-5 items-center gap-3"
            style={{ marginVertical: 150 }}
          >
            <Image
              source={require("../..//assets/images/mascot_find.png")}
              style={{ width: 110, height: 120 }}
            />
            <View className="items-center gap-1">
              <Text className="text-neutral-600 text-sm mt-5">
                배나나에 입력된 정보가 없어요.
              </Text>
              <View className="flex-row">
                <Text className="text-violet-700 font-bold text-sm">
                  "월경일 입력"
                </Text>
                <Text className="text-neutral-600 text-sm">
                  을 눌러서 정보를 입력해주세요.
                </Text>
              </View>
            </View>
            <View className="w-full absolute bottom-4 -translate-y-1/2">
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
                title="병원 예약 알림"
                content={hospitalData.data.reservation as string}
              />
            )}
            {medicineData?.data?.medicine && (
              <AlertMessage
                type="medicine"
                title="복용약 알림"
                content={medicineData.data.medicine as string}
              />
            )}
          </View>

          <View className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <DonutChart percentage={percentage} dDay={dDay} />
          </View>
          <View className="w-full absolute bottom-16 -translate-y-1/2">
            <View className="mx-24">
              <CustomButton
                fill={false}
                content="월경일 입력"
                onPress={handlePeriodOpen}
              />
            </View>
          </View>

          {isValid && percentage === 0 && dDay === 0 && (
            <>
              <View
                className="flex-1 items-center gap-3"
                style={{ marginVertical: 150 }}
              >
                <Image
                  source={require("../..//assets/images/mascot_find.png")}
                  style={{ width: 110, height: 120 }}
                />
                <View className="items-center gap-1">
                  <Text className="text-neutral-600 text-sm mt-5">
                    배나나에 입력된 정보가 없어요.
                  </Text>
                  <View className="flex-row">
                    <Text className="text-violet-700 font-bold text-sm">
                      "월경일 입력"
                    </Text>
                    <Text className="text-neutral-600 text-sm">
                      을 눌러서 정보를 입력해주세요.
                    </Text>
                  </View>
                </View>
                <View className="w-full absolute bottom-4 -translate-y-1/2">
                  <View className="mx-24">
                    <CustomButton
                      fill={false}
                      content="월경일 입력"
                      onPress={handlePeriodOpen}
                    />
                  </View>
                </View>
              </View>
            </>
          )}
        </View>
      </SafeAreaView>
      <PeriodBottomSheet height={height} sheetRef={sheetRef} period={6} />
    </>
  );
}

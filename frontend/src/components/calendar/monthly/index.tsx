import { Calendar, LocaleConfig } from "react-native-calendars";
import { View, Text, TouchableOpacity } from "react-native";
import { getDotDates, getPeriodDates } from "../../../utils/markUtils";
import { HospitalReservation } from "../../../types/Hospital";
import { Medicine } from "../../../types/Medicine";
import { ChevronLeft, ChevronRight } from "lucide-react-native";

LocaleConfig.locales["ko"] = {
  monthNames: [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ],
  monthNamesShort: [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ],
  dayNames: [
    "일요일",
    "월요일",
    "화요일",
    "수요일",
    "목요일",
    "금요일",
    "토요일",
  ],
  dayNamesShort: ["일", "월", "화", "수", "목", "금", "토"],
  today: "오늘",
};
LocaleConfig.defaultLocale = "ko";

export function Monthly({
  onDateSelect,
  selectedMonth,
  setSelectedYear,
  setSelectedMonth,
  hospitalReservation,
  medicineReservation,
  predictedPeriod,
  childbearingAge,
}: {
  onDateSelect: (date: string) => void;
  selectedMonth: number;
  setSelectedYear: (year: number) => void;
  setSelectedMonth: (month: number) => void;
  hospitalReservation: HospitalReservation[];
  medicineReservation: Medicine[];
  predictedPeriod: { startDate: string; endDate: string };
  childbearingAge: { startDate: string; endDate: string };
}) {
  const dotsMap = getDotDates(
    hospitalReservation.map((h) => h.reservation_date_time),
    medicineReservation.map((m) => ({
      start_date: m.start_date,
      end_date: m.end_date,
    }))
  );

  const periodMark = getPeriodDates(
    { start: predictedPeriod.startDate, end: predictedPeriod.endDate },
    "#EDE9FE", // 진한 배경 (시작/종료)
    "#7008E7", // 진한 텍스트
    "#F5F3FF", // 연한 배경 (중간)
    "#A684FF" // 연한 텍스트
  );

  const childbearingMark = getPeriodDates(
    { start: childbearingAge.startDate, end: childbearingAge.endDate },
    "#FEF9C3",
    "#262626",
    "#FEFCE8",
    "#525252"
  );

  const markedDates: any = {
    ...periodMark,
    ...childbearingMark,
  };

  Object.keys(dotsMap).forEach((date) => {
    if (!markedDates[date]) markedDates[date] = {};
    markedDates[date].dots = dotsMap[date];
    markedDates[date].marked = true;
  });

  return (
    <View>
      <Calendar
        disableAllTouchEventsForDisabledDays={false}
        markingType="custom"
        markedDates={markedDates}
        onDayPress={(day) => {
          onDateSelect(day.dateString);
        }}
        onMonthChange={(date) => {
          setSelectedYear(date.year);
          setSelectedMonth(date.month);
        }}
        style={{
          borderRadius: 10,
          overflow: "hidden",
          paddingTop: 5,
          paddingBottom: 30,
          paddingHorizontal: 10,
          shadowColor: "#D4D4D4",
        }}
        theme={{
          selectedDayBackgroundColor: "#DDD6FF",
          selectedDayTextColor: "#FFFFFF",
          todayTextColor: "#A684FF",
          arrowColor: "#A684FF",
          dotColor: "#A684FF",
          selectedDotColor: "#FFFFFF",
          monthTextColor: "#A684FF",
          textDayHeaderFontSize: 12,
          textSectionTitleColor: "#525252",
        }}
        renderArrow={(direction) =>
          direction === "left" ? (
            <ChevronLeft color={"#A1A1A1"} size={22} />
          ) : (
            <ChevronRight color={"#A1A1A1"} size={22} />
          )
        }
        renderHeader={(date) => (
          <Text className="p-3 text-violet-400 text-xl font-bold text-center">
            {date.getFullYear()}년 {date.getMonth() + 1}월
          </Text>
        )}
        dayComponent={({ date, state }) => {
          if (!date) return null;

          const dateStr = date.dateString;
          const mark = markedDates[dateStr] || {};
          const customStyles = mark.customStyles ?? {};
          const dayOfWeek = new Date(dateStr).getDay();

          let textColor = "#262626";
          if (state === "disabled" || date.month !== selectedMonth) {
            textColor = "#D4D4D4";
          } else if (dayOfWeek === 0) {
            textColor = "#EC6344";
          } else if (dayOfWeek === 6) {
            textColor = "#4492EC";
          }

          // 기간 텍스트 색상이 있으면 덮어씌움
          if (customStyles.text?.color) {
            textColor = customStyles.text.color;
          }

          return (
            <TouchableOpacity
              onPress={() => onDateSelect(dateStr)}
              style={{
                alignItems: "center",
                justifyContent: "center",
                width: 32,
                height: 32,
                ...customStyles.container,
              }}
            >
              <Text style={{ color: textColor, fontWeight: "normal" }}>
                {date.day}
              </Text>

              {mark.dots?.length > 0 && (
                <View style={{ flexDirection: "row", marginTop: 2 }}>
                  {mark.dots.map((dot, index) => (
                    <View
                      key={index}
                      style={{
                        width: 4,
                        height: 4,
                        borderRadius: 2,
                        backgroundColor: dot.color,
                        marginHorizontal: 1,
                      }}
                    />
                  ))}
                </View>
              )}
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

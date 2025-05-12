import { ChevronLeft, ChevronRight } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";

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
  setSelectedMonth,
}: {
  onDateSelect: (date: string) => void;
  selectedMonth: number;
  setSelectedMonth: (month: number) => void;
}) {
  return (
    <View>
      <Calendar
        onDayPress={(day) => {
          onDateSelect(day.dateString);
        }}
        onMonthChange={(date) => {
          setSelectedMonth(date.month);
        }}
        style={{
          borderRadius: 10,
          overflow: "hidden",
          paddingTop: 5,
          paddingBottom: 30,
          paddingRight: 10,
          paddingLeft: 10,
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
        // 화살표 커스텀
        renderArrow={(direction) =>
          direction === "left" ? (
            <ChevronLeft color={"#A1A1A1"} size={22} />
          ) : (
            <ChevronRight color={"#A1A1A1"} size={22} />
          )
        }
        // 헤더 커스텀 (MM월 yyyy => yyyy년 MM월)
        renderHeader={(date) => {
          const year = date.getFullYear();
          const month = date.getMonth() + 1;
          return (
            <Text className="p-3 text-violet-400 text-xl font-bold text-center">
              {year}년 {month}월
            </Text>
          );
        }}
        // 날짜 색상 커스텀(토 - 파란색, 일 - 빨간색)
        dayComponent={({ date, state }) => {
          if (!date) return null;
          const dayOfWeek = new Date(date.dateString).getDay(); // 0(일) ~ 6(토)

          let textColor = "#262626"; // 기본 텍스트 색상

          // 'disabled'이거나, 다른 달이면 흐리게
          if (state === "disabled" || date.month !== selectedMonth) {
            textColor = "#D4D4D4";
          } else if (dayOfWeek === 0) {
            textColor = "#EC6344"; // 일요일 빨강
          } else if (dayOfWeek === 6) {
            textColor = "#4492EC"; // 토요일 파랑
          }

          return (
            <TouchableOpacity
              onPress={() => onDateSelect(date.dateString)}
              className="items-center justify-center w-8 h-8"
            >
              <Text style={{ color: textColor, fontWeight: "400" }}>
                {date.day}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

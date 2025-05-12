import { eachDayOfInterval, format, isValid, parseISO } from "date-fns";
import { MarkedDates } from "react-native-calendars/src/types";

// 캘린더에 일정을 표시하기 위해 데이터를 변환하는 함수
export function MarkDate(
  inputs: Array<string | { start_date: string; end_date: string }>,
  key: string,
  color: string
): MarkedDates {
  const marked: MarkedDates = {};

  const getDates = (
    input: string | { start_date: string; end_date: string }
  ) => {
    // 단일 날짜인 경우
    if (typeof input === "string") {
      const date = parseISO(input);
      return isValid(date) ? [format(date, "yyyy-MM-dd")] : [];
    } else {
      // 기간인 경우
      const { start_date, end_date } = input;
      const range = eachDayOfInterval({
        start: new Date(start_date),
        end: new Date(end_date),
      });
      return range.map((date) => format(date, "yyyy-MM-dd"));
    }
  };

  inputs.forEach((input) => {
    const dates = getDates(input);
    dates.forEach((dateStr) => {
      const existing = marked[dateStr];
      marked[dateStr] = {
        ...(existing || {}),
        marked: true,
        dots: [...(existing?.dots || []), { key, color }],
      };
    });
  });

  return marked;
}

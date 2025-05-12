import { format, eachDayOfInterval } from "date-fns";
import { MarkedDates } from "react-native-calendars/src/types";

// 캘린더에 기간을 표시하기 위해 데이터를 변환하는 함수
export function MarkPeriod(
  start: string,
  end: string,
  color: string,
  textColor: string,
  defaultColor: string,
  defaultTextColor: string
) {
  const dates = eachDayOfInterval({
    start: new Date(start),
    end: new Date(end),
  });
  const marked: MarkedDates = {};

  dates.forEach((date, idx) => {
    const dateStr = format(date, "yyyy-MM-dd");
    if (idx === 0) {
      marked[dateStr] = {
        startingDay: true,
        color: color,
        textColor: textColor,
      };
    } else if (idx === dates.length - 1) {
      marked[dateStr] = {
        endingDay: true,
        color: color,
        textColor: textColor,
      };
    } else {
      marked[dateStr] = { color: defaultColor, textColor: defaultTextColor };
    }
  });

  return marked;
}

// 기간이 여러 개인 경우 병합하는 함수
export function MergedMark(...periods: MarkedDates[]): MarkedDates {
  return Object.assign({}, ...periods);
}

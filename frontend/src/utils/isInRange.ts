import { isWithinInterval, parseISO } from "date-fns";

// 날짜가 범위 내에 있는지 확인하는 함수("yyyy-MM-DD")
export function IsInRange(
  date: string | null,
  startDate: string | null,
  endDate: string | null
) {
  if (!date || !startDate || !endDate) return false;

  try {
    return isWithinInterval(parseISO(date), {
      start: parseISO(startDate),
      end: parseISO(endDate),
    });
  } catch (error) {
    console.warn("IsInRange 날짜 파싱 오류:", error);
    return false;
  }
}

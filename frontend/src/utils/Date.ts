import { isWithinInterval, parseISO } from "date-fns";

// 오늘 날짜를 문자열("yyyy-MM-dd")로 반환하는 함수
export function getTodayDateString(): string {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// "yyyy-MM-dd" 형태의 문자열을 Date 객체로 변환하는 함수
export function parseDate(dateStr: string): Date {
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day); // month는 0-based
}

// 현재 날짜와 비교하여 "월경 n일차"로 반환하는 함수
export function periodDate(start: string, current: string): string {
  const startDate = parseDate(start);
  const currentDate = parseDate(current);

  const diffTime = currentDate.getTime() - startDate.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  return `월경 ${diffDays + 1}일차`;
}

// "yyyy-MM-dd" 형태의 문자열에서 연도, 월, 일을 숫자로 추출하는 함수
export function parseDateString(date: string) {
  const [year, month, day] = date.split("-");
  return {
    year: Number(year),
    month: Number(month),
    day: Number(day),
  };
}

// "yyyy-MM-dd" 형태의 문자열을 "yyyy.MM.dd (Day of Week)" 형태로 변환하는 함수
export function formatFullDate(dateString: string | null) {
  if (!dateString) return "";

  const days = ["일", "월", "화", "수", "목", "금", "토"];
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  const dayOfWeek = days[date.getDay()];

  return `${year}.${month}.${day} (${dayOfWeek})`;
}

// KST로 변경하는 함수
export function formatDateKST(date: Date): string {
  return date
    .toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .replace(/\. /g, "-")
    .replace(/\.$/, "");
}

// 날짜가 범위 내에 있는지 확인하는 함수
export function isInRange(
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
    console.warn("isInRange 날짜 파싱 오류:", error);
    return false;
  }
}

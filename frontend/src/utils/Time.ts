import { formatDistance } from "date-fns";
import { ko } from "date-fns/locale";

// 현재 시간과 비교하여 "n분 전" 형태로 변환하는 함수
export function formatTime(time: string) {
  const [datePart, timePart] = time.split(" ");
  const [year, month, day] = datePart.split("-").map(Number);
  const [hour, minute, second] = timePart.split(":").map(Number);

  const utcTime = Date.UTC(year, month - 1, day, hour - 9, minute, second);
  const givenTime = new Date(utcTime);

  const now = new Date();
  const isFuture = givenTime > now;

  const formatted = formatDistance(
    isFuture ? now : givenTime,
    isFuture ? givenTime : now,
    {
      addSuffix: true,
      locale: ko,
    }
  );

  if (formatted.includes("1분 미만")) {
    return "방금 전";
  }

  return formatted;
}

// date와 time을 합쳐 "yyyy-MM-ddTHH:mm" 형태로 변환하는 함수
export function formatDateTimeKST(date: Date, time: Date): string {
  const localDateTime = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    time.getHours(),
    time.getMinutes()
  );

  const formatted = localDateTime.toLocaleString("sv-SE", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

  return formatted.replace(" ", "T").slice(0, 16);
}

// "HH:mm" 형태의 문자열에서 시, 분을 숫자로 추출하는 함수
export function parseTime(time: string) {
  const [hour, minute] = time.split(":").map(Number);
  return { hour, minute };
}

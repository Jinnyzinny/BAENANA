import { formatDistance } from "date-fns";
import { ko } from "date-fns/locale";

function parseKoreanTime(time: string): Date {
  const [datePart, timePart] = time.split(" ");
  const [year, month, day] = datePart.split("-").map(Number);
  const [hour, minute, second] = timePart.split(":").map(Number);

  // 한국 시간 = UTC 기준 - 9시간
  const utcTime = Date.UTC(year, month - 1, day, hour - 9, minute, second);
  return new Date(utcTime);
}

export function FormatTime(time: string) {
  const now = new Date();
  const givenTime = parseKoreanTime(time);

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

export function FormatDateTimeKST(date: Date, time: Date): string {
  const localDateTime = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    time.getHours(),
    time.getMinutes()
  );
  const kstDateTime = new Date(localDateTime.getTime() + 9 * 60 * 60 * 1000);

  return kstDateTime.toISOString().slice(0, 16);
}

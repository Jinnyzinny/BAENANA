import { formatDistance } from "date-fns";
import { ko } from "date-fns/locale";

export function FormatTime(time: string) {
  const now = new Date();
  const givenTime = new Date(time);

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

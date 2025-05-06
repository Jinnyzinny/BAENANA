import { parseDate } from "./parseDate";

export function PeriodDate(start: string, current: string): string {
  const startDate = parseDate(start);
  const currentDate = parseDate(current);

  const diffTime = currentDate.getTime() - startDate.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  return `월경 ${diffDays + 1}일차`;
}

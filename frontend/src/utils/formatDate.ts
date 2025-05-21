export function FormatDate(dateString: string | null) {
  if (!dateString) return "";

  const days = ["일", "월", "화", "수", "목", "금", "토"];
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  const dayOfWeek = days[date.getDay()];

  return `${year}.${month}.${day} (${dayOfWeek})`;
}

export function FormatDateKST(date: Date): string {
  const localDate = new Date(date.getTime() + 9 * 60 * 60 * 1000);
  return localDate.toISOString().slice(0, 10);
}

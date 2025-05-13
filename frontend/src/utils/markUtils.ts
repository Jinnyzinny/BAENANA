import { eachDayOfInterval, format, parseISO } from "date-fns";

export function getDotDates(
  hospitalDates: string[],
  medicineRanges: { start_date: string; end_date: string }[]
) {
  const dotsMap: Record<string, { color: string; key: string }[]> = {};

  hospitalDates.forEach((dateStr) => {
    const date = format(parseISO(dateStr), "yyyy-MM-dd");
    if (!dotsMap[date]) dotsMap[date] = [];
    dotsMap[date].push({ key: "hospital", color: "#A684FF" });
  });

  medicineRanges.forEach(({ start_date, end_date }) => {
    const dates = eachDayOfInterval({
      start: new Date(start_date),
      end: new Date(end_date),
    });
    dates.forEach((d) => {
      const date = format(d, "yyyy-MM-dd");
      if (!dotsMap[date]) dotsMap[date] = [];
      dotsMap[date].push({ key: "medicine", color: "#FFB300" });
    });
  });

  return dotsMap;
}

export function getPeriodDates(
  period: { start: string; end: string },
  strongColor: string,
  strongTextColor: string,
  weakColor: string,
  weakTextColor: string
) {
  const map: Record<
    string,
    {
      customStyles: {
        container: {
          backgroundColor: string;
          borderRadius: number;
        };
        text: {
          color: string;
        };
      };
    }
  > = {};

  if (!period.start || !period.end) return map;

  const start = new Date(period.start);
  const end = new Date(period.end);
  if (start > end) return map;

  const range = eachDayOfInterval({ start, end });

  range.forEach((date, index) => {
    const dateStr = format(date, "yyyy-MM-dd");
    const isStartOrEnd = index === 0 || index === range.length - 1;

    map[dateStr] = {
      customStyles: {
        container: {
          backgroundColor: isStartOrEnd ? strongColor : weakColor,
          borderRadius: 999,
        },
        text: {
          color: isStartOrEnd ? strongTextColor : weakTextColor,
        },
      },
    };
  });

  return map;
}

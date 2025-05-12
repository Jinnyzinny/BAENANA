import { MarkedDates } from "react-native-calendars/src/types";

export function MergeMark(
  periodMark: MarkedDates,
  dotMark: MarkedDates
): MarkedDates {
  const merged: MarkedDates = { ...periodMark };

  Object.entries(dotMark).forEach(([date, dotInfo]) => {
    if (!merged[date]) {
      merged[date] = dotInfo;
    } else {
      merged[date] = {
        ...merged[date],
        ...dotInfo,
        dots: [...(merged[date].dots || []), ...(dotInfo.dots || [])],
      };
    }
  });

  return merged;
}

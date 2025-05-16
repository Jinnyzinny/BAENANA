import { useQuery } from "@tanstack/react-query";
import { getDaily } from "../daily";

// ✅일일 정보 조회
export function useGetDaily(
  year: number | null,
  month: number | null,
  day: number | null,
  enabled: boolean = true
) {
  return useQuery({
    queryKey: ["daily", year, month, day],
    queryFn: () => {
      if (year === null || month === null || day === null) return;
      return getDaily(year, month, day);
    },
    enabled: enabled && year !== null && month !== null && day !== null,
  });
}

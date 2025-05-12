import { useQuery } from "@tanstack/react-query";
import { getDaily } from "../daily";

// 일일 정보 조회
export function useGetDaily(year: number, month: number, day: number) {
  return useQuery({
    queryKey: ["daily", year, month, day],
    queryFn: () => getDaily(year, month, day),
  });
}

import { useQuery } from "@tanstack/react-query";
import {
  getCategory,
  getCategoryHealthInfo,
  getHealthInfoDetail,
} from "../healthInfo";

// 카테고리 목록 조회
export function useGetCategory() {
  return useQuery({
    queryKey: ["Category"],
    queryFn: () => getCategory(),
  });
}

// 카테고리별 건강 정보 조회
export function useGetCategoryHealthInfo(categoryId: number) {
  return useQuery({
    queryKey: ["healthInfoCategory", categoryId],
    queryFn: () => getCategoryHealthInfo(categoryId),
  });
}

// 건강 정보 상세 조회
export function useGetHealthInfoDetail(id: number) {
  return useQuery({
    queryKey: ["healthInfoDetail", id],
    queryFn: () => getHealthInfoDetail(id),
  });
}

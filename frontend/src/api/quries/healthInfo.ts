import { useQuery } from "@tanstack/react-query";
import {
  getCategory,
  getCategoryHealthInfo,
  getHealthInfoDetail,
} from "../healthInfo";

// [GET] 카테고리 목록 조회
export function useGetCategory() {
  return useQuery({
    queryKey: ["category"],
    queryFn: () => getCategory(),
  });
}

// [GET] 카테고리별 건강 정보 조회
export function useGetCategoryHealthInfo(categoryId: number) {
  return useQuery({
    queryKey: ["healthInfoCategory", categoryId],
    queryFn: () => getCategoryHealthInfo(categoryId),
  });
}

// [GET] 건강 정보 상세 조회
export function useGetHealthInfoDetail(id: number | null) {
  return useQuery({
    queryKey: ["healthInfoDetail", id],
    queryFn: async () => {
      if (id === null) {
        console.log("건강 정보 id: null");
        return null;
      }
      return getHealthInfoDetail(id);
    },
    enabled: id !== null,
  });
}

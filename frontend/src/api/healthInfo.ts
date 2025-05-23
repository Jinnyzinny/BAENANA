import { Category, HealthInfo } from "../types/HealthInfo";
import authClient from "./client/authClient";

// 카테고리 목록 조회
export async function getCategory(): Promise<Category[]> {
  try {
    const response = await authClient.get("/health-info/categories");
    console.log("카테고리 목록 조회 성공: ", response.data.data);
    return response.data.data;
  } catch (error: unknown) {
    console.error("카테고리 목록 조회 실패: ", error);
    return null;
  }
}

// 카테고리별 건강 정보 조회
export async function getCategoryHealthInfo(
  categoryId: number
): Promise<HealthInfo[]> {
  try {
    // 카테고리별 건강 정보 조회 개수: 20개
    const response = await authClient.get(
      `/health-info/category/${categoryId}?size=20`
    );
    console.log("카테고리별 건강 정보 조회 성공: ", response.data.data);
    return response.data.data.content;
  } catch (error: unknown) {
    console.error("카테고리별 건강 정보 조회 실패: ", error);
    return null;
  }
}

// 건강 정보 상세 조회
export async function getHealthInfoDetail(id: number): Promise<HealthInfo> {
  try {
    const response = await authClient.get(`/health-info/${id}`);
    console.log("건강 정보 상세 조회 성공: ", response.data.data);
    return response.data.data;
  } catch (error: unknown) {
    console.error("건강 정보 상세 조회 실패: ", error);
    return null;
  }
}

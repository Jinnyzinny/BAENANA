import { client } from "./client";

// 카테고리 목록 조회
export async function getCategories() {
  try {
    const response = await client.get("/health-info/categories");
    console.log("카테고리 목록 조회 성공: ", response.data);
    return response.data;
  } catch (error: unknown) {
    console.error("카테고리 목록 조회 실패: ", error);
  }
}

// 건강 정보 전체 조회
export async function getAllHealthInfo() {
  try {
    const response = await client.get("/health-info");
    console.log("건강 정보 전체 조회 성공: ", response.data);
    return response.data;
  } catch (error: unknown) {
    console.error("건강 정보 전체 조회 실패: ", error);
  }
}

// 카테고리별 건강 정보 조회
export async function getCategoryHealthInfo(categoryId: number) {
  try {
    const response = await client.get(`/health-info/category/${categoryId}`);
    console.log("카테고리별 건강 정보 조회 성공: ", response.data);
    return response.data;
  } catch (error: unknown) {
    console.error("카테고리별 건강 정보 조회 실패: ", error);
  }
}

// 건강 정보 상세 조회
export async function getHealthInfoDetail(id: number) {
  try {
    const response = await client.get(`/health-info/${id}`);
    console.log("건강 정보 상세 조회 성공: ", response.data);
    return response.data;
  } catch (error: unknown) {
    console.error("건강 정보 상세 조회 실패: ", error);
  }
}

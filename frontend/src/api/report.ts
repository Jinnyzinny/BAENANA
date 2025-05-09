import {
  Ovulation,
  PeriodAlert,
  RecentMedicine,
  RecentPeriod,
  RecentPeriodInfo,
  Report,
} from "../types/Report";
import authClient from "./client/authClient";

// 월경 알림 메시지 조회
export async function getPeriodAlert(): Promise<PeriodAlert> {
  try {
    const response = await authClient.get("/report/alarm");
    console.log("월경 알림 메시지 조회 성공: ", response.data.data);
    return response.data.data;
  } catch (error: unknown) {
    console.error("월경 알림 메시지 조회 실패: ", error);
    throw error;
  }
}

// 월경 정보(주기 & 기간) 조회
export async function getPeriodInfo(): Promise<RecentPeriodInfo> {
  try {
    const response = await authClient.get("/report/menstrual/info");
    console.log("월경 정보(주기 & 기간) 조회 성공: ", response.data.data);
    return response.data.data;
  } catch (error: unknown) {
    console.error("월경 정보(주기 & 기간) 조회 실패: ", error);
    throw error;
  }
}

// 배란테스트 결과 조희
export async function getOvulationTest(): Promise<Ovulation> {
  try {
    const response = await authClient.get("/report/menstrual/ovulation_test");
    console.log("배란테스트 결과 조회 성공: ", response.data.data);
    return response.data.data;
  } catch (error: unknown) {
    console.error("배란테스트 결과 조회 실패: ", error);
    throw error;
  }
}

// 최근 6개월 간 월경 주기 조희
export async function getRecentPeriod(): Promise<RecentPeriod> {
  try {
    const response = await authClient.get("/report/menstrual/recent");
    console.log("최근 6개월 간 월경 주기 조회 성공: ", response.data.data);
    return response.data.data;
  } catch (error: unknown) {
    console.error("최근 6개월 간 월경 주기 조회 실패: ", error);
    throw error;
  }
}

// 전체 월경 주기 조회
export async function getPeriodList(): Promise<RecentPeriod> {
  try {
    const response = await authClient.get("/report/menstrual/all");
    console.log("전체 월경 주기 조회 성공: ", response.data.data);
    return response.data.data;
  } catch (error: unknown) {
    console.error("전체 월경 주기 조회 실패: ", error);
    throw error;
  }
}

// 최근 3개월 간 복용약 조회
export async function getRecentMedicine(): Promise<RecentMedicine> {
  try {
    const response = await authClient.get("/report/medication/recent");
    console.log("최근 3개월 간 복용약 조회 성공: ", response.data.data);
    return response.data.data;
  } catch (error: unknown) {
    console.error("최근 3개월 간 복용약 조회 실패: ", error);
    throw error;
  }
}

// 전체 복용약 조회
export async function getMedicineList(): Promise<RecentMedicine> {
  try {
    const response = await authClient.get("/report/medication/all");
    console.log("전체 복용약 조회 성공: ", response.data.data);
    return response.data.data;
  } catch (error: unknown) {
    console.error("전체 복용약 조회 실패: ", error);
    throw error;
  }
}

// 요약 리포트 조회
export async function getReport(): Promise<Report> {
  try {
    const response = await authClient.get("/report/summary");
    console.log("요약 리포트 조회 성공: ", response.data.data);
    return response.data.data;
  } catch (error: unknown) {
    console.error("요약 리포트 조회 실패: ", error);
    throw error;
  }
}

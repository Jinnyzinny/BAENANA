import {
  AllRecentMEdicine,
  FullOvulation,
  FullPeriodAlert,
  FullRecentMedicine,
  FullRecentPeriod,
  FullRecentPeriodInfo,
  FullReport,
} from "../types/Report";
import authClient from "./client/authClient";

// [GET] 월경 알림 메시지 조회
export async function getPeriodAlert(): Promise<FullPeriodAlert | null> {
  try {
    const response = await authClient.get("/report/alarm");
    console.log("월경 알림 메시지 조회 성공: ", response.data);
    return response.data;
  } catch (error: unknown) {
    console.error("월경 알림 메시지 조회 실패: ", error);
    return null;
  }
}

// [GET] 월경 정보(주기 & 기간) 조회
export async function getPeriodInfo(): Promise<FullRecentPeriodInfo | null> {
  try {
    const response = await authClient.get("/report/menstrual/info");
    console.log("월경 정보(주기 & 기간) 조회 성공: ", response.data);
    return response.data;
  } catch (error: unknown) {
    console.error("월경 정보(주기 & 기간) 조회 실패: ", error);
    return null;
  }
}

// [GET] 배란테스트 결과 조회
export async function getOvulationTest(): Promise<FullOvulation | null> {
  try {
    const response = await authClient.get("/report/menstrual/ovulation_test");
    console.log("배란테스트 결과 조회 성공: ", response.data);
    return response.data;
  } catch (error: unknown) {
    console.error("배란테스트 결과 조회 실패: ", error);
    return null;
  }
}

// [GET] 최근 6개월 간 월경 주기 조회
export async function getRecentPeriod(): Promise<FullRecentPeriod | null> {
  try {
    const response = await authClient.get("/report/menstrual/recent");
    console.log("최근 6개월 간 월경 주기 조회 성공: ", response.data);
    return response.data;
  } catch (error: unknown) {
    console.error("최근 6개월 간 월경 주기 조회 실패: ", error);
    return null;
  }
}

// [GET] 전체 월경 주기 조회
export async function getPeriodList(): Promise<FullRecentPeriod | null> {
  try {
    const response = await authClient.get("/report/menstrual/all");
    console.log("전체 월경 주기 조회 성공: ", response.data);
    return response.data;
  } catch (error: unknown) {
    console.error("전체 월경 주기 조회 실패: ", error);
    return null;
  }
}

// [GET] 최근 3개월 간 복용약 조회
export async function getRecentMedicine(): Promise<FullRecentMedicine | null> {
  try {
    const response = await authClient.get("/report/medication/recent");
    console.log("최근 3개월 간 복용약 조회 성공: ", response.data);
    return response.data;
  } catch (error: unknown) {
    console.error("최근 3개월 간 복용약 조회 실패: ", error);
    return null;
  }
}

// [GET] 전체 복용약 조회
export async function getMedicineList(): Promise<AllRecentMEdicine | null> {
  try {
    const response = await authClient.get("/report/medication/all");
    console.log("전체 복용약 조회 성공: ", response.data);
    return response.data;
  } catch (error: unknown) {
    console.error("전체 복용약 조회 실패: ", error);
    return null;
  }
}

// [GET] 요약 리포트 조회
export async function getReport(): Promise<FullReport | null> {
  try {
    const response = await authClient.get("/report/summary");
    console.log("요약 리포트 조회 성공: ", response.data);
    return response.data;
  } catch (error: unknown) {
    console.error("요약 리포트 조회 실패: ", error);
    return null;
  }
}

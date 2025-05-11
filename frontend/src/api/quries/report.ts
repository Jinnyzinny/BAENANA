import { useQuery } from "@tanstack/react-query";
import {
  getMedicineList,
  getOvulationTest,
  getPeriodAlert,
  getPeriodInfo,
  getPeriodList,
  getRecentMedicine,
  getRecentPeriod,
  getReport,
} from "../report";

// 월경 알림 메시지 조회
export function useGetPeriodAlert() {
  return useQuery({
    queryKey: ["periodAlert"],
    queryFn: () => getPeriodAlert(),
  });
}

// 월경 정보(주기 & 기간) 조회
export function useGetPeriodInfo() {
  return useQuery({
    queryKey: ["periodInfo"],
    queryFn: () => getPeriodInfo(),
  });
}

// 배란테스트 결과 조희
export function useGetOvulationTest() {
  return useQuery({
    queryKey: ["ovulationTest"],
    queryFn: () => getOvulationTest(),
  });
}

// 최근 6개월 간 월경 주기 조희
export function useGetRecentPeriod() {
  return useQuery({
    queryKey: ["recentPeriod"],
    queryFn: () => getRecentPeriod(),
  });
}

// 전체 월경 주기 조회
export function useGetPeriodList() {
  return useQuery({
    queryKey: ["periodList"],
    queryFn: () => getPeriodList(),
  });
}

// 최근 3개월 간 복용약 조회
export function useGetRecentMedicine() {
  return useQuery({
    queryKey: ["recentMedicine"],
    queryFn: () => getRecentMedicine(),
  });
}

// 전체 복용약 조회
export function useGetMedicineList() {
  return useQuery({
    queryKey: ["medicineList"],
    queryFn: () => getMedicineList(),
  });
}

// 요약 리포트 조회
export function useGetReport() {
  return useQuery({
    queryKey: ["report"],
    queryFn: () => getReport(),
  });
}

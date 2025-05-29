import { useQuery } from "@tanstack/react-query";
import {
  addOvulationTest,
  getMedicineList,
  getOvulationTest,
  getPeriodAlert,
  getPeriodInfo,
  getPeriodList,
  getRecentMedicine,
  getRecentPeriod,
  getReport,
} from "../report";
import { useApiMutation } from "../../hooks/useApiMutation";

// [GET] 월경 알림 메시지 조회
export function useGetPeriodAlert() {
  return useQuery({
    queryKey: ["periodAlert"],
    queryFn: () => getPeriodAlert(),
  });
}

// [GET] 월경 정보(주기 & 기간) 조회
export function useGetPeriodInfo() {
  return useQuery({
    queryKey: ["periodInfo"],
    queryFn: () => getPeriodInfo(),
  });
}

// [GET] 배란테스트 결과 조회
export function useGetOvulationTest() {
  return useQuery({
    queryKey: ["ovulationTest"],
    queryFn: () => getOvulationTest(),
  });
}

// [POST] 배란테스트 결과 입력
export function useAddOvulationTest() {
  return useApiMutation({
    mutationFn: ({ date, value }: { date: string; value: number }) =>
      addOvulationTest(date, value),
    keysToInvalidate: [["ovulationTest"]],
    successMessage: "배란테스트 결과가 성공적으로 등록되었습니다.",
    errorMessage: "배란테스트 결과 등록 실패",
  });
}

// [GET] 최근 6개월 간 월경 주기 조회
export function useGetRecentPeriod() {
  return useQuery({
    queryKey: ["recentPeriod"],
    queryFn: () => getRecentPeriod(),
  });
}

// [GET] 전체 월경 주기 조회
export function useGetPeriodList() {
  return useQuery({
    queryKey: ["periodList"],
    queryFn: () => getPeriodList(),
  });
}

// [GET] 최근 3개월 간 복용약 조회
export function useGetRecentMedicine() {
  return useQuery({
    queryKey: ["recentMedicine"],
    queryFn: () => getRecentMedicine(),
  });
}

// [GET] 전체 복용약 조회
export function useGetMedicineList() {
  return useQuery({
    queryKey: ["medicineList"],
    queryFn: () => getMedicineList(),
  });
}

// [GET] 요약 리포트 조회
export function useGetReport() {
  return useQuery({
    queryKey: ["report"],
    queryFn: () => getReport(),
  });
}

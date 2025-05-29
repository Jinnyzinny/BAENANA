import { useQuery } from "@tanstack/react-query";
import { useApiMutation } from "../../hooks/useApiMutation";
import {
  addPeriod,
  addPeriodSymptom,
  deletePeriod,
  deletePeriodSymptom,
  editPeriod,
  editPeriodSymptom,
  getChildbearingAge,
  getDday,
  getPeriod,
  getPredictedPeriod,
} from "../period";

// [GET] 월경 예정일 D-day 조회
export function useGetDday() {
  return useQuery({
    queryKey: ["dDay"],
    queryFn: () => getDday(),
  });
}

// [GET] 월별 월경 주기 조회
export function useGetPeriod(year: number, month: number) {
  return useQuery({
    queryKey: ["period", year, month],
    queryFn: () => getPeriod(year, month),
  });
}

// [GET] 가임기 조회
export function useGetChildbearingAge() {
  return useQuery({
    queryKey: ["childbearingAge"],
    queryFn: () => getChildbearingAge(),
  });
}

// [GET] 월경 예정일 조회
export function useGetPredictedPeriod() {
  return useQuery({
    queryKey: ["predictedPeriod"],
    queryFn: () => getPredictedPeriod(),
  });
}

// [POST] 월경 주기 등록
export function useAddPeriod() {
  return useApiMutation({
    mutationFn: ({
      startDate,
      endDate,
    }: {
      startDate: string;
      endDate: string;
    }) => addPeriod(startDate, endDate),
    keysToInvalidate: [
      ["dDay"],
      ["period"],
      ["childbearingAge"],
      ["predictedPeriod"],
      ["daily"],
    ],
    successMessage: "월경 주기가 성공적으로 등록되었습니다.",
    errorMessage: "월경 주기 등록 실패",
  });
}

// [PATCH] 월경 주기 변경
export function useEditPeriod() {
  return useApiMutation({
    mutationFn: ({
      id,
      cycleId,
      startDate,
      endDate,
    }: {
      id: number;
      cycleId: number;
      startDate?: string;
      endDate?: string;
    }) => editPeriod(id, cycleId, startDate, endDate),
    keysToInvalidate: [
      ["dDay"],
      ["period"],
      ["childbearingAge"],
      ["predictedPeriod"],
      ["daily"],
    ],
    successMessage: "월경 주기가 성공적으로 변경되었습니다.",
    errorMessage: "월경 주기 변경 실패",
  });
}

// [DELETE] 월경 주기 삭제
export function useDeletePeriod() {
  return useApiMutation({
    mutationFn: (cycleId: number) => deletePeriod(cycleId),
    keysToInvalidate: [
      ["dDay"],
      ["period"],
      ["childbearingAge"],
      ["predictedPeriod"],
      ["daily"],
    ],
    successMessage: "월경 주기가 성공적으로 삭제되었습니다.",
    errorMessage: "월경 주기 삭제 실패",
  });
}

// [POST] 월경 세부 정보 등록
export function useAddPeriodSymptom() {
  return useApiMutation({
    mutationFn: ({
      date,
      bleedingLevel,
      painLevel,
      symptom,
    }: {
      date: string;
      bleedingLevel: number;
      painLevel: number;
      symptom: string[];
    }) => addPeriodSymptom(date, bleedingLevel, painLevel, symptom),
    keysToInvalidate: [["period"]],
    successMessage: "월경 세부 정보가 성공적으로 등록되었습니다.",
    errorMessage: "월경 세부 정보 등록 실패",
  });
}

// [PATCH] 월경 세부 정보 변경
export function useEditPeriodSymptom() {
  return useApiMutation({
    mutationFn: ({
      cycleId,
      date,
      bleedingLevel,
      painLevel,
      symptom,
    }: {
      cycleId: number;
      date: string;
      bleedingLevel?: number;
      painLevel?: number;
      symptom?: string[];
    }) => editPeriodSymptom(cycleId, date, bleedingLevel, painLevel, symptom),
    keysToInvalidate: [["period"], ["daily"]],
    successMessage: "월경 세부 정보가 성공적으로 변경되었습니다.",
    errorMessage: "월경 세부 정보 변경 실패",
  });
}

// [DELETE] 월경 세부 정보 삭제
export function useDeletePeriodSymptom() {
  return useApiMutation({
    mutationFn: (cycleId: number) => deletePeriodSymptom(cycleId),
    keysToInvalidate: [["period"], ["daily"]],
    successMessage: "월경 세부 정보가 성공적으로 삭제되었습니다.",
    errorMessage: "월경 세부 정보 삭제 실패",
  });
}

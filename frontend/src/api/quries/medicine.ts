import { useQuery } from "@tanstack/react-query";
import { useApiMutation } from "../../hooks/useApiMutation";
import {
  addMedicineReservation,
  deleteMedicineReservation,
  editMedicineReservation,
  getMedicineAlert,
  getMedicineReservation,
} from "../medicine";

// [GET] 복용약 알림 메시지 조회
export function useGetMedicineAlert() {
  return useQuery({
    queryKey: ["medicineAlert"],
    queryFn: () => getMedicineAlert(),
  });
}

// [GET] 월별 복용약 일정 조회
export function useGetMedicineReservation(year: number, month: number) {
  return useQuery({
    queryKey: ["medicineReservation", year, month],
    queryFn: () => getMedicineReservation(year, month),
  });
}

// [POST] 복용약 일정 등록
export function useAddMedicineReservation() {
  return useApiMutation({
    mutationFn: ({
      medicineName,
      startDate,
      endDate,
      timeTaken,
      memo,
    }: {
      medicineName: string;
      startDate: string;
      endDate: string;
      timeTaken: string[];
      memo: string;
    }) =>
      addMedicineReservation(medicineName, startDate, endDate, timeTaken, memo),
    keysToInvalidate: [["daily"], ["medicineAlert"], ["medicineReservation"]],
    successMessage: "복용약 일정이 성공적으로 등록되었습니다.",
    errorMessage: "복용약 일정 등록 실패",
  });
}

// [PATCH] 복용약 일정 변경
export function useEditMedicineReservation() {
  return useApiMutation({
    mutationFn: ({
      id,
      medicineName,
      startDate,
      endDate,
      timeTaken,
      memo,
    }: {
      id: number;
      medicineName?: string;
      startDate?: string;
      endDate?: string;
      timeTaken?: string[];
      memo?: string;
    }) =>
      editMedicineReservation(
        id,
        medicineName,
        startDate,
        endDate,
        timeTaken,
        memo
      ),
    keysToInvalidate: [["daily"], ["medicineAlert"], ["medicineReservation"]],
    successMessage: "복용약 일정이 성공적으로 변경되었습니다.",
    errorMessage: "복용약 일정 변경 실패",
  });
}

// [DELETE] 복용약 일정 삭제
export function useDeleteMedicineReservation() {
  return useApiMutation({
    mutationFn: (id: number) => deleteMedicineReservation(id),
    keysToInvalidate: [["daily"], ["medicineAlert"], ["medicineReservation"]],
    successMessage: "복용약 일정이 성공적으로 삭제되었습니다.",
    errorMessage: "복용약 일정 삭제 실패",
  });
}

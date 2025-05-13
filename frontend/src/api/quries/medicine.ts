import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Alert } from "react-native";
import {
  addMedicineReservation,
  deleteMedicineReservation,
  editMedicineReservation,
  getMedicineAlert,
  getMedicineReservation,
} from "../medicine";

// ✅복용약 알림 메시지 조회
export function useGetMedicineAlert() {
  return useQuery({
    queryKey: ["medicineAlert"],
    queryFn: () => getMedicineAlert(),
  });
}

// 복용약 일정 등록
export function useAddMedicineReservation() {
  const queryClient = useQueryClient();

  return useMutation({
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
    onSuccess: (data) => {
      console.log("☑️복용약 일정 등록 성공: ", data);
      queryClient.invalidateQueries({ queryKey: ["medicineReservation"] });
    },
    onError: (error) => {
      console.log("✖️복용약 일정 등록 실패: ", error);
      Alert.alert("복용약 일정 등록 실패", "잠시 후 다시 시도해주세요.");
    },
  });
}

// ✅월별 복용약 일정 조회
export function useGetMedicineReservation(year: number, month: number) {
  return useQuery({
    queryKey: ["medicineReservation", year, month],
    queryFn: () => getMedicineReservation(year, month),
  });
}

// 복용약 일정 변경
export function useEditMedicineReservation() {
  const queryClient = useQueryClient();

  return useMutation({
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
    onSuccess: (data) => {
      console.log("☑️복용약 일정 변경 성공: ", data);
      queryClient.invalidateQueries({ queryKey: ["medicineReservation"] });
    },
    onError: (error) => {
      console.log("✖️복용약 일정 변경 실패: ", error);
      Alert.alert("복용약 일정 변경 실패", "잠시 후 다시 시도해주세요.");
    },
  });
}

// 복용약 일정 삭제
export function useDeleteMedicineReservation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteMedicineReservation(id),
    onSuccess: () => {
      console.log("☑️복용약 일정 삭제 성공");
      queryClient.invalidateQueries({ queryKey: ["medicineReservation"] });
    },
    onError: (error) => {
      console.log("✖️복용약 일정 삭제 실패: ", error);
      Alert.alert("복용약 일정 삭제 실패", "잠시 후 다시 시도해주세요.");
    },
  });
}

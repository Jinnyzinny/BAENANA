import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Alert, ToastAndroid } from "react-native";
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
      ToastAndroid.showWithGravity(
        "복용약 일정이 성공적으로 등록되었습니다.",
        ToastAndroid.SHORT,
        ToastAndroid.TOP
      );
      queryClient.invalidateQueries({ queryKey: ["daily"], exact: false });
      queryClient.invalidateQueries({ queryKey: ["medicineAlert"] });
      queryClient.invalidateQueries({
        queryKey: ["medicineReservation"],
        exact: false,
      });
    },
    onError: (error) => {
      console.log("✖️복용약 일정 등록 실패: ", error);
      Alert.alert("복용약 일정 등록 실패", "잠시 후 다시 시도해주세요.");
    },
  });
}

// [PATCH] 복용약 일정 변경
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
      ToastAndroid.showWithGravity(
        "복용약 일정이 성공적으로 변경되었습니다.",
        ToastAndroid.SHORT,
        ToastAndroid.TOP
      );
      queryClient.invalidateQueries({ queryKey: ["daily"], exact: false });
      queryClient.invalidateQueries({ queryKey: ["medicineAlert"] });
      queryClient.invalidateQueries({
        queryKey: ["medicineReservation"],
        exact: false,
      });
    },
    onError: (error) => {
      console.log("✖️복용약 일정 변경 실패: ", error);
      Alert.alert("복용약 일정 변경 실패", "잠시 후 다시 시도해주세요.");
    },
  });
}

// [DELETE] 복용약 일정 삭제
export function useDeleteMedicineReservation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteMedicineReservation(id),
    onSuccess: () => {
      console.log("☑️복용약 일정 삭제 성공");
      ToastAndroid.showWithGravity(
        "복용약 일정이 성공적으로 삭제되었습니다.",
        ToastAndroid.SHORT,
        ToastAndroid.TOP
      );
      queryClient.invalidateQueries({ queryKey: ["daily"], exact: false });
      queryClient.invalidateQueries({ queryKey: ["medicineAlert"] });
      queryClient.invalidateQueries({
        queryKey: ["medicineReservation"],
        exact: false,
      });
    },
    onError: (error) => {
      console.log("✖️복용약 일정 삭제 실패: ", error);
      Alert.alert("복용약 일정 삭제 실패", "잠시 후 다시 시도해주세요.");
    },
  });
}

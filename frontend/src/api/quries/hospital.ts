import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Alert, ToastAndroid } from "react-native";
import {
  addHospitalReservation,
  deleteHospitalReservation,
  editHospitalReservation,
  getHospitalAlert,
  getHospitalReservation,
} from "../hospital";

// [GET] 병원 예약 알림 메시지 조회
export function useGetHospitalAlert() {
  return useQuery({
    queryKey: ["hospitalAlert"],
    queryFn: () => getHospitalAlert(),
  });
}

// [GET] 월별 병원 예약 일정 조회
export function useGetHospitalReservation(year: number, month: number) {
  return useQuery({
    queryKey: ["hospitalReservation", year, month],
    queryFn: () => getHospitalReservation(year, month),
  });
}

// [POST] 병원 예약 일정 등록
export function useAddHospitalReservation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      hospitalName,
      reservationDate,
      purpose,
    }: {
      hospitalName: string;
      reservationDate: string;
      purpose: string;
    }) => addHospitalReservation(hospitalName, reservationDate, purpose),
    onSuccess: (data) => {
      console.log("☑️병원 예약 일정 등록 성공: ", data);
      ToastAndroid.showWithGravity(
        "병원 예약 일정이 성공적으로 등록되었습니다.",
        ToastAndroid.SHORT,
        ToastAndroid.TOP
      );
      queryClient.invalidateQueries({
        queryKey: ["hospitalReservation"],
        exact: false,
      });
      queryClient.invalidateQueries({ queryKey: ["daily"], exact: false });
      queryClient.invalidateQueries({ queryKey: ["hospitalAlert"] });
    },
    onError: (error) => {
      console.log("✖️병원 예약 일정 등록 실패: ", error);
      Alert.alert("병원 예약 일정 등록 실패", "잠시 후 다시 시도해주세요.");
    },
  });
}

// [PATCH] 병원 예약 일정 변경
export function useEditHospitalReservation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      hospitalName,
      reservationDate,
      purpose,
    }: {
      id: number;
      hospitalName?: string;
      reservationDate?: string;
      purpose?: string;
    }) => editHospitalReservation(id, hospitalName, reservationDate, purpose),
    onSuccess: (data) => {
      console.log("☑️병원 예약 일정 변경 성공: ", data);
      ToastAndroid.showWithGravity(
        "병원 예약 일정이 성공적으로 변경되었습니다.",
        ToastAndroid.SHORT,
        ToastAndroid.TOP
      );
      queryClient.invalidateQueries({
        queryKey: ["hospitalReservation"],
        exact: false,
      });
      queryClient.invalidateQueries({ queryKey: ["daily"], exact: false });
      queryClient.invalidateQueries({ queryKey: ["hospitalAlert"] });
    },
    onError: (error) => {
      console.log("✖️병원 예약 일정 변경 실패: ", error);
      Alert.alert("병원 예약 일정 변경 실패", "잠시 후 다시 시도해주세요.");
    },
  });
}

// [DELETE] 병원 예약 일정 삭제
export function useDeleteHospitalReservation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteHospitalReservation(id),
    onSuccess: () => {
      console.log("☑️병원 예약 일정 삭제 성공");
      ToastAndroid.showWithGravity(
        "병원 예약 일정이 성공적으로 삭제되었습니다.",
        ToastAndroid.SHORT,
        ToastAndroid.TOP
      );
      queryClient.invalidateQueries({
        queryKey: ["hospitalReservation"],
        exact: false,
      });
      queryClient.invalidateQueries({ queryKey: ["daily"], exact: false });
      queryClient.invalidateQueries({ queryKey: ["hospitalAlert"] });
    },
    onError: (error) => {
      console.log("✖️병원 예약 일정 삭제 실패: ", error);
      Alert.alert("병원 예약 일정 삭제 실패", "잠시 후 다시 시도해주세요.");
    },
  });
}

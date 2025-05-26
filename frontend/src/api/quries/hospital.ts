import { useQuery } from "@tanstack/react-query";
import { useApiMutation } from "../../hooks/useApiMutation";
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
  useApiMutation({
    mutationFn: ({
      hospitalName,
      reservationDate,
      purpose,
    }: {
      hospitalName: string;
      reservationDate: string;
      purpose: string;
    }) => addHospitalReservation(hospitalName, reservationDate, purpose),
    keysToInvalidate: [["hospitalReservation"], ["daily"], ["hospitalAlert"]],
    successMessage: "병원 예약 일정이 성공적으로 등록되었습니다.",
    errorMessage: "병원 예약 일정 등록 실패",
  });
}

// [PATCH] 병원 예약 일정 변경
export function useEditHospitalReservation() {
  useApiMutation({
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
    keysToInvalidate: [["hospitalReservation"], ["daily"], ["hospitalAlert"]],
    successMessage: "병원 예약 일정이 성공적으로 변경되었습니다.",
    errorMessage: "병원 예약 일정 변경 실패",
  });
}

// [DELETE] 병원 예약 일정 삭제
export function useDeleteHospitalReservation() {
  useApiMutation({
    mutationFn: (id: number) => deleteHospitalReservation(id),
    keysToInvalidate: [["hospitalReservation"], ["daily"], ["hospitalAlert"]],

    successMessage: "병원 예약 일정이 성공적으로 삭제되었습니다.",
    errorMessage: "병원 예약 일정 삭제 실패",
  });
}

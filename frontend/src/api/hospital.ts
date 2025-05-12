import { HospitalAlert, HospitalReservation } from "../types/Hospital";
import authClient from "./client/authClient";

// 병원 예약 알림 메시지 조회
export async function getHospitalAlert(): Promise<HospitalAlert> {
  try {
    const response = await authClient.get("/home/reservation");
    console.log("병원 예약 알림 메시지 조회 성공: ", response.data);
    return response.data;
  } catch (error: unknown) {
    console.error("병원 예약 알림 메시지 조회 실패: ", error);
    throw error;
  }
}

// 병원 예약 일정 등록
export async function addHospitalReservation(
  hospitalName: string,
  reservationDate: string,
  purpose: string
) {
  try {
    const response = await authClient.post("/calendar/ob_gyn", {
      hospital_name: hospitalName,
      reservation_date: reservationDate,
      purpose,
    });
    console.log("병원 예약 일정 등록 성공: ", response.data);
    return response.data;
  } catch (error: unknown) {
    console.error("병원 예약 일정 등록 실패: ", error);
    throw error;
  }
}

// 월별 병원 예약 일정 조회
export async function getHospitalReservation(
  month: number
): Promise<HospitalReservation[]> {
  try {
    const response = await authClient.get(`/calendar/ob_gyn/${month}`);
    console.log("월별 병원 예약 일정 조회 성공: ", response.data.data);
    return response.data.data;
  } catch (error: unknown) {
    console.error("월별 병원 예약 일정 조회 실패: ", error);
    throw error;
  }
}

// 병원 예약 일정 변경
export async function editHospitalReservation(
  id: number,
  hospitalName?: string,
  reservationDate?: string,
  purpose?: string
) {
  try {
    const payload = {
      ...(hospitalName !== undefined && { hospital_name: hospitalName }),
      ...(reservationDate !== undefined && {
        reservation_date: reservationDate,
      }),
      ...(purpose !== undefined && { purpose }),
    };
    const response = await authClient.patch(`/calendar/ob_gyn/${id}`, payload);
    console.log("병원 예약 일정 변경 성공: ", response.data);
    return response.data;
  } catch (error: unknown) {
    console.error("병원 예약 일정 변경 실패: ", error);
    throw error;
  }
}

// 병원 예약 일정 삭제
export async function deleteHospitalReservation(id: number) {
  try {
    const response = await authClient.delete(`/calendar/ob_gyn/${id}`);
    console.log("병원 예약 일정 삭제 성공: ", response.data);
    return response.data;
  } catch (error: unknown) {
    console.error("병원 예약 일정 삭제 실패: ", error);
    throw error;
  }
}

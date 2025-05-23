import { FullMedicine, MedicineAlert } from "../types/Medicine";
import authClient from "./client/authClient";

// 복용약 알림 메시지 조회
export async function getMedicineAlert(): Promise<MedicineAlert> {
  try {
    const response = await authClient.get("/home//medicine");
    console.log("복용약 알림 메시지 조회 성공: ", response.data);
    return response.data;
  } catch (error: unknown) {
    console.error("복용약 알림 메시지 조회 실패: ", error);
    return null;
  }
}

// 복용약 일정 등록
export async function addMedicineReservation(
  medicineName: string,
  startDate: string,
  endDate: string,
  timeTaken: string[],
  memo: string
) {
  try {
    const response = await authClient.post("/calendar/medication", {
      name: medicineName,
      start_date: startDate,
      end_date: endDate,
      time_taken: timeTaken,
      memo,
    });
    console.log("복용약 일정 등록 성공: ", response.data);
    return response.data;
  } catch (error: unknown) {
    console.error("복용약 일정 등록 실패: ", error);
    return null;
  }
}

// 월별 복용약 일정 조회
export async function getMedicineReservation(
  year: number,
  month: number
): Promise<FullMedicine> {
  try {
    const response = await authClient.get(
      `/calendar/medication/${year}/${month}`
    );
    console.log("월별 복용약 일정 조회 성공: ", response.data);
    return response.data;
  } catch (error: unknown) {
    console.error("월별 복용약 일정 조회 실패: ", error);
    return null;
  }
}

// 복용약 일정 변경
export async function editMedicineReservation(
  id: number,
  medicineName?: string,
  startDate?: string,
  endDate?: string,
  timeTaken?: string[],
  memo?: string
) {
  try {
    const payload = {
      ...(medicineName !== undefined && { medicine_name: medicineName }),
      ...(startDate !== undefined && {
        start_date: startDate,
      }),
      ...(endDate !== undefined && {
        end_date: endDate,
      }),
      ...(timeTaken !== undefined && { time_taken: timeTaken }),
      ...(memo !== undefined && { memo }),
    };
    const response = await authClient.patch(
      `/calendar/medication/${id}`,
      payload
    );
    console.log("복용약 일정 변경 성공: ", response.data);
    return response.data;
  } catch (error: unknown) {
    console.error("복용약 일정 변경 실패: ", error);
    return null;
  }
}

// 복용약 일정 삭제
export async function deleteMedicineReservation(id: number) {
  try {
    const response = await authClient.delete(`/calendar/medication/${id}`);
    console.log("복용약 일정 삭제 성공: ", response.data);
    return response.data;
  } catch (error: unknown) {
    console.error("복용약 일정 삭제 실패: ", error);
    return null;
  }
}

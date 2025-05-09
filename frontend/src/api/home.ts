import authClient from "./authClient";

// 월경 예정일 D-day 조회
export async function getDday() {
  try {
    const response = await authClient.get("/home/remain_day");
    console.log("월경 예정일 D-day 조희 성공", response.data);
    return response.data;
  } catch (error: unknown) {
    console.error("월경 예정일 D-day 조희 실패: ", error);
  }
}

// 병원 예약 알림 메시지 조회
export async function getHospitalAlert() {
  try {
    const response = await authClient.get("/home/alarm/hospital_reservation");
    console.log("병원 예약 알림 메시지 조회 성공: ", response.data);
    return response.data;
  } catch (error: unknown) {
    console.error("병원 예약 알림 메시지 조회 실패: ", error);
  }
}

// 복용약 알림 메시지 조회
export async function getMedicineAlert() {
  try {
    const response = await authClient.get("/home/alarm/medicine");
    console.log("복용약 알림 메시지 조회 성공: ", response.data);
    return response.data;
  } catch (error: unknown) {
    console.error("복용약 알림 메시지 조회 실패: ", error);
  }
}

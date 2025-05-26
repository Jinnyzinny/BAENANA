import { FullDate, FullDday, FullPeriod } from "../types/Period";
import authClient from "./client/authClient";

// [GET] 월경 예정일 D-day 조회
export async function getDday(): Promise<FullDday | null> {
  try {
    const response = await authClient.get("/home/remain_day");
    console.log("월경 예정일 D-day 조회 성공", response.data);
    return response.data;
  } catch (error: unknown) {
    console.error("월경 예정일 D-day 조회 실패: ", error);
    return null;
  }
}

// [GET] 월별 월경 주기 조회
export async function getPeriod(
  year: number,
  month: number
): Promise<FullPeriod | null> {
  try {
    const response = await authClient.get(
      `/calendar/menstrual_cycle/${year}/${month}`
    );
    console.log("월별 월경 주기 조회 성공: ", response.data);
    return response.data;
  } catch (error: unknown) {
    console.error("월별 월경 주기 조회 실패: ", error);
    return null;
  }
}

// [GET] 가임기 조회
export async function getChildbearingAge(): Promise<FullDate | null> {
  try {
    const response = await authClient.get("/calendar/bearing_period");
    console.log("가임기 조회 성공: ", response.data);
    return response.data;
  } catch (error: unknown) {
    console.error("가임기 조회 실패: ", error);
    return null;
  }
}

// [GET] 월경 예정일 조회
export async function getPredictedPeriod(): Promise<FullDate | null> {
  try {
    const response = await authClient.get("/calendar/menstrual_prediction");
    console.log("월경 예정일 조회 성공: ", response.data);
    return response.data;
  } catch (error: unknown) {
    console.error("월경 예정일 조회 실패: ", error);
    return null;
  }
}

// [POST] 월경 주기 등록
export async function addPeriod(startDate: string, endDate: string) {
  try {
    const response = await authClient.post("/calendar/menstrual_cycle", {
      start_date: startDate,
      end_date: endDate,
    });
    console.log("월경 주기 등록 성공: ", response.data);
    return response.data;
  } catch (error: unknown) {
    console.error("월경 주기 등록 실패: ", error);
    return null;
  }
}

// [PATCH] 월경 주기 변경
export async function editPeriod(
  id: number,
  cycleId: number,
  startDate?: string,
  endDate?: string
) {
  try {
    const payload = {
      cycle_id: cycleId,
      ...(startDate !== undefined && {
        start_date: startDate,
      }),
      ...(endDate !== undefined && {
        end_date: endDate,
      }),
    };
    const response = await authClient.patch(
      `/calendar/menstrual_cycle/${id}`,
      payload
    );
    console.log("월경 주기 변경 성공: ", response.data);
    return response.data;
  } catch (error: unknown) {
    console.error("월경 주기 변경 실패: ", error);
    return null;
  }
}

// [DELETE] 월경 주기 삭제
export async function deletePeriod(cycleId: number) {
  try {
    const response = await authClient.delete(
      `/calendar/menstrual_cycle/${cycleId}`
    );
    console.log("월경 주기 삭제 성공: ", response.data);
    return response.data;
  } catch (error: unknown) {
    console.error("월경 주기 삭제 실패: ", error);
    return null;
  }
}

// [POST] 월경 세부 정보 등록
export async function addPeriodSymptom(
  date: string,
  bleedingLevel: number,
  painLevel: number,
  symptom: string[]
) {
  try {
    const response = await authClient.post("/calendar/menstrual_cycle/log", {
      date,
      bleeding_level: bleedingLevel,
      pain_level: painLevel,
      symptom,
    });
    console.log("월경 주기 세부 정보 등록 성공: ", response.data);
    return response.data;
  } catch (error: unknown) {
    console.error("월경 주기 세부 정보 등록 실패: ", error);
    return null;
  }
}

// [PATCH] 월경 세부 정보 변경
export async function editPeriodSymptom(
  cycleId: number,
  date: string,
  bleedingLevel?: number,
  painLevel?: number,
  symptom?: string[]
) {
  try {
    const payload = {
      date,
      ...(bleedingLevel !== undefined && { bleeding_level: bleedingLevel }),
      ...(painLevel !== undefined && { pain_level: painLevel }),
      ...(symptom !== undefined && { symptom }),
    };
    const response = await authClient.patch(
      `/calendar/menstrual_cycle/log/${cycleId}`,
      payload
    );
    console.log("월경 주기 세부 정보 변경 성공: ", response.data);
    return response.data;
  } catch (error: unknown) {
    console.error("월경 주기 세부 정보 변경 실패: ", error);
    return null;
  }
}

// [DELETE] 월경 세부 정보 삭제
export async function deletePeriodSymptom(cycleId: number) {
  try {
    const response = await authClient.delete(
      `/calendar/menstrual_cycle/log/${cycleId}`
    );
    console.log("월경 세부 정보 삭제 성공: ", response.data);
    return response.data;
  } catch (error: unknown) {
    console.error("월경 세부 정보 삭제 실패: ", error);
    return null;
  }
}

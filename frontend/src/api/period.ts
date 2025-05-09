import authClient from "./authClient";

// 월경 주기 등록
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
  }
}

// 월별 월경 주기 조회
export async function getPeriod(month: number) {
  try {
    const response = await authClient.get(`/calendar/menstrual_cycle/${month}`);
    console.log("월별 월경 주기 조회 성공: ", response.data);
    return response.data;
  } catch (error: unknown) {
    console.error("월별 월경 주기 조회 실패: ", error);
  }
}

// 월경 주기 변경
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
  }
}

// 월경 주기 세부 정보 등록
export async function addPeriodSymtom(
  cycleId: number,
  date: string,
  bleedingLevel: number,
  painLevel: number,
  isStart: boolean,
  isEnd: boolean,
  symptom: string[]
) {
  try {
    const response = await authClient.post("/calendar/menstrual_cycle/log", {
      cycle_id: cycleId,
      date,
      bleeding_level: bleedingLevel,
      pain_level: painLevel,
      is_start: isStart,
      is_end: isEnd,
      symptom,
    });
    console.log("월경 주기 세부 정보 등록 성공: ", response.data);
    return response.data;
  } catch (error: unknown) {
    console.error("월경 주기 세부 정보 등록 실패: ", error);
  }
}

// 월경 주기 세부 정보 변경
export async function editPeriodSymtom(
  cycleId: number,
  date: string,
  bleedingLevel?: number,
  painLevel?: number,
  isStart?: boolean,
  isEnd?: boolean,
  symptom?: string[]
) {
  try {
    const payload = {
      date,
      ...(bleedingLevel !== undefined && { bleeding_level: bleedingLevel }),
      ...(painLevel !== undefined && { pain_level: painLevel }),
      ...(isStart !== undefined && { is_start: isStart }),
      ...(isEnd !== undefined && { is_end: isEnd }),
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
  }
}

// 가임기 조회
export async function getChildbearingAge() {
  try {
    const response = await authClient.get("/calendar/bearing_period");
    console.log("가임기 조회 성공: ", response.data);
    return response.data;
  } catch (error: unknown) {
    console.error("가임기 조회 실패: ", error);
  }
}

// 월경 예정일 조회
export async function getPredictedPeriod() {
  try {
    const response = await authClient.get("/calendar/menstrual_prediction");
    console.log("월경 예정일 조회 성공: ", response.data);
    return response.data;
  } catch (error: unknown) {
    console.error("월경 예정일 조회 실패: ", error);
  }
}

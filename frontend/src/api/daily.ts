import { FullDaily } from "../types/Daily";
import authClient from "./client/authClient";

// 일일 정보 조회
export async function getDaily(
  year: number,
  month: number,
  day: number
): Promise<FullDaily> {
  try {
    const response = await authClient.get(
      `/calendar/daily/${year}/${month}/${day}`
    );
    console.log("일일 정보 조회 성공: ", response.data);
    return response.data;
  } catch (error: unknown) {
    console.error("일일 정보 조회 실패: ", error);
    return null;
  }
}

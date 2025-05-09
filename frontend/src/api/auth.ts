import authClient from "./authClient";
import { client } from "./client";

// 카카오 로그인 (카카오에서 받아온 AccessToken 백엔드로 전송)
export async function kakaoLogin(data: string) {
  try {
    const response = await client.post("/login", data);
    console.log("카카오 로그인 성공: ", response.data);
    return response.data;
  } catch (error: unknown) {
    console.error("카카오 로그인 실패", error);
  }
}

// 회원 탈퇴
export async function withdraw() {
  try {
    const response = await authClient.delete("/users/me");
    console.log("회원 탈퇴 성공: ", response.data);
    return response.data;
  } catch (error: unknown) {
    console.error("회원 탈퇴 실패: ", error);
  }
}

// 사용자 알림 설정 변경(/users/me/alarm)
export async function userAlarm(allowAlarm: boolean) {
  try {
    const response = await authClient.patch("/users/me/alarm", {
      allow_alarm: allowAlarm,
    });
    console.log("사용자 알림 설정 변경 성공: ", response.data);
    return response.data;
  } catch (error: unknown) {
    console.log("사용자 알림 설정 변경 실패: ", error);
  }
}

import authClient from "./authClient";
import { client } from "./client";

// 카카오 로그인 (카카오에서 받아온 AccessToken 백엔드로 전송)
export async function kakaoLogin(data: string) {
  const response = await client.post("/login", data);
  return response.data;
}

// 회원 탈퇴
export async function withdraw() {
  try {
    const response = await authClient.delete("/users/me");
    return response.data;
  } catch (error: unknown) {
    console.error("회원 탈퇴 실패: ", error);
  }
}

// 사용자 알림 설정 변경(/users/me/alarm)

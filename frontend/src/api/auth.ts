import { Auth } from "../types/Auth";
import authClient from "./client/authClient";
import { client } from "./client/client";

// [POST] 카카오 로그인 (카카오에서 받아온 AccessToken 백엔드로 전송)
export async function kakaoLogin(accessToken: string): Promise<Auth | null> {
  try {
    const response = await client.post("/auth/kakao", { accessToken });
    console.log("카카오 로그인 성공: ", response.data.data);
    return response.data.data;
  } catch (error: unknown) {
    console.error("카카오 로그인 실패", error);
    return null;
  }
}

// [DELETE] 회원 탈퇴
export async function withdraw() {
  try {
    const response = await authClient.delete("/users/me");
    console.log("회원 탈퇴 성공: ", response.data);
    return response.data;
  } catch (error: unknown) {
    console.error("회원 탈퇴 실패: ", error);
    return null;
  }
}

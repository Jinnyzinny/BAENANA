import { useMutation } from "@tanstack/react-query";
import { kakaoLogin, userAlarm, withdraw } from "../auth";
import { Alert } from "react-native";

// 로그인
export function useLogin() {
  return useMutation({
    mutationFn: (data: string) => kakaoLogin(data),
    onSuccess: (data) => {
      console.log("☑️로그인 성공: ", data);
    },
    onError: (error) => {
      console.log("✖️로그인 실패: ", error);
      Alert.alert("로그인 실패", "잠시 후 다시 시도해주세요.");
    },
  });
}

// 회원 탈퇴
export function useWithdraw() {
  return useMutation({
    mutationFn: () => withdraw(),
    onSuccess: () => {
      console.log("회원 탈퇴 성공");
      Alert.alert("회원 탈퇴 성공", "회원 탈퇴되었습니다.");
    },
    onError: (error) => {
      console.log("✖️회원 탈퇴 실패: ", error);
      Alert.alert("회원 탈퇴 실패", "잠시 후 다시 시도해주세요.");
    },
  });
}

// 사용자 알림 설정 변경
export function useUserAlarm() {
  return useMutation({
    mutationFn: (allowAlarm: boolean) => userAlarm(allowAlarm),
    onSuccess: (data) => {
      console.log("☑️사용자 알림 설정 변경 성공: ", data);
    },
    onError: (error) => {
      console.log("✖️사용자 알림 설정 변경 실패: ", error);
      Alert.alert("알림 설정 변경 실패", "잠시 후 다시 시도해주세요.");
    },
  });
}

import { useMutation } from "@tanstack/react-query";
import { Alert } from "react-native";
import { useLoginStore } from "../../store/loginStore";
import { kakaoLogin, withdraw } from "../auth";

// [POST] 로그인
export function useKaKaoLogin() {
  const setLogin = useLoginStore((state) => state.setLogin);

  return useMutation({
    mutationFn: (accessToken: string) => kakaoLogin(accessToken),
    onSuccess: (data) => {
      if (data === null) {
        return;
      }
      console.log("☑️로그인 성공: ", data);
      setLogin(data);
    },
    onError: (error) => {
      console.log("✖️로그인 실패: ", error);
      Alert.alert("로그인 실패", "잠시 후 다시 시도해주세요.");
    },
  });
}

// [DELETE] 회원 탈퇴
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

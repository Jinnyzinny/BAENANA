import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

interface LoginState {
  isLoggedIn: boolean;
  setLogin: () => void;
  logout: () => void;
}

// 토큰 관련 코드 추가 작성 필요
export const useLoginStore = create<LoginState>()(
  subscribeWithSelector((set) => ({
    isLoggedIn: false,
    setLogin: () => set({ isLoggedIn: true }),
    logout: () => set({ isLoggedIn: false }),
  }))
);

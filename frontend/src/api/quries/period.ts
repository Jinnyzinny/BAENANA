import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Alert } from "react-native";
import {
  addPeriod,
  addPeriodSymtom,
  editPeriod,
  editPeriodSymtom,
  getChildbearingAge,
  getDday,
  getPeriod,
  getPredictedPeriod,
} from "../period";

// ✅월경 예정일 D-day 조회
export function useGetDday() {
  return useQuery({
    queryKey: ["dDay"],
    queryFn: () => getDday(),
  });
}

// ✅월경 주기 등록
export function useAddPeriod() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      startDate,
      endDate,
    }: {
      startDate: string;
      endDate: string;
    }) => addPeriod(startDate, endDate),
    onSuccess: (data) => {
      console.log("☑️월경 주기 등록 성공: ", data);
      queryClient.invalidateQueries({ queryKey: ["period"], exact: false });
      queryClient.invalidateQueries({ queryKey: ["childbearingAge"] });
      queryClient.invalidateQueries({ queryKey: ["predictedPeriod"] });
    },
    onError: (error) => {
      console.log("✖️월경 주기 등록 실패: ", error);
      Alert.alert("월경 주기 등록 실패", "잠시 후 다시 시도해주세요.");
    },
  });
}

// ✅월별 월경 주기 조회
export function useGetPeriod(month: number) {
  return useQuery({
    queryKey: ["period", month],
    queryFn: () => getPeriod(month),
  });
}

// 월경 주기 변경
export function useEditPeriod() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      cycleId,
      startDate,
      endDate,
    }: {
      id: number;
      cycleId: number;
      startDate?: string;
      endDate?: string;
    }) => editPeriod(id, cycleId, startDate, endDate),
    onSuccess: (data) => {
      console.log("☑️월경 주기 변경 성공: ", data);
      queryClient.invalidateQueries({ queryKey: ["period"], exact: false });
    },
    onError: (error) => {
      console.log("✖️월경 주기 변경 실패: ", error);
      Alert.alert("월경 주기 변경 실패", "잠시 후 다시 시도해주세요.");
    },
  });
}

// 월경 세부 정보 등록
export function useAddPeriodSymtom() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      date,
      bleedingLevel,
      painLevel,
      isStart,
      isEnd,
      symptom,
    }: {
      date: string;
      bleedingLevel: number;
      painLevel: number;
      isStart: boolean;
      isEnd: boolean;
      symptom: number[];
    }) =>
      addPeriodSymtom(date, bleedingLevel, painLevel, isStart, isEnd, symptom),
    onSuccess: (data) => {
      console.log("☑️월경 세부 정보 등록 성공: ", data);
      queryClient.invalidateQueries({ queryKey: ["period"], exact: false });
    },
    onError: (error) => {
      console.log("✖️월경 세부 정보 등록 실패: ", error);
      Alert.alert("월경 세부 정보 등록 실패", "잠시 후 다시 시도해주세요.");
    },
  });
}

// 월경 세부 정보 변경
export function useEditPeriodSymtom() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      cycleId,
      date,
      bleedingLevel,
      painLevel,
      isStart,
      isEnd,
      symptom,
    }: {
      cycleId: number;
      date: string;
      bleedingLevel?: number;
      painLevel?: number;
      isStart?: boolean;
      isEnd?: boolean;
      symptom?: number[];
    }) =>
      editPeriodSymtom(
        cycleId,
        date,
        bleedingLevel,
        painLevel,
        isStart,
        isEnd,
        symptom
      ),
    onSuccess: (data) => {
      console.log("☑️월경 세부 정보 변경 성공: ", data);
      queryClient.invalidateQueries({ queryKey: ["period"], exact: false });
    },
    onError: (error) => {
      console.log("✖️월경 세부 정보 변경 실패: ", error);
      Alert.alert("월경 세부 정보 변경 실패", "잠시 후 다시 시도해주세요.");
    },
  });
}

// ✅가임기 조회
export function useGetChildbearingAge() {
  return useQuery({
    queryKey: ["childbearingAge"],
    queryFn: () => getChildbearingAge(),
  });
}

// ✅월경 예정일 조회
export function useGetPredictedPeriod() {
  return useQuery({
    queryKey: ["predictedPeriod"],
    queryFn: () => getPredictedPeriod(),
  });
}

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Alert, ToastAndroid } from "react-native";
import {
  addPeriod,
  addPeriodSymptom,
  deletePeriod,
  deletePeriodSymptom,
  editPeriod,
  editPeriodSymptom,
  getChildbearingAge,
  getDday,
  getPeriod,
  getPredictedPeriod,
} from "../period";

// [GET] 월경 예정일 D-day 조회
export function useGetDday() {
  return useQuery({
    queryKey: ["dDay"],
    queryFn: () => getDday(),
  });
}

// [GET] 월별 월경 주기 조회
export function useGetPeriod(year: number, month: number) {
  return useQuery({
    queryKey: ["period", year, month],
    queryFn: () => getPeriod(year, month),
  });
}

// [GET] 가임기 조회
export function useGetChildbearingAge() {
  return useQuery({
    queryKey: ["childbearingAge"],
    queryFn: () => getChildbearingAge(),
  });
}

// [GET] 월경 예정일 조회
export function useGetPredictedPeriod() {
  return useQuery({
    queryKey: ["predictedPeriod"],
    queryFn: () => getPredictedPeriod(),
  });
}

// [POST] 월경 주기 등록
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
      ToastAndroid.showWithGravity(
        "월경 주기가 성공적으로 등록되었습니다.",
        ToastAndroid.SHORT,
        ToastAndroid.TOP
      );
      queryClient.invalidateQueries({ queryKey: ["dDay"] });
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

// [PATCH] 월경 주기 변경
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
      ToastAndroid.showWithGravity(
        "월경 주기가 성공적으로 변경되었습니다.",
        ToastAndroid.SHORT,
        ToastAndroid.TOP
      );
      queryClient.invalidateQueries({ queryKey: ["dDay"] });
      queryClient.invalidateQueries({ queryKey: ["period"], exact: false });
    },
    onError: (error) => {
      console.log("✖️월경 주기 변경 실패: ", error);
      Alert.alert("월경 주기 변경 실패", "잠시 후 다시 시도해주세요.");
    },
  });
}

// [DELETE] 월경 주기 삭제
export function useDeletePeriod() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (cycleId: number) => deletePeriod(cycleId),
    onSuccess: (data) => {
      console.log("☑️월경 주기 삭제 성공: ", data);
      ToastAndroid.showWithGravity(
        "월경 주기가 성공적으로 삭제되었습니다.",
        ToastAndroid.SHORT,
        ToastAndroid.TOP
      );
      queryClient.invalidateQueries({ queryKey: ["dDay"] });
      queryClient.invalidateQueries({ queryKey: ["childbearingAge"] });
      queryClient.invalidateQueries({ queryKey: ["predictedPeriod"] });
      queryClient.invalidateQueries({ queryKey: ["period"], exact: false });
      queryClient.invalidateQueries({ queryKey: ["daily"], exact: false });
    },
    onError: (error) => {
      console.log("✖️월경 주기 삭제 실패: ", error);
      Alert.alert("월경 주기 삭제 실패", "잠시 후 다시 시도해주세요.");
    },
  });
}

// [POST] 월경 세부 정보 등록
export function useAddPeriodSymptom() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      date,
      bleedingLevel,
      painLevel,
      symptom,
    }: {
      date: string;
      bleedingLevel: number;
      painLevel: number;
      symptom: string[];
    }) => addPeriodSymptom(date, bleedingLevel, painLevel, symptom),
    onSuccess: (data) => {
      console.log("☑️월경 세부 정보 등록 성공: ", data);
      ToastAndroid.showWithGravity(
        "월경 세부 정보가 성공적으로 등록되었습니다.",
        ToastAndroid.SHORT,
        ToastAndroid.TOP
      );
      queryClient.invalidateQueries({ queryKey: ["period"], exact: false });
    },
    onError: (error) => {
      console.log("✖️월경 세부 정보 등록 실패: ", error);
      Alert.alert("월경 세부 정보 등록 실패", "잠시 후 다시 시도해주세요.");
    },
  });
}

// [PATCH] 월경 세부 정보 변경
export function useEditPeriodSymptom() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      cycleId,
      date,
      bleedingLevel,
      painLevel,
      symptom,
    }: {
      cycleId: number;
      date: string;
      bleedingLevel?: number;
      painLevel?: number;
      symptom?: string[];
    }) => editPeriodSymptom(cycleId, date, bleedingLevel, painLevel, symptom),
    onSuccess: (data) => {
      console.log("☑️월경 세부 정보 변경 성공: ", data);
      ToastAndroid.showWithGravity(
        "월경 세부 정보가 성공적으로 변경되었습니다.",
        ToastAndroid.SHORT,
        ToastAndroid.TOP
      );
      queryClient.invalidateQueries({ queryKey: ["period"], exact: false });
      queryClient.invalidateQueries({ queryKey: ["daily"], exact: false });
    },
    onError: (error) => {
      console.log("✖️월경 세부 정보 변경 실패: ", error);
      Alert.alert("월경 세부 정보 변경 실패", "잠시 후 다시 시도해주세요.");
    },
  });
}

// [DELETE] 월경 세부 정보 삭제
export function useDeletePeriodSymptom() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (cycleId: number) => deletePeriodSymptom(cycleId),
    onSuccess: (data) => {
      console.log("☑️월경 세부 정보 삭제 성공: ", data);
      ToastAndroid.showWithGravity(
        "월경 세부 정보가 성공적으로 삭제되었습니다.",
        ToastAndroid.SHORT,
        ToastAndroid.TOP
      );
      queryClient.invalidateQueries({ queryKey: ["period"], exact: false });
      queryClient.invalidateQueries({ queryKey: ["daily"], exact: false });
    },
    onError: (error) => {
      console.log("✖️월경 세부 정보 삭제 실패: ", error);
      Alert.alert("월경 세부 정보 삭제 실패", "잠시 후 다시 시도해주세요.");
    },
  });
}

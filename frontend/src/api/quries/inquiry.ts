import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Alert, ToastAndroid } from "react-native";
import {
  addAdminInquiry,
  addInquiry,
  deleteAdminInquiry,
  deleteInquiry,
  editAdminInquiry,
  editInquiry,
  getAdminInquiryDetail,
  getAdminInquiryList,
  getInquiryDetail,
  getInquiryList,
} from "../inquiry";

// 사용자

// [GET] 문의사항 목록 조회
export function useGetInquiryList() {
  return useQuery({
    queryKey: ["inquiryList"],
    queryFn: () => getInquiryList(),
  });
}

// [GET] 문의사항 상세 조회
export function useGetInquiryDetail(inquiryId: number) {
  return useQuery({
    queryKey: ["inquiryDetail", inquiryId],
    queryFn: () => getInquiryDetail(inquiryId),
  });
}

// [POST] 문의사항 등록
export function useAddInquiry() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      title,
      questionContent,
    }: {
      title: string;
      questionContent: string;
    }) => addInquiry(title, questionContent),
    onSuccess: (data) => {
      console.log("☑️[사용자] 문의사항 등록 성공: ", data);
      ToastAndroid.showWithGravity(
        "문의사항이 성공적으로 등록되었습니다.",
        ToastAndroid.SHORT,
        ToastAndroid.TOP
      );
      queryClient.invalidateQueries({ queryKey: ["inquiryList"] });
    },
    onError: (error) => {
      console.log("✖️[사용자] 문의사항 등록 실패: ", error);
      Alert.alert("문의사항 등록 실패", "잠시 후 다시 시도해주세요.");
    },
  });
}

// [PATCH] 문의사항 변경
export function useEditInquiry() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      inquiryId,
      title,
      questionContent,
    }: {
      inquiryId: number;
      title?: string;
      questionContent?: string;
    }) => editInquiry(inquiryId, title, questionContent),
    onSuccess: (data, variables) => {
      console.log("☑️[사용자] 문의사항 변경 성공: ", data);
      ToastAndroid.showWithGravity(
        "문의사항이 성공적으로 변경되었습니다.",
        ToastAndroid.SHORT,
        ToastAndroid.TOP
      );
      queryClient.invalidateQueries({ queryKey: ["inquiryList"] });
      queryClient.invalidateQueries({
        queryKey: ["inquiryDetail", variables.inquiryId],
      });
    },
    onError: (error) => {
      console.log("✖️[사용자] 문의사항 변경 실패: ", error);
      Alert.alert("문의사항 변경 실패", "잠시 후 다시 시도해주세요.");
    },
  });
}

// [DELETE] 문의사항 삭제
export function useDeleteInquiry() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (inquiryId: number) => deleteInquiry(inquiryId),
    onSuccess: () => {
      console.log("☑️[사용자] 문의사항 삭제 성공");
      ToastAndroid.showWithGravity(
        "문의사항이 성공적으로 삭제되었습니다.",
        ToastAndroid.SHORT,
        ToastAndroid.TOP
      );
      queryClient.invalidateQueries({ queryKey: ["inquiryList"] });
    },
    onError: (error) => {
      console.log("✖️[사용자] 문의사항 삭제 실패: ", error);
      Alert.alert("문의사항 삭제 실패", "잠시 후 다시 시도해주세요.");
    },
  });
}

// 관리자
// [GET] 문의사항 목록 조회
export function useGetAdminInquiryList() {
  return useQuery({
    queryKey: ["adminInquiryList"],
    queryFn: () => getAdminInquiryList(),
  });
}

// [GET] 문의사항 상세 조회
export function useGetAdminInquiryDetail(inquiryId: number) {
  return useQuery({
    queryKey: ["adminInquiryDetail", inquiryId],
    queryFn: () => getAdminInquiryDetail(inquiryId),
  });
}

// [POST] 문의사항 답변 등록
export function useAddAdminInquiry() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      inquiryId,
      answerContent,
    }: {
      inquiryId: number;
      answerContent: string;
    }) => addAdminInquiry(inquiryId, answerContent),
    onSuccess: (data, variables) => {
      console.log("☑️[관리자] 문의사항 답변 등록 성공: ", data);
      ToastAndroid.showWithGravity(
        "답변이 성공적으로 등록되었습니다.",
        ToastAndroid.SHORT,
        ToastAndroid.TOP
      );
      queryClient.invalidateQueries({ queryKey: ["adminInquiryList"] });
      queryClient.invalidateQueries({
        queryKey: ["adminInquiryDetail", variables.inquiryId],
      });
    },
    onError: (error) => {
      console.log("✖️[관리자] 문의사항 답변 등록 실패: ", error);
      Alert.alert("문의사항 답변 등록 실패", "잠시 후 다시 시도해주세요.");
    },
  });
}

// [PATCH] 문의사항 답변 변경
export function useEditAdminInquiry() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      inquiryId,
      answerContent,
    }: {
      inquiryId: number;
      answerContent: string;
    }) => editAdminInquiry(inquiryId, answerContent),
    onSuccess: (data, variables) => {
      console.log("☑️[관리자] 문의사항 답변 변경 성공: ", data);
      ToastAndroid.showWithGravity(
        "답변이 성공적으로 변경되었습니다.",
        ToastAndroid.SHORT,
        ToastAndroid.TOP
      );
      queryClient.invalidateQueries({ queryKey: ["adminInquiryList"] });
      queryClient.invalidateQueries({
        queryKey: ["adminInquiryDetail", variables.inquiryId],
      });
    },
    onError: (error) => {
      console.log("✖️[관리자] 문의사항 답변 변경 실패: ", error);
      Alert.alert("문의사항 답변 변경 실패", "잠시 후 다시 시도해주세요.");
    },
  });
}

// [DELETE] 문의사항 답변 삭제
export function useDeleteAdminInquiry() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (inquiryId: number) => deleteAdminInquiry(inquiryId),
    onSuccess: () => {
      console.log("☑️[관리자] 문의사항 답변 삭제 성공");
      ToastAndroid.showWithGravity(
        "답변이 성공적으로 삭제되었습니다.",
        ToastAndroid.SHORT,
        ToastAndroid.TOP
      );
      queryClient.invalidateQueries({ queryKey: ["adminInquiryList"] });
    },
    onError: (error) => {
      console.log("✖️[관리자] 문의사항 답변 삭제 실패: ", error);
      Alert.alert("문의사항 답변 삭제 실패", "잠시 후 다시 시도해주세요.");
    },
  });
}

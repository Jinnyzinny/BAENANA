import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
import { Alert } from "react-native";

// 사용자
// [사용자] 문의사항 등록
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
      queryClient.invalidateQueries({ queryKey: ["inquiryList"] });
    },
    onError: (error) => {
      console.log("✖️[사용자] 문의사항 등록 실패: ", error);
      Alert.alert("문의사항 등록 실패", "잠시 후 다시 시도해주세요.");
    },
  });
}

// [사용자] 문의사항 목록 조회
export function useGetInquiryList() {
  return useQuery({
    queryKey: ["inquiryList"],
    queryFn: () => getInquiryList(),
  });
}

// [사용자] 문의사항 상세 조회
export function useGetInquiryDetail(inquiryId: number) {
  return useQuery({
    queryKey: ["inquiryDetail", inquiryId],
    queryFn: () => getInquiryDetail(inquiryId),
  });
}

// [사용자] 문의사항 변경
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
    onSuccess: (data) => {
      console.log("☑️[사용자] 문의사항 변경 성공: ", data);
      queryClient.invalidateQueries({ queryKey: ["inquiryList"] });
    },
    onError: (error) => {
      console.log("✖️[사용자] 문의사항 변경 실패: ", error);
      Alert.alert("문의사항 변경 실패", "잠시 후 다시 시도해주세요.");
    },
  });
}

// [사용자] 문의사항 삭제
export function useDeleteInquiry() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (inquiryId: number) => deleteInquiry(inquiryId),
    onSuccess: () => {
      console.log("☑️[사용자] 문의사항 삭제 성공");
      queryClient.invalidateQueries({ queryKey: ["inquiryList"] });
    },
    onError: (error) => {
      console.log("✖️[사용자] 문의사항 삭제 실패: ", error);
      Alert.alert("문의사항 삭제 실패", "잠시 후 다시 시도해주세요.");
    },
  });
}

// 관리자
// [관리자] 문의사항 목록 조회
export function useGetAdminInquiryList() {
  return useQuery({
    queryKey: ["adminInquiryList"],
    queryFn: () => getAdminInquiryList(),
  });
}

// [관리자] 문의사항 상세 조회
export function useGetAdminInquiryDetail(inquiryId: number) {
  return useQuery({
    queryKey: ["adminInquiryDetail", inquiryId],
    queryFn: () => getAdminInquiryDetail(inquiryId),
  });
}

// [관리자] 문의사항 답변 등록
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

// [관리자] 문의사항 답변 변경
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

// [관리자] 문의사항 답변 삭제
export function useDeleteAdminInquiry() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (inquiryId: number) => deleteAdminInquiry(inquiryId),
    onSuccess: () => {
      console.log("☑️[관리자] 문의사항 답변 삭제 성공");
      queryClient.invalidateQueries({ queryKey: ["adminInquiryList"] });
    },
    onError: (error) => {
      console.log("✖️[관리자] 문의사항 답변 삭제 실패: ", error);
      Alert.alert("문의사항 답변 삭제 실패", "잠시 후 다시 시도해주세요.");
    },
  });
}

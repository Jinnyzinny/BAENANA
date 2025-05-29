import { useQuery } from "@tanstack/react-query";
import { useApiMutation } from "../../hooks/useApiMutation";
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
  return useApiMutation({
    mutationFn: ({
      title,
      questionContent,
    }: {
      title: string;
      questionContent: string;
    }) => addInquiry(title, questionContent),
    keysToInvalidate: [["inquiryList"]],
    successMessage: "문의사항이 성공적으로 등록되었습니다.",
    errorMessage: "문의사항 등록 실패",
  });
}

// [PATCH] 문의사항 변경
export function useEditInquiry() {
  return useApiMutation({
    mutationFn: ({
      inquiryId,
      title,
      questionContent,
    }: {
      inquiryId: number;
      title?: string;
      questionContent?: string;
    }) => editInquiry(inquiryId, title, questionContent),
    keysToInvalidate: [
      ["inquiryList"],
      ({ inquiryId }) => ["inquiryDetail", inquiryId],
    ],
    successMessage: "문의사항이 성공적으로 변경되었습니다.",
    errorMessage: "문의사항 변경 실패",
  });
}

// [DELETE] 문의사항 삭제
export function useDeleteInquiry() {
  return useApiMutation({
    mutationFn: (inquiryId: number) => deleteInquiry(inquiryId),
    keysToInvalidate: [["inquiryList"]],
    successMessage: "문의사항이 성공적으로 삭제되었습니다.",
    errorMessage: "문의사항 삭제 실패",
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
  return useApiMutation({
    mutationFn: ({
      inquiryId,
      answerContent,
    }: {
      inquiryId: number;
      answerContent: string;
    }) => addAdminInquiry(inquiryId, answerContent),
    keysToInvalidate: [
      ["adminInquiryList"],
      ({ inquiryId }) => ["adminInquiryDetail", inquiryId],
    ],
    successMessage: "답변이 성공적으로 등록되었습니다.",
    errorMessage: "문의사항 답변 등록 실패",
  });
}

// [PATCH] 문의사항 답변 변경
export function useEditAdminInquiry() {
  return useApiMutation({
    mutationFn: ({
      inquiryId,
      answerContent,
    }: {
      inquiryId: number;
      answerContent: string;
    }) => editAdminInquiry(inquiryId, answerContent),
    keysToInvalidate: [
      ["adminInquiryList"],
      ({ inquiryId }) => ["adminInquiryDetail", inquiryId],
    ],
    successMessage: "답변이 성공적으로 변경되었습니다.",
    errorMessage: "문의사항 답변 변경 실패",
  });
}

// [DELETE] 문의사항 답변 삭제
export function useDeleteAdminInquiry() {
  return useApiMutation({
    mutationFn: (inquiryId: number) => deleteAdminInquiry(inquiryId),
    keysToInvalidate: [["adminInquiryList"]],
    successMessage: "답변이 성공적으로 삭제되었습니다.",
    errorMessage: "문의사항 답변 삭제 실패",
  });
}

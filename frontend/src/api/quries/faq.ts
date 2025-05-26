import { useQuery } from "@tanstack/react-query";
import { useApiMutation } from "../../hooks/useApiMutation";
import { addFaq, deleteFaq, editFaq, getFaqDetail, getFaqList } from "../faq";

// [GET] Faq 목록 조회
export function useGetFaqList() {
  return useQuery({
    queryKey: ["faqList"],
    queryFn: () => getFaqList(),
    staleTime: 1000 * 60 * 5, // fresh 상태 유지 시간: 5분
  });
}

// [GET] Faq 상세 조회
export function useGetFaqDetail(faqId: number) {
  return useQuery({
    queryKey: ["faqDetail", faqId],
    queryFn: () => getFaqDetail(faqId),
  });
}

// 관리자
// [POST] Faq 작성
export function useAddFaq() {
  useApiMutation({
    mutationFn: ({ question, answer }: { question: string; answer: string }) =>
      addFaq(question, answer),
    keysToInvalidate: [["faqList"]],
    successMessage: "Faq가 성공적으로 등록되었습니다.",
    errorMessage: "Faq 작성 실패",
  });
}

// [PATCH] Faq 변경
export function useEditFaq() {
  useApiMutation({
    mutationFn: ({
      faqId,
      question,
      answer,
    }: {
      faqId: number;
      question?: string;
      answer?: string;
    }) => editFaq(faqId, question, answer),
    keysToInvalidate: [["faqList"], ({ faqId }) => ["faqDetail", faqId]],
    successMessage: "Faq가 성공적으로 변경되었습니다.",
    errorMessage: "Faq 변경 실패",
  });
}

// [DELETE] Faq 삭제
export function useDeleteFaq() {
  useApiMutation({
    mutationFn: (faqId: number) => deleteFaq(faqId),
    keysToInvalidate: [["faqList"]],
    successMessage: "Faq가 성공적으로 삭제되었습니다.",
    errorMessage: "Faq 삭제 실패",
  });
}

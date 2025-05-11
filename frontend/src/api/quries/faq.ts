import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addFaq, deleteFaq, editFaq, getFaqDetail, getFaqList } from "../faq";
import { Alert } from "react-native";

// FAQ 목록 조회
export function useGetFaqList() {
  return useQuery({
    queryKey: ["faqList"],
    queryFn: () => getFaqList(),
    staleTime: 1000 * 60 * 5, // fresh 상태 유지 시간: 5분
  });
}

// FAQ 상세 조회
export function useGetFaqDetail(faqId: number) {
  return useQuery({
    queryKey: ["faqDetail", faqId],
    queryFn: () => getFaqDetail(faqId),
  });
}

// [관리자] FAQ 작성
export function useAddFaq() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ question, answer }: { question: string; answer: string }) =>
      addFaq(question, answer),
    onSuccess: (data) => {
      console.log("☑️FAQ 작성 성공: ", data);
      queryClient.invalidateQueries({ queryKey: ["faqList"] });
    },
    onError: (error) => {
      console.log("✖️FAQ 작성 실패: ", error);
      Alert.alert("FAQ 작성 실패", "잠시 후 다시 시도해주세요.");
    },
  });
}

// [관리자] FAQ 변경
export function useEditFaq() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      faqId,
      question,
      answer,
    }: {
      faqId: number;
      question?: string;
      answer?: string;
    }) => editFaq(faqId, question, answer),
    onSuccess: (data) => {
      console.log("☑️FAQ 변경 성공: ", data);
      queryClient.invalidateQueries({ queryKey: ["faqList"] });
    },
    onError: (error) => {
      console.log("✖️FAQ 변경 실패: ", error);
      Alert.alert("FAQ 변경 실패", "잠시 후 다시 시도해주세요.");
    },
  });
}

// [관리자] FAQ 삭제
export function useDeleteFaq() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (faqId: number) => deleteFaq(faqId),
    onSuccess: () => {
      console.log("☑️FAQ 삭제 성공");
      queryClient.invalidateQueries({ queryKey: ["faqList"] });
    },
    onError: (error) => {
      console.log("✖️FAQ 삭제 실패: ", error);
      Alert.alert("FAQ 삭제 실패", "잠시 후 다시 시도해주세요.");
    },
  });
}

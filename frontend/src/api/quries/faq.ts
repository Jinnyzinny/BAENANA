import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Alert, ToastAndroid } from "react-native";
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
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ question, answer }: { question: string; answer: string }) =>
      addFaq(question, answer),
    onSuccess: (data) => {
      console.log("☑️Faq 작성 성공: ", data);
      ToastAndroid.showWithGravity(
        "Faq가 성공적으로 등록되었습니다.",
        ToastAndroid.SHORT,
        ToastAndroid.TOP
      );
      queryClient.invalidateQueries({ queryKey: ["faqList"] });
    },
    onError: (error) => {
      console.log("✖️Faq 작성 실패: ", error);
      Alert.alert("Faq 작성 실패", "잠시 후 다시 시도해주세요.");
    },
  });
}

// [PATCH] Faq 변경
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
    onSuccess: (data, variables) => {
      console.log("☑️Faq 변경 성공: ", data);
      ToastAndroid.showWithGravity(
        "Faq가 성공적으로 변경되었습니다.",
        ToastAndroid.SHORT,
        ToastAndroid.TOP
      );
      queryClient.invalidateQueries({ queryKey: ["faqList"] });
      queryClient.invalidateQueries({
        queryKey: ["faqDetail", variables.faqId],
      });
    },
    onError: (error) => {
      console.log("✖️Faq 변경 실패: ", error);
      Alert.alert("Faq 변경 실패", "잠시 후 다시 시도해주세요.");
    },
  });
}

// [DELETE] Faq 삭제
export function useDeleteFaq() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (faqId: number) => deleteFaq(faqId),
    onSuccess: () => {
      console.log("☑️Faq 삭제 성공");
      ToastAndroid.showWithGravity(
        "Faq가 성공적으로 삭제되었습니다.",
        ToastAndroid.SHORT,
        ToastAndroid.TOP
      );
      queryClient.invalidateQueries({ queryKey: ["faqList"] });
    },
    onError: (error) => {
      console.log("✖️Faq 삭제 실패: ", error);
      Alert.alert("Faq 삭제 실패", "잠시 후 다시 시도해주세요.");
    },
  });
}

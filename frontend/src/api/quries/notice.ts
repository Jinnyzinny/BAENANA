import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Alert, ToastAndroid } from "react-native";
import {
  addNotice,
  deleteNotice,
  editNotice,
  getNoticeDetail,
  getNoticeList,
} from "../notice";

// [GET] 공지사항 목록 조회
export function useGetNoticeList() {
  return useQuery({
    queryKey: ["noticeList"],
    queryFn: () => getNoticeList(),
  });
}

// [GET] 공지사항 상세 조회
export function useGetNoticeDetail(noticeId: number) {
  return useQuery({
    queryKey: ["noticeDetail", noticeId],
    queryFn: () => getNoticeDetail(noticeId),
  });
}

// 관리자

// [POST] 공지사항 등록
export function useAddNotice() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ title, content }: { title: string; content: string }) =>
      addNotice(title, content),
    onSuccess: (data) => {
      console.log("☑️공지사항 등록 성공: ", data);
      ToastAndroid.showWithGravity(
        "공지사항이 성공적으로 등록되었습니다.",
        ToastAndroid.SHORT,
        ToastAndroid.TOP
      );
      queryClient.invalidateQueries({ queryKey: ["noticeList"] });
    },
    onError: (error) => {
      console.log("✖️공지사항 등록 실패: ", error);
      Alert.alert("공지사항 등록 실패", "잠시 후 다시 시도해주세요.");
    },
  });
}

// [PATCH] 공지사항 변경
export function useEditNotice() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      noticeId,
      title,
      content,
    }: {
      noticeId: number;
      title?: string;
      content?: string;
    }) => editNotice(noticeId, title, content),
    onSuccess: (data, variables) => {
      console.log("☑️공지사항 변경 성공: ", data);
      ToastAndroid.showWithGravity(
        "공지사항이 성공적으로 변경되었습니다.",
        ToastAndroid.SHORT,
        ToastAndroid.TOP
      );
      queryClient.invalidateQueries({ queryKey: ["noticeList"] });
      queryClient.invalidateQueries({
        queryKey: ["noticeDetail", variables.noticeId],
      });
    },
    onError: (error) => {
      console.log("✖️공지사항 변경 실패: ", error);
      Alert.alert("공지사항 변경 실패", "잠시 후 다시 시도해주세요.");
    },
  });
}

// [DELETE] 공지사항 삭제
export function useDeleteNotice() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ noticeId }: { noticeId: number }) => deleteNotice(noticeId),
    onSuccess: () => {
      console.log("☑️공지사항 삭제 성공");
      ToastAndroid.showWithGravity(
        "공지사항이 성공적으로 삭제되었습니다.",
        ToastAndroid.SHORT,
        ToastAndroid.TOP
      );
      queryClient.invalidateQueries({ queryKey: ["noticeList"] });
    },
    onError: (error) => {
      console.log("✖️공지사항 삭제 실패: ", error);
      Alert.alert("공지사항 삭제 실패", "잠시 후 다시 시도해주세요.");
    },
  });
}

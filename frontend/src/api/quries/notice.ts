import { useQuery } from "@tanstack/react-query";
import { useApiMutation } from "../../hooks/useApiMutation";
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
  return useApiMutation({
    mutationFn: ({ title, content }: { title: string; content: string }) =>
      addNotice(title, content),
    keysToInvalidate: [["noticeList"]],
    successMessage: "공지사항이 성공적으로 등록되었습니다.",
    errorMessage: "공지사항 등록 실패",
  });
}

// [PATCH] 공지사항 변경
export function useEditNotice() {
  return useApiMutation({
    mutationFn: ({
      noticeId,
      title,
      content,
    }: {
      noticeId: number;
      title?: string;
      content?: string;
    }) => editNotice(noticeId, title, content),
    keysToInvalidate: [
      ["noticeList"],
      ({ noticeId }) => ["noticeDetail", noticeId],
    ],
    successMessage: "공지사항이 성공적으로 변경되었습니다.",
    errorMessage: "공지사항 변경 실패",
  });
}

// [DELETE] 공지사항 삭제
export function useDeleteNotice() {
  return useApiMutation({
    mutationFn: ({ noticeId }: { noticeId: number }) => deleteNotice(noticeId),
    keysToInvalidate: [["noticeList"]],
    successMessage: "공지사항이 성공적으로 삭제되었습니다.",
    errorMessage: "공지사항 삭제 실패",
  });
}

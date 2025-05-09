import authClient from "./authClient";

// 공지사항 목록 조회
export async function getNoticeList() {
  try {
    const response = await authClient.get("/notifications");
    console.log("공지사항 목록 조회 성공: ", response.data);
    return response.data;
  } catch (error: unknown) {
    console.error("공지사항 목록 조회 실패: ", error);
  }
}

// 공지사항 상세 조회
export async function getNoticeDetail(noticeId: number) {
  try {
    const response = await authClient.get(`/notifications/${noticeId}`);
    console.log("공지사항 상세 조회 성공: ", response.data);
    return response.data;
  } catch (error: unknown) {
    console.error("공지사항 상세 조회 실패: ", error);
  }
}

// [관리자] 공지사항 등록
export async function addNotice() {
  try {
    const response = await authClient.post("/notifications/admin");
    console.log("[관리자] 공지사항 등록 성공: ", response.data);
    return response.data;
  } catch (error: unknown) {
    console.error("[관리자] 공지사항 등록 실패: ", error);
  }
}

// [관리자] 공지사항 변경
export async function editNotice(noticeId: number) {
  try {
    const response = await authClient.patch(`/notifications/admin/${noticeId}`);
    console.log("[관리자] 공지사항 변경 성공: ", response.data);
    return response.data;
  } catch (error: unknown) {
    console.error("[관리자] 공지사항 변경 실패: ", error);
  }
}

// [관리자] 공지사항 삭제
export async function deleteNotice(noticeId: number) {
  try {
    const response = await authClient.delete(
      `/notifications/admin/${noticeId}`
    );
    console.log("[관리자] 공지사항 삭제 성공: ", response.data);
    return response.data;
  } catch (error: unknown) {
    console.error("[관리자] 공지사항 삭제 실패: ", error);
  }
}

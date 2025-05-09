import authClient from "./authClient";

// FAQ 목록 조회
export async function getFaqList() {
  try {
    const response = await authClient.get("/api/faq");
    console.log("FAQ 목록 조회 성공: ", response.data);
    return response.data;
  } catch (error: unknown) {
    console.error("FAQ 목록 조회 실패: ", error);
  }
}

// FAQ 상세 조회
export async function getFaqDetail(faqId: number) {
  try {
    const response = await authClient.get(`/api/faq/${faqId}`);
    console.log("FAQ 상세 조회 성공: ", response.data);
    return response.data;
  } catch (error: unknown) {
    console.error("FAQ 상세 조회 실패: ", error);
  }
}

// [관리자] FAQ 작성
export async function addFaq() {
  try {
    const response = await authClient.post("/faq/admin");
    console.log("[관리자] FAQ 작성 성공: ", response.data);
    return response.data;
  } catch (error: unknown) {
    console.error("[관리자] FAQ 작성 실패: ", error);
  }
}

// [관리자] FAQ 변경
export async function editFaq(faqId: number) {
  try {
    const response = await authClient.patch(`/faq/admin/${faqId}`);
    console.log("[관리자] FAQ 변경 성공: ", response.data);
    return response.data;
  } catch (error: unknown) {
    console.error("[관리자] FAQ 변경 실패: ", error);
  }
}

// [관리자] FAQ 삭제
export async function deleteFaq(faqId: number) {
  try {
    const response = await authClient.delete(`/faq/admin/${faqId}`);
    console.log("[관리자] FAQ 삭제 성공: ", response.data);
    return response.data;
  } catch (error: unknown) {
    console.error("[관리자] FAQ 삭제 실패: ", error);
  }
}

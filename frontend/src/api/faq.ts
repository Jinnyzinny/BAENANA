import { Faq, FaqDetail } from "../types/Faq";
import authClient from "./client/authClient";

// Faq 목록 조회
export async function getFaqList(): Promise<Faq[]> {
  try {
    const response = await authClient.get("/faq");
    console.log("Faq 목록 조회 성공: ", response.data.data);
    return response.data.data;
  } catch (error: unknown) {
    console.error("Faq 목록 조회 실패: ", error);
    throw error;
  }
}

// Faq 상세 조회
export async function getFaqDetail(faqId: number): Promise<FaqDetail> {
  try {
    const response = await authClient.get(`/faq/${faqId}`);
    console.log("Faq 상세 조회 성공: ", response.data.data);
    return response.data.data;
  } catch (error: unknown) {
    console.error("Faq 상세 조회 실패: ", error);
    throw error;
  }
}

// [관리자] Faq 작성
export async function addFaq(question: string, answer: string) {
  try {
    const response = await authClient.post("/faq/admin", { question, answer });
    console.log("[관리자] Faq 작성 성공: ", response.data);
    return response.data;
  } catch (error: unknown) {
    console.error("[관리자] Faq 작성 실패: ", error);
    throw error;
  }
}

// [관리자] Faq 변경
export async function editFaq(
  faqId: number,
  question?: string,
  answer?: string
) {
  try {
    const payload = {
      ...(question !== undefined && { question }),
      ...(answer !== undefined && {
        answer,
      }),
    };
    const response = await authClient.patch(`/faq/admin/${faqId}`, payload);
    console.log("[관리자] Faq 변경 성공: ", response.data);
    return response.data;
  } catch (error: unknown) {
    console.error("[관리자] Faq 변경 실패: ", error);
    throw error;
  }
}

// [관리자] Faq 삭제
export async function deleteFaq(faqId: number) {
  try {
    const response = await authClient.delete(`/faq/admin/${faqId}`);
    console.log("[관리자] Faq 삭제 성공: ", response.data);
    return response.data;
  } catch (error: unknown) {
    console.error("[관리자] Faq 삭제 실패: ", error);
    throw error;
  }
}

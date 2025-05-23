import { AdminInquiry, Inquiry, InquiryDetail } from "../types/Inquiry";
import authClient from "./client/authClient";

// 사용자
// [사용자] 문의사항 등록
export async function addInquiry(title: string, questionContent: string) {
  try {
    const response = await authClient.post("/inquiries", {
      title,
      questionContent,
    });
    console.log("[사용자] 문의사항 등록 성공: ", response.data);
    return response.data;
  } catch (error: unknown) {
    console.error("[사용자] 문의사항 등록 실패: ", error);
    return null;
  }
}

// [사용자] 문의사항 목록 조회
export async function getInquiryList(): Promise<Inquiry[]> {
  try {
    const response = await authClient.get("/inquiries/my");
    console.log(
      "[사용자] 문의사항 목록 조회 성공: ",
      response.data.data.content
    );
    return response.data.data.content;
  } catch (error: unknown) {
    console.error("[사용자] 문의사항 목록 조회 실패: ", error);
    return null;
  }
}

// [사용자] 문의사항 상세 조회
export async function getInquiryDetail(
  inquiryId: number
): Promise<InquiryDetail> {
  try {
    const response = await authClient.get(`/inquiries/${inquiryId}`);
    console.log("[사용자] 문의사항 상세 조회 성공: ", response.data.data);
    return response.data.data;
  } catch (error: unknown) {
    console.error("[사용자] 문의사항 상세 조회 실패: ", error);
    return null;
  }
}

// [사용자] 문의사항 변경
export async function editInquiry(
  inquiryId: number,
  title?: string,
  questionContent?: string
) {
  try {
    const payload = {
      ...(questionContent !== undefined && { questionContent }),
      ...(title !== undefined && { title }),
    };
    const response = await authClient.patch(`/inquiries/${inquiryId}`, payload);
    console.log("[사용자] 문의사항 변경 성공: ", response.data);
    return response.data;
  } catch (error: unknown) {
    console.error("[사용자] 문의사항 변경 실패: ", error);
    return null;
  }
}

// [사용자] 문의사항 삭제
export async function deleteInquiry(inquiryId: number) {
  try {
    const response = await authClient.delete(`/inquiries/${inquiryId}`);
    console.log("[사용자] 문의사항 삭제 성공: ", response.data);
    return response.data;
  } catch (error: unknown) {
    console.error("[사용자] 문의사항 삭제 실패: ", error);
    return null;
  }
}

// 관리자
// [관리자] 문의사항 목록 조회
export async function getAdminInquiryList(): Promise<AdminInquiry[]> {
  try {
    const response = await authClient.get("/inquiries/admin");
    console.log(
      "[관리자] 문의사항 목록 조회 성공: ",
      response.data.data.content
    );
    return response.data.data.content;
  } catch (error: unknown) {
    console.error("[관리자] 문의사항 목록 조회 실패: ", error);
    return null;
  }
}

// [관리자] 문의사항 상세 조회
export async function getAdminInquiryDetail(
  inquiryId: number
): Promise<InquiryDetail> {
  try {
    const response = await authClient.get(`/inquiries/admin/${inquiryId}`);
    console.log("[관리자] 문의사항 상세 조회 성공: ", response.data.data);
    return response.data.data;
  } catch (error: unknown) {
    console.error("[관리자] 문의사항 상세 조회 실패: ", error);
    return null;
  }
}

// [관리자] 문의사항 답변 등록
export async function addAdminInquiry(
  inquiryId: number,
  answerContent: string
) {
  try {
    const response = await authClient.post(
      `/inquiries/admin/${inquiryId}/answer`,
      { answerContent }
    );
    console.log("[관리자] 문의사항 답변 등록 성공: ", response.data);
    return response.data;
  } catch (error: unknown) {
    console.error("[관리자] 문의사항 답변 등록 실패: ", error);
    return null;
  }
}

// [관리자] 문의사항 답변 변경
export async function editAdminInquiry(
  inquiryId: number,
  answerContent: string
) {
  try {
    const response = await authClient.patch(
      `/inquiries/admin/${inquiryId}/answer`,
      { answerContent }
    );
    console.log("[관리자] 문의사항 답변 변경 성공: ", response.data);
    return response.data;
  } catch (error: unknown) {
    console.error("[관리자] 문의사항 답변 변경 실패: ", error);
    return null;
  }
}

// [관리자] 문의사항 답변 삭제
export async function deleteAdminInquiry(inquiryId: number) {
  try {
    const response = await authClient.delete(
      `inquiries/admin/${inquiryId}/answer`
    );
    console.log("[관리자] 문의사항 답변 삭제 성공: ", response.data);
    return response.data;
  } catch (error: unknown) {
    console.error("[관리자] 문의사항 답변 삭제 실패: ", error);
    return null;
  }
}

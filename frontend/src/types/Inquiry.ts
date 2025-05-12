export type Inquiry = {
  inquiryId: number;
  title: string;
  questionDate: string;
  status: "PENDING" | "ANSWERED";
};

export type InquiryDetail = Inquiry & {
  userId: number;
  questionContent: string;
  answerContent: string;
  answerDate: string;
};

export type AdminInquiry = Inquiry & {
  userId: number;
};

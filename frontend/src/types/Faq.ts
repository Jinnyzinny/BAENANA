export type Faq = {
  faqId: number;
  question: string;
  createdAt: string;
};

export type FaqDetail = Faq & {
  answer: string;
};

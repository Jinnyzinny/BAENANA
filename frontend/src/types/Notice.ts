export type Notice = {
  notificationId: number;
  title: string;
  createdAt: string;
};

export type NoticeDetail = Notice & {
  content: string;
};

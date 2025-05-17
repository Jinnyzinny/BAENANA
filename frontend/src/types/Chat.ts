export type Button = {
  id: string;
  text: string;
};

export type SessionId = {
  sessionId: string;
  message: string;
  source: string;
  buttons: Button[];
  userMessage: string | null;
  createdAt: string;
};

export type ChatList = {
  sessionId: string;
  lastMessage: string;
  lastTime: string;
};

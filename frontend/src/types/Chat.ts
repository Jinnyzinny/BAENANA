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

export type Chat = {
  sender: string;
  message: string;
  createdAt: string;
};

export type ChatData = {
  userMessage?: string | null;
  message: string;
  buttons?: { id: string; text: string }[];
};

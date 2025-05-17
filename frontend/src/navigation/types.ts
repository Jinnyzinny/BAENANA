export type RootStackParamList = {
  Main: undefined;
  Settings: undefined;
};

export type BottomTabParamList = {
  Home: undefined;
  Calendar: undefined;
  Test: undefined;
  Report: undefined;
  Chatbot: undefined;
};

export type TestStackParamList = {
  TestInfo: undefined;
  Camera: undefined;
};

export type ReportStackParamList = {
  Total: undefined;
  Period: undefined;
  Medicine: undefined;
};

export type ChatbotDrawerParamList = {
  Chat: { chatId?: string } | undefined;
};

export type SettingsStackParamList = {
  SettingsList: undefined;
  HealthInfo: undefined;
  Notice: undefined;
  Faq: undefined;
  Inquriy: undefined;
};

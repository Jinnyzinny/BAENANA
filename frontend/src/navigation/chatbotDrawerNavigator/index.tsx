import { createDrawerNavigator } from "@react-navigation/drawer";
import { ChatDrawer } from "../../components/chatbot/chatDrawer";
import { ChatbotScreen } from "../../screens/chatbotScreen";

export type ChatbotDrawerParamList = {
  Chat: { chatId?: string } | undefined;
};

export function ChatbotDrawerNavigator() {
  const Drawer = createDrawerNavigator<ChatbotDrawerParamList>();

  return (
    <Drawer.Navigator
      drawerContent={(props) => <ChatDrawer {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Drawer.Screen name="Chat" component={ChatbotScreen} />
    </Drawer.Navigator>
  );
}

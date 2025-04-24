import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  BookText,
  Bot,
  CalendarCheck,
  ChartColumnIncreasing,
  Home,
} from "lucide-react-native";
import { CalendarScreen } from "../../screens/calendarScreen";
import { HealthInfoScreen } from "../../screens/healthInfoScreen";
import { HomeScreen } from "../../screens/homeScreen";
import { ReportScreen } from "../../screens/reportScreen";
import { ChatbotDrawerNavigator } from "../chatbotDrawerNavigator";

export function BottomTabNavigator() {
  const Tab = createBottomTabNavigator();
  const size: number = 20;
  const stroke: number = 2;

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 70,
          paddingTop: 6,
          backgroundColor: "#F5F5F5",
          shadowColor: "#D4D4D4",
        },
        tabBarActiveTintColor: "#A684FF",
        tabBarInactiveTintColor: "#A1A1A1",
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "홈",
          tabBarIcon: ({ color }) => (
            <Home color={color} size={size} strokeWidth={stroke} />
          ),
        }}
      />
      <Tab.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{
          title: "캘린더",
          tabBarIcon: ({ color }) => (
            <CalendarCheck color={color} size={size} strokeWidth={stroke} />
          ),
        }}
      />
      <Tab.Screen
        name="Report"
        component={ReportScreen}
        options={{
          title: "분석",
          tabBarIcon: ({ color }) => (
            <ChartColumnIncreasing
              color={color}
              size={size}
              strokeWidth={stroke}
            />
          ),
        }}
      />
      <Tab.Screen
        name="HealthInfo"
        component={HealthInfoScreen}
        options={{
          title: "건강정보",
          tabBarIcon: ({ color }) => (
            <BookText color={color} size={size} strokeWidth={stroke} />
          ),
        }}
      />
      <Tab.Screen
        name="Chatbot"
        component={ChatbotDrawerNavigator}
        options={{
          title: "챗봇",
          tabBarIcon: ({ color }) => (
            <Bot color={color} size={size} strokeWidth={stroke} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

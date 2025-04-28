import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  Bot,
  CalendarCheck,
  ChartColumnIncreasing,
  Focus,
  Home,
} from "lucide-react-native";
import { CalendarScreen } from "../../screens/calendarScreen";
import { HomeScreen } from "../../screens/homeScreen";
import { ChatbotDrawerNavigator } from "../chatbotDrawerNavigator";
import { TestStackNavigator } from "../testStackNavigator";
import { ReportStackNavigator } from "../reportStackNavigator";

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
        name="Test"
        component={TestStackNavigator}
        options={{
          title: "검사",
          tabBarIcon: ({ color }) => (
            <Focus color={color} size={size} strokeWidth={stroke} />
          ),
        }}
      />
      <Tab.Screen
        name="Report"
        component={ReportStackNavigator}
        options={{
          title: "기록",
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

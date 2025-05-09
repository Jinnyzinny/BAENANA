import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BottomTabNavigator } from "../bottomTabNavigator";
import { SettingsStackNavigator } from "../settingsStackNavigator";

export function RootStackNavigator() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* 하단 탭 */}
      <Stack.Screen name="Main" component={BottomTabNavigator} />
      {/* 설정 */}
      <Stack.Screen name="Settings" component={SettingsStackNavigator} />
    </Stack.Navigator>
  );
}

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BottomTabNavigator } from "../bottomTabNavigator";
import { SettingsStackNavigator } from "../settingsStackNavigator";

export function RootStackNavigator() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={BottomTabNavigator} />
      <Stack.Screen name="SettingsStack" component={SettingsStackNavigator} />
    </Stack.Navigator>
  );
}

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HealthInfoScreen } from "../../screens/healthInfoScreen";
import { SettingsScreen } from "../../screens/settingsScreen";

export function SettingsStackNavigator() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="HealthInfo" component={HealthInfoScreen} />
    </Stack.Navigator>
  );
}

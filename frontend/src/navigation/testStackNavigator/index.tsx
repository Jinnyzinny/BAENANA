import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TestInfoScreen } from "../../screens/testInfoScreen";
import { CameraScreen } from "../../screens/cameraScreen";

export function TestStackNavigator() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* 검사 관련 안내사항 */}
      <Stack.Screen name="TestInfo" component={TestInfoScreen} />
      {/* 카메라 */}
      <Stack.Screen name="Camera" component={CameraScreen} />
    </Stack.Navigator>
  );
}

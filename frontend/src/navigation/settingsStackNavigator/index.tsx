import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HealthInfoScreen } from "../../screens/healthInfoScreen";
import { SettingsScreen } from "../../screens/settingsScreen";
import { NoticeScreen } from "../../screens/noticeScreen";
import { FaqScreen } from "../../screens/faqScreen";
import { InquriyScreen } from "../../screens/inquriyScreen";

export function SettingsStackNavigator() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* 설정 전체 */}
      <Stack.Screen name="SettingsList" component={SettingsScreen} />
      {/* 건강 정보 */}
      <Stack.Screen name="HealthInfo" component={HealthInfoScreen} />
      {/* 공지사항 */}
      <Stack.Screen name="Notice" component={NoticeScreen} />
      {/* 자주 묻는 질문 */}
      <Stack.Screen name="Faq" component={FaqScreen} />
      {/* 문의사항 */}
      <Stack.Screen name="Inquriy" component={InquriyScreen} />
    </Stack.Navigator>
  );
}

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ReportScreen } from "../../screens/reportScreen";
import { PeriodScreen } from "../../screens/periodScreen";
import { MedicineScreen } from "../../screens/medicineScreen";

export function ReportStackNavigator() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* 전체 리포트 */}
      <Stack.Screen name="Total" component={ReportScreen} />
      {/* 월경 주기 전체 */}
      <Stack.Screen name="Period" component={PeriodScreen} />
      {/* 약 전체 */}
      <Stack.Screen name="Medicine" component={MedicineScreen} />
    </Stack.Navigator>
  );
}

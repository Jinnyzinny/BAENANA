import { SafeAreaView } from "react-native-safe-area-context";
import { HeaderLogo } from "../../components/common/headerLogo";
import { Alert } from "../../components/common/alert";
import { DonutChart } from "../../components/home/donutChart";
import { View } from "react-native";
import { Button } from "../../components/common/button";

export function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 relative">
      <HeaderLogo />
      <View className="flex-1 relative mx-5">
        {/* 알림 메시지 */}
        <View className="gap-3">
          <Alert
            type="hospital"
            title="병원 예약 알림 메시지"
            content="n월 n일 n시 ㅇㅇ산부인과 예약이 있습니다."
          />
          <Alert
            type="pill"
            title="복용약 알림 메시지"
            content="오후 8시에 알림이 울릴 예정입니다."
          />
        </View>

        {/* 도넛 차트 */}
        <View className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <DonutChart percentage={70} dDay={7} />
        </View>
        {/* 버튼 */}
        <View className="w-full absolute bottom-28 -translate-y-1/2">
          <View className="mx-28">
            <Button fill={false} content="입력" onPress={() => {}} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

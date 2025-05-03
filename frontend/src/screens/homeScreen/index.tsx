import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AlertMessage } from "../../components/common/alertMessage";
import { HeaderLogo } from "../../components/common/headerLogo";
import { DonutChart } from "../../components/home/donutChart";
import { CustomButton } from "../../components/common/customButton";

export function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 relative">
      <HeaderLogo before={false} settings={true} />
      <View className="flex-1 relative mx-5">
        {/* 알림 메시지 */}
        <View className="gap-3">
          <AlertMessage
            type="hospital"
            title="병원 예약이 있어요"
            content="4월 18일 14시 더블유 여성병원"
          />
          <AlertMessage
            type="medicine"
            title="복용약 알림 메시지"
            content="오후 8시에 알림이 울릴 예정입니다."
          />
        </View>

        {/* 도넛 차트 */}
        <View className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <DonutChart percentage={70} dDay={7} />
        </View>
        {/* 버튼 */}
        <View className="w-full absolute bottom-16 -translate-y-1/2">
          <View className="mx-24">
            <CustomButton
              fill={false}
              content="월경일 입력"
              onPress={() => {}}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

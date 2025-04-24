import { SafeAreaView } from "react-native-safe-area-context";
import { HeaderLogo } from "../../components/common/headerLogo";
import { CurrentPeriod } from "../../components/report/currentPeriod";
import { Alert } from "../../components/common/alert";
import { ScrollView, View } from "react-native";
import { BeforePeriod } from "../../components/report/beforePeriod";
import { Button } from "../../components/common/button";
import { PillInfo } from "../../components/report/pillInfo";

export function ReportScreen() {
  return (
    <SafeAreaView>
      <HeaderLogo />
      <ScrollView>
        <View className="gap-3 mx-5 pb-16">
          <Alert
            type="warn"
            title="최근 생리 주기가 불규칙합니다."
            content="(현재 주기가 불규칙한 사용자에게만 보일 메시지)"
          />
          <View className="flex-row gap-3">
            <BeforePeriod type="warn" title="생리 주기" date={32} />
            <BeforePeriod type="normal" title="생리 기간" date={6} />
          </View>
          <CurrentPeriod />
          <PillInfo />
          <Button fill={true} content="PDF로 저장" onPress={() => {}} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

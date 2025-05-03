import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { HeaderLogo } from "../../components/common/headerLogo";
import { BeforePeriod } from "../../components/report/beforePeriod";
import { CurrentPeriod } from "../../components/report/currentPeriod";
import { Summary } from "../../components/report/summary";
import { MedicineInfo } from "../../components/report/medicineInfo";
import { OvulationInfo } from "../../components/report/ovulationInfo";
import { AlertMessage } from "../../components/common/alertMessage";
import { CustomButton } from "../../components/common/customButton";

export function ReportScreen() {
  return (
    <SafeAreaView>
      <HeaderLogo before={false} settings={true} />
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 32 }}>
        <View className="gap-3 mx-5 pb-16">
          {/* 알림 메시지 */}
          <AlertMessage
            type="warn"
            title="최근 월경 주기가 불규칙합니다."
            content="최근 3개월 월경 주기가 불규칙합니다."
          />

          {/* 월경 주기 / 월경 기간 */}
          <View className="flex-row gap-3">
            <BeforePeriod type="warn" title="월경 주기" date={32} />
            <BeforePeriod type="normal" title="월경 기간" date={6} />
          </View>

          {/* 배란테스트 결과 컴포넌트 구현 필요 */}
          <OvulationInfo />

          {/* 최근 주기 */}
          <CurrentPeriod />

          {/* 최근 복용약 */}
          <MedicineInfo />

          {/* 이번 달 월경 출혈량 / 최근 복용약 / 이번 달 월경 증상 */}
          <Summary type1="warn" type2="normal" />

          <View />
          {/* 버튼 */}
          <CustomButton fill={true} content="PDF로 저장" onPress={() => {}} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

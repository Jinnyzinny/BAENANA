import { useRef, useState } from "react";
import {
  InteractionManager,
  ScrollView,
  useWindowDimensions,
  View,
} from "react-native";
import { Modalize } from "react-native-modalize";
import { SafeAreaView } from "react-native-safe-area-context";
import { Monthly } from "../../components/calendar/monthly";
import { PeriodBottomSheet } from "../../components/calendar/periodBottomSheet";
import { ScheduleList } from "../../components/calendar/scheduleList";
import { ScheduleModal } from "../../components/calendar/scheduleModal";
import { HeaderLogo } from "../../components/common/headerLogo";

export function CalendarScreen() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedType, setSelectedType] = useState<
    "period" | "hospital" | "medicine" | null
  >(null);
  const sheetRef = useRef<Modalize>(null);
  const { height } = useWindowDimensions();

  function handleDatePress(date: string) {
    setSelectedDate(date);
    setModalVisible(true);
  }

  function handleBottomSheet(type: "period" | "hospital" | "medicine" | null) {
    setSelectedType(type);
    setModalVisible(false);
    InteractionManager.runAfterInteractions(() => {
      sheetRef.current?.open();
    });
  }

  return (
    <>
      <SafeAreaView className="flex-1">
        <HeaderLogo before={false} settings={true} />
        <ScrollView>
          <View className="flex-1 mx-5 gap-3">
            <Monthly onDateSelect={handleDatePress} />
            <ScheduleList />
          </View>
        </ScrollView>
      </SafeAreaView>

      {/* SafeAreaView 외부 */}

      {/* 일정 및 입력 버튼 모달 */}
      <ScheduleModal
        visible={modalVisible}
        date={selectedDate}
        onClose={() => setModalVisible(false)}
        handleBottomSheet={handleBottomSheet}
      />

      {/* 바텀 시트 */}
      {selectedType === "period" && (
        // 주기 입력
        <PeriodBottomSheet height={height} sheetRef={sheetRef} />
      )}
    </>
  );
}

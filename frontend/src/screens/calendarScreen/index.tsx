import { useState } from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Monthly } from "../../components/calendar/monthly";
import { ScheduleList } from "../../components/calendar/scheduleList";
import { ScheduleModal } from "../../components/calendar/scheduleModal";
import { HeaderLogo } from "../../components/common/headerLogo";

export function CalendarScreen() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleDatePress = (date: string) => {
    setSelectedDate(date);
    setModalVisible(true);
  };

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

      {/* 여기!! SafeAreaView 바깥!! */}
      <ScheduleModal
        visible={modalVisible}
        date={selectedDate}
        onClose={() => setModalVisible(false)}
      />
    </>
  );
}

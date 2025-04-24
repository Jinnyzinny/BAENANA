import { SafeAreaView } from "react-native-safe-area-context";
import { HeaderLogo } from "../../components/common/headerLogo";
import { Monthly } from "../../components/calendar/monthly";
import { ScrollView, View } from "react-native";
import { ScheduleList } from "../../components/calendar/scheduleList";
import { ScheduleModal } from "../../components/calendar/scheduleModal";
import { useState } from "react";

export function CalendarScreen() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [inputText, setInputText] = useState("");

  const handleDatePress = (date: string) => {
    setSelectedDate(date);
    setModalVisible(true);
  };

  const handleSave = () => {
    console.log("저장:", selectedDate, inputText);
    setModalVisible(false);
    setInputText("");
  };

  return (
    <SafeAreaView>
      <HeaderLogo />
      <ScrollView>
        <View className="flex-1 mx-5 gap-3">
          {/* 캘린더 */}
          <Monthly onDateSelect={handleDatePress} />
          <View>
            <ScheduleList />
          </View>
        </View>
      </ScrollView>
      <ScheduleModal
        visible={modalVisible}
        date={selectedDate}
        inputText={inputText}
        onChangeText={setInputText}
        onClose={() => setModalVisible(false)}
        onSave={handleSave}
      />
    </SafeAreaView>
  );
}

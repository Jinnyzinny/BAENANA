import { View } from "react-native";
import { Calendar } from "react-native-calendars";

export function Monthly({
  onDateSelect,
}: {
  onDateSelect: (date: string) => void;
}) {
  return (
    <View>
      <Calendar
        onDayPress={(day) => {
          onDateSelect(day.dateString);
        }}
        style={{
          borderRadius: 20,
          overflow: "hidden",
          paddingBottom: 30,
          shadowColor: "#D4D4D4",
        }}
        theme={{
          selectedDayBackgroundColor: "#DDD6FF",
          selectedDayTextColor: "#FFFFFF",
          todayTextColor: "#A684FF",
          arrowColor: "#A684FF",
          dotColor: "#A684FF",
          selectedDotColor: "#FFFFFF",
          monthTextColor: "#A684FF",
          textDayHeaderFontSize: 12,
        }}
      />
    </View>
  );
}

import { ChevronDown } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { InteractionManager, Text, TouchableOpacity, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

export function DateDropdown({
  year,
  month,
  day,
  onChange,
}: {
  year: number;
  month: number;
  day: number;
  onChange: (date: Date) => void;
}) {
  const [date, setDate] = useState(new Date(year, month - 1, day));
  const [isPickerVisible, setPickerVisible] = useState(false);

  useEffect(() => {
    const newDate = new Date(year, month - 1, day);
    setDate(newDate);
    onChange(newDate);
  }, [year, month, day]);

  const handleConfirm = (selectedDate: Date) => {
    setPickerVisible(false);
    setDate(selectedDate);
    onChange(selectedDate);
  };

  return (
    <View className="flex-1 pb-3 border-b border-neutral-400">
      <TouchableOpacity
        onPress={() => {
          InteractionManager.runAfterInteractions(() => {
            setPickerVisible(true);
          });
        }}
        className="flex-row mx-3 items-center justify-between"
      >
        <Text className="text-lg font-bold text-violet-400">
          {date.toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          })}
        </Text>
        <ChevronDown size={18} color="#7C3AED" />
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isPickerVisible}
        mode="date"
        date={date}
        onConfirm={handleConfirm}
        onCancel={() => setPickerVisible(false)}
      />
    </View>
  );
}

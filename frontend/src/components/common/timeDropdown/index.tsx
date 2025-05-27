import { ChevronDown } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
  InteractionManager,
  Keyboard,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Portal } from "react-native-portalize";

export function TimeDropdown({
  onChange,
  hour,
  minute,
}: {
  onChange: (time: Date) => void;
  hour?: number;
  minute?: number;
}) {
  const getInitialTime = () => {
    const now = new Date();
    return new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      hour ?? 9,
      minute ?? 0
    );
  };

  const [time, setTime] = useState(getInitialTime());
  const [isPickerVisible, setPickerVisible] = useState(false);

  useEffect(() => {
    const updatedTime = getInitialTime();
    setTime(updatedTime);
    onChange(updatedTime);
  }, [hour, minute]);

  const handleConfirm = (selectedTime: Date) => {
    setPickerVisible(false);
    setTime(selectedTime);
    onChange(selectedTime);
  };

  return (
    <View className="flex-1 pb-3 border-b border-neutral-400">
      <TouchableOpacity
        onPress={() => {
          Keyboard.dismiss();
          InteractionManager.runAfterInteractions(() => {
            setTimeout(() => {
              setPickerVisible(true);
            }, 50);
          });
        }}
        className="flex-row mx-3 items-center justify-between"
      >
        <Text className="text-lg font-bold text-violet-400">
          {time.toLocaleTimeString("ko-KR", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Text>
        <ChevronDown size={18} color="#7C3AED" />
      </TouchableOpacity>
      <Portal>
        <DateTimePickerModal
          isVisible={isPickerVisible}
          mode="time"
          date={time}
          onConfirm={handleConfirm}
          onCancel={() => setPickerVisible(false)}
        />
      </Portal>
    </View>
  );
}

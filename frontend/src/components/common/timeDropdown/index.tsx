import { ChevronDown } from "lucide-react-native";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import DatePicker from "react-native-date-picker";

export function TimeDropdown({
  title,
  onChange,
  hour = 9,
  minute = 0,
}: {
  title: string;
  onChange: (time: Date) => void;
  hour?: number;
  minute?: number;
}) {
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState(new Date(0, 0, 0, hour, minute));

  return (
    <View className="flex-1 pb-3 border-b border-neutral-400">
      <TouchableOpacity
        onPress={() => setOpen(true)}
        className="flex-row mx-3 items-center justify-between"
      >
        <Text className="text-lg font-bold text-violet-400">
          {time.toLocaleTimeString("ko-KR", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Text>
        <ChevronDown color="#A3A3A3" size={20} />
      </TouchableOpacity>

      <DatePicker
        modal
        open={open}
        date={time}
        mode="time"
        locale="ko"
        title={title}
        confirmText="확인"
        cancelText="취소"
        onConfirm={(selectedTime) => {
          setOpen(false);
          setTime(selectedTime);
          onChange(selectedTime);
        }}
        onCancel={() => setOpen(false)}
        is24hourSource="locale"
      />
    </View>
  );
}

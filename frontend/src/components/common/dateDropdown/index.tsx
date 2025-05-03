import { ChevronDown } from "lucide-react-native";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import DatePicker from "react-native-date-picker";

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
  const [open, setOpen] = useState(false);

  return (
    <View className="flex-1 pb-3 border-b border-neutral-400">
      <TouchableOpacity
        onPress={() => setOpen(true)}
        className="flex-row mx-3 items-center justify-between"
      >
        <Text className="text-lg font-bold text-violet-400">
          {date.toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            weekday: "short",
          })}
        </Text>
        <ChevronDown color="#A3A3A3" size={20} />
      </TouchableOpacity>

      <DatePicker
        modal
        open={open}
        date={date}
        mode="date"
        locale="ko"
        title="병원 예약 일시"
        confirmText="확인"
        cancelText="취소"
        onConfirm={(selectedDate) => {
          setOpen(false);
          setDate(selectedDate);
          onChange(selectedDate);
        }}
        onCancel={() => setOpen(false)}
      />
    </View>
  );
}

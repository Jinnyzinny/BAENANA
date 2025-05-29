import { ChevronDown, ChevronUp } from "lucide-react-native";
import React, { useState } from "react";
import { Pressable, TextInput, View } from "react-native";

export function SelectNumber({
  initial,
  onChange,
}: {
  initial: number;
  onChange: (val: number) => void;
}) {
  const [value, setValue] = useState(Math.min(Math.max(initial ?? 10, 0), 100));
  const [input, setInput] = useState(value.toFixed(1));

  const handleChange = (direction: "up" | "down") => {
    const step = 0.1;
    const nextValue = direction === "up" ? value + step : value - step;
    const withinRange = direction === "up" ? value < 100 : value > 0;

    if (!withinRange) return;

    const rounded = parseFloat(nextValue.toFixed(1));
    setValue(rounded);
    setInput(rounded.toFixed(1));
    onChange?.(rounded);
  };

  const handleInputBlur = () => {
    const numeric = parseFloat(input);
    if (!isNaN(numeric)) {
      const clamped = Math.max(0, Math.min(numeric, 100));
      const rounded = parseFloat(clamped.toFixed(1));
      setValue(rounded);
      setInput(rounded.toFixed(1));
      onChange?.(rounded);
    } else {
      setInput(value.toFixed(1));
    }
  };

  const handleInputChange = (text: string) => {
    const regex = /^\d*\.?\d{0,1}$/;
    if (regex.test(text)) {
      setInput(text);
    }
  };

  return (
    <View className="flex-1 bg-violet-50 rounded-xl px-2 py-1">
      <View className="flex-row items-center justify-end">
        <TextInput
          className="mx-1 text-xl text-violet-700 font-bold text-center"
          keyboardType="decimal-pad"
          value={input}
          onChangeText={handleInputChange}
          onBlur={handleInputBlur}
          returnKeyType="done"
        />
        <View className="gap-2">
          <Pressable onPress={() => handleChange("up")}>
            <ChevronUp size={15} color="#C4B4FF" strokeWidth={3} />
          </Pressable>
          <Pressable onPress={() => handleChange("down")}>
            <ChevronDown size={15} color="#C4B4FF" strokeWidth={3} />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

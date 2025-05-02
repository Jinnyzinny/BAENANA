import { ChevronDown, ChevronUp } from "lucide-react-native";
import React, { useState } from "react";
import { Pressable, TextInput, View } from "react-native";

export function SelectNumber({
  min,
  max,
  initial,
  onChange,
}: {
  min: number;
  max: number;
  initial: number;
  onChange: (val: number) => void;
}) {
  const [value, setValue] = useState(
    Math.min(Math.max(initial ?? 10, min), max)
  );
  const [input, setInput] = useState(value.toString());

  const handleChange = (direction: "up" | "down") => {
    const nextValue = direction === "up" ? value + 1 : value - 1;
    const withinRange = direction === "up" ? value < max : value > min;

    if (!withinRange) return;

    setValue(nextValue);
    setInput(nextValue.toString());
    onChange?.(nextValue);
  };

  const handleInputBlur = () => {
    const numeric = parseInt(input, 10);
    if (!isNaN(numeric)) {
      const clamped = Math.max(min, Math.min(numeric, max));
      setValue(clamped);
      setInput(clamped.toString());
      onChange?.(clamped);
    } else {
      setInput(value.toString());
    }
  };

  return (
    <View className="w-[86px] bg-violet-50 rounded-xl px-2 py-1">
      <View className="flex-row items-center justify-end">
        <TextInput
          className="mx-1 text-xl text-neutral-600 font-bold text-center"
          keyboardType="numeric"
          value={input}
          onChangeText={setInput}
          onBlur={handleInputBlur}
          returnKeyType="done"
        />
        <View className="gap-2">
          <Pressable onPress={() => handleChange("up")}>
            <ChevronUp size={18} color="#C4B4FF" strokeWidth={3} />
          </Pressable>
          <Pressable onPress={() => handleChange("down")}>
            <ChevronDown size={18} color="#C4B4FF" strokeWidth={3} />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

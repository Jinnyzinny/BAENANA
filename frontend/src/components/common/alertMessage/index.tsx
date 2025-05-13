import {
  ChevronDown,
  ChevronUp,
  Hospital,
  Pill,
  TriangleAlert,
} from "lucide-react-native";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";

export function AlertMessage({
  type,
  title,
  content,
}: {
  type: "warn" | "hospital" | "medicine";
  title: string;
  content: string;
}) {
  const [isOpened, setIsOpened] = useState<boolean>(true);
  const typeSize: number = 16;
  const warnColor: string = "#EC6344";
  const hospitalColor: string = "#7FD19B";
  const medicineColor: string = "#A684FF";
  const typeStrokeWidth: number = 2.2;
  const toggleSize: number = 18;
  const toggleColor: string = "#A1A1A1";

  function handleOpen() {
    setIsOpened(!isOpened);
  }

  return (
    <View className="px-5 py-3 rounded-xl bg-white shadow-neutral-300">
      <View className="flex-row justify-between">
        <View className="flex-row items-center gap-2">
          {type === "warn" ? (
            <TriangleAlert
              size={typeSize}
              color={warnColor}
              strokeWidth={typeStrokeWidth}
            />
          ) : type === "hospital" ? (
            <Hospital
              size={typeSize}
              color={hospitalColor}
              strokeWidth={typeStrokeWidth}
            />
          ) : (
            <Pill
              size={typeSize}
              color={medicineColor}
              strokeWidth={typeStrokeWidth}
            />
          )}
          <Text className="text-neutral-800 font-bold text-sm">{title}</Text>
        </View>
        {isOpened ? (
          <Pressable onPress={handleOpen}>
            <ChevronUp size={toggleSize} color={toggleColor} />
          </Pressable>
        ) : (
          <Pressable onPress={handleOpen}>
            <ChevronDown size={toggleSize} color={toggleColor} />
          </Pressable>
        )}
      </View>
      {isOpened ? (
        <View>
          <Text className="mt-1 pl-6 text-neutral-600 text-sm">{content}</Text>
        </View>
      ) : (
        <View />
      )}
    </View>
  );
}

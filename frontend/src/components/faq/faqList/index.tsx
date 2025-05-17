import { ChevronDown, ChevronUp } from "lucide-react-native";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useGetFaqDetail } from "../../../api/quries/faq";

export function FaqList({
  faqId,
  question,
}: {
  faqId: number;
  question: string;
}) {
  const color: string = "#A3A3A3";
  const size: number = 18;
  const [isToggleOpen, setIsToggleOpen] = useState<boolean>(false);

  const { data } = useGetFaqDetail(faqId);

  return (
    <View className="p-5 bg-white rounded-xl gap-5">
      {/* 헤더 */}

      <View className="flex-row items-center justify-between">
        <Text className="text-neutral-800 font-bold">{question}</Text>
        <TouchableOpacity onPress={() => setIsToggleOpen(!isToggleOpen)}>
          {isToggleOpen ? (
            <ChevronUp color={color} size={size} />
          ) : (
            <ChevronDown color={color} size={size} />
          )}
        </TouchableOpacity>
      </View>

      {/* 본문 */}
      {data && isToggleOpen && (
        <View className="gap-2">
          <View className="flex-row items-center justify-between">
            <Text className="text-neutral-600 text-sm">
              {data.createdAt.slice(0, 10).replaceAll("-", ".")}{" "}
              {data.createdAt.slice(11, 16)}
            </Text>
          </View>

          <Text className="text-neutral-600 text-sm">{data.answer}</Text>
        </View>
      )}
    </View>
  );
}

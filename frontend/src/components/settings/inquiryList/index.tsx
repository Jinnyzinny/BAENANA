import { Check, ChevronDown, ChevronUp, Loader } from "lucide-react-native";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useGetInquiryDetail } from "../../../api/quries/inquiry";

export function InquiryList({
  inquiryId,
  title,
  status,
}: {
  inquiryId: number;
  title: string;
  status: string;
}) {
  const color: string = "#A3A3A3";
  const size: number = 18;
  const [isToggleOpen, setIsToggleOpen] = useState<boolean>(false);

  const { data } = useGetInquiryDetail(inquiryId);

  return (
    <View className="p-5 bg-white rounded-xl gap-5">
      {/* 헤더 */}

      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-2">
          {status === "PENDING" ? (
            <Loader color={"#A684FF"} size={size} />
          ) : (
            <Check color={"#7FD19B"} size={size} />
          )}
          <Text className="text-neutral-800 font-bold">{title}</Text>
        </View>
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
        <View>
          <Text>{data.questionContent}</Text>
        </View>
      )}
    </View>
  );
}

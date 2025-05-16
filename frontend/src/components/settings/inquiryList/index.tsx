import {
  Check,
  ChevronDown,
  ChevronUp,
  Loader,
  Trash2,
} from "lucide-react-native";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import {
  useDeleteInquiry,
  useGetInquiryDetail,
} from "../../../api/quries/inquiry";

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
  const { mutate: deleteInquiry } = useDeleteInquiry();

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
        <View className="gap-2">
          <View className="flex-row items-center justify-between">
            <Text className="text-neutral-600 text-sm">
              {data.questionDate.slice(0, 10).replace("-", ".")}{" "}
              {data.questionDate.slice(11, 16)}
            </Text>

            {/* 삭제 버튼 */}
            <TouchableOpacity onPress={() => deleteInquiry(inquiryId)}>
              <Trash2 color={color} size={size - 4} />
            </TouchableOpacity>
          </View>

          {/* 사용자 문의사항 */}
          <Text className="text-neutral-600 text-sm">
            {data.questionContent}
          </Text>

          <View className="w-full h-[1px] my-5 bg-neutral-100" />

          {/* 관리자 답변 */}

          {/* 관리자 답변 전 */}
          {status === "PENDING" && (
            <View className="gap-3 mb-5">
              <Text className="text-neutral-800 font-bold text-sm">
                [답변 대기 중]
              </Text>
              <View>
                <Text className="text-neutral-600 text-sm">
                  운영팀에서 확인 중입니다.
                </Text>
                <Text className="text-neutral-600 text-sm">
                  빠른 시일 내에 답변드리겠습니다.
                </Text>
              </View>
            </View>
          )}

          {/* 관리자 답변 후 */}
          {status !== "PENDING" && (
            <View className="gap-2 mb-5">
              <View className="flex-row items-center justify-between">
                <Text className="text-neutral-600 text-sm">
                  {data.answerDate.slice(0, 10).replace("-", ".")}{" "}
                  {data.answerDate.slice(11, 16)}
                </Text>
              </View>

              <Text className="text-neutral-600 text-sm">
                {data.answerDate}
              </Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
}

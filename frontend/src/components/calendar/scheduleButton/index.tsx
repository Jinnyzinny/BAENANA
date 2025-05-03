import { Droplet, Hospital, Pill } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";

export function ScheduleButton({
  type,
  onPress,
}: {
  type: "hospital" | "medicine" | "period";
  onPress: () => void;
}) {
  return (
    <TouchableOpacity onPress={onPress} className="flex-1">
      {/* 병원 예약 버튼 */}
      {type === "hospital" ? (
        <View className="rounded-xl py-4 gap-1 bg-white border border-violet-400 items-center justify-center">
          <Hospital color={"#A684FF"} size={20} />
          <Text className="text-sm text-violet-400 font-bold">
            병원 예약 입력
          </Text>
        </View>
      ) : // 복용약 추가 버튼
      type === "medicine" ? (
        <View className="rounded-xl py-4 gap-1 bg-violet-100 border border-violet-100 items-center justify-center">
          <Pill color={"#A684FF"} size={20} />
          <Text className="text-sm text-violet-400 font-bold">복용약 입력</Text>
        </View>
      ) : (
        // 증상 추가 버튼
        type === "period" && (
          <View className="rounded-xl py-4 gap-1 bg-violet-400 border border-violet-400 items-center justify-center">
            <Droplet color={"#FFFFFF"} size={20} />
            <Text className="text-sm text-white font-bold">월경 증상 입력</Text>
          </View>
        )
      )}
    </TouchableOpacity>
  );
}

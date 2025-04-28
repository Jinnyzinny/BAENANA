import { Droplet, Hospital, Pill } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";

export function ScheduleButton({
  type,
  onPress,
}: {
  type: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity onPress={onPress} className="flex-1">
      {type === "hospital" ? (
        <View className="rounded-xl py-4 gap-1 bg-white border border-violet-400 items-center justify-center">
          <Hospital color={"#A684FF"} size={20} />
          <Text className="text-sm text-violet-400 font-bold">병원 예약</Text>
        </View>
      ) : type === "pill" ? (
        <View className="rounded-xl py-4 gap-1 bg-violet-100 border border-violet-100 items-center justify-center">
          <Pill color={"#A684FF"} size={20} />
          <Text className="text-sm text-violet-400 font-bold">복용약 알림</Text>
        </View>
      ) : type === "droplet" ? (
        <View className="rounded-xl py-4 gap-1 bg-violet-400 border border-violet-400 items-center justify-center">
          <Droplet color={"#FFFFFF"} size={20} />
          <Text className="text-sm text-white font-bold">월경일 입력</Text>
        </View>
      ) : (
        <></>
      )}
    </TouchableOpacity>
  );
}

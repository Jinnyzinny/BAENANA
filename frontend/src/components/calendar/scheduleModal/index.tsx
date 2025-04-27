import { Image, Modal, Text, TouchableOpacity, View } from "react-native";
import { X } from "lucide-react-native";

export function ScheduleModal({
  visible,
  date,
  onClose,
}: {
  visible: boolean;
  date: string | null;
  onClose: () => void;
}) {
  if (!date) return null;

  return (
    <Modal
      visible={visible}
      transparent
      statusBarTranslucent
      animationType="slide"
    >
      <View className="flex-1 justify-center items-center bg-black/50">
        <View className="w-[90%] p-5 bg-white rounded-xl gap-3">
          {/* 이미지 / 날짜 / 닫기 */}
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-1">
              <Image
                source={require("../../../assets/images/mascot.png")}
                className="w-10 h-10"
              />
              <Text className="text-lg font-bold">{date} 일정 추가</Text>
            </View>
            <TouchableOpacity onPress={onClose}>
              <X />
            </TouchableOpacity>
          </View>
          {/* 버튼 - 병원 예약 / 복용약 알림 / 월경일 입력 */}
        </View>
      </View>
    </Modal>
  );
}

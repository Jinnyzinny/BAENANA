import { X } from "lucide-react-native";
import {
  Image,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { FormatDate } from "../../../utils/formatDate";
import { ScheduleButton } from "../scheduleButton/inde";

export function ScheduleModal({
  visible,
  date,
  onClose,
  handleBottomSheet,
}: {
  visible: boolean;
  date: string | null;
  onClose: () => void;
  handleBottomSheet: (type: "hospital" | "medicine" | "period") => void;
}) {
  return (
    <Modal
      visible={visible}
      transparent
      statusBarTranslucent
      animationType="slide"
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="w-[90%] max-h-[70%] p-5 bg-white rounded-xl gap-3">
            {/* 이미지 / 날짜 / 닫기 */}
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center gap-1">
                <Image
                  source={require("../../../assets/images/mascot.png")}
                  className="w-10 h-10"
                />
                <Text className="text-lg font-bold">{FormatDate(date)}</Text>
              </View>
              <TouchableOpacity onPress={onClose}>
                <X />
              </TouchableOpacity>
            </View>
            <ScrollView>
              {/* 토글 형태의 컴포넌트 추가 예정 */}
              {/* 안내선 */}
              {/* <View className="w-full h-[0.5px] my-3 bg-neutral-300" /> */}

              {/* 토글 형태의 컴포넌트 추가 예정 */}
              {/* 안내선 */}
              {/* <View className="w-full h-[0.5px] my-3 bg-neutral-300" /> */}

              {/* 토글 형태의 컴포넌트 추가 예정 */}
              {/* 안내선 */}
              {/* <View className="w-full h-[0.5px] my-3 bg-neutral-300" /> */}
            </ScrollView>
            {/* 버튼 - 병원 예약 / 복용약 알림 / 월경일 입력 */}
            <View className="gap-3">
              <View className="flex-row gap-3">
                <ScheduleButton
                  type="hospital"
                  onPress={() => handleBottomSheet("hospital")}
                />
                <ScheduleButton
                  type="pill"
                  onPress={() => handleBottomSheet("medicine")}
                />
              </View>
              <View className="flex-row">
                <ScheduleButton
                  type="droplet"
                  onPress={() => handleBottomSheet("period")}
                />
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

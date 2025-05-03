import { X } from "lucide-react-native";
import {
  Image,
  Modal,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { CustomButton } from "../../common/customButton";

export function WithdrawModal({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
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
            {/* 헤더 */}
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center gap-1">
                <Image
                  source={require("../../../assets/images/mascot.png")}
                  className="w-10 h-10"
                />
                <Text className="font-bold text-neutral-800">
                  정말 배나나를 떠나시겠어요?
                </Text>
              </View>
              <TouchableOpacity onPress={onClose}>
                <X color="#A3A3A3" size={24} />
              </TouchableOpacity>
            </View>
            {/* 본문 */}
            <View>
              <Text className="self-center text-sm text-neutral-800">
                배나나에 등록된 일정과 건강 기록은
              </Text>
              <Text className="self-center text-sm font-bold text-violet-700">
                삭제 후 복구할 수 없어요.
              </Text>
            </View>
            <View style={{ margin: 3 }} />
            <View className="flex-row gap-3">
              <View className="flex-1">
                <CustomButton fill={false} content="취소" onPress={onClose} />
              </View>
              <View className="flex-1">
                <CustomButton fill={true} content="확인" onPress={() => {}} />
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

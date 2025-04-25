import { Modal, Text, TextInput, View } from "react-native";
import { Button } from "../../common/button";

export function ScheduleModal({
  visible,
  date,
  inputText,
  onChangeText,
  onClose,
  onSave,
}: {
  visible: boolean;
  date: string | null;
  inputText: string;
  onChangeText: (text: string) => void;
  onClose: () => void;
  onSave: () => void;
}) {
  if (!date) return null;

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View className="flex-1 justify-center items-center bg-black/50">
        <View className="w-10/12 p-5 bg-white rounded-xl gap-3">
          <Text className="text-lg font-bold">{date} 일정 추가</Text>
          <TextInput
            placeholder="일정을 입력하세요"
            value={inputText}
            onChangeText={onChangeText}
            className="border border-neutral-300 rounded-md p-2"
          />
          <View className="flex-row justify-between gap-3">
            <Button fill={false} content="취소" onPress={onClose} />
            <Button fill={true} content="저장" onPress={onSave} />
          </View>
        </View>
      </View>
    </Modal>
  );
}

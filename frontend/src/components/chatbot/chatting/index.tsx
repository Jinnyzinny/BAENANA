import { DrawerNavigationProp } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import { AlignJustify, CornerDownLeft } from "lucide-react-native";
import { TextInput, TouchableOpacity, View } from "react-native";
import { ChatbotDrawerParamList } from "../../../navigation/chatbotDrawerNavigator";

type ChatbotDrawerNavigation = DrawerNavigationProp<
  ChatbotDrawerParamList,
  "Chat"
>;

export function Chatting({
  message,
  setMessage,
  onSend,
}: {
  message: string;
  setMessage: (message: string) => void;
  onSend: () => void;
}) {
  const navigation = useNavigation<ChatbotDrawerNavigation>();

  return (
    <View className="py-2 flex-row items-center gap-2">
      {/* 채팅 목록 버튼 */}
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <AlignJustify color="#525252" />
      </TouchableOpacity>

      {/* 입력창 */}
      <View className="flex-1 flex-row items-center">
        <TextInput
          placeholder="메시지를 입력해주세요."
          value={message}
          onChangeText={setMessage}
          numberOfLines={1}
          multiline={false}
          className="flex-1 py-2 pr-2"
        />
        <TouchableOpacity
          onPress={onSend}
          className="px-3 py-2 rounded-lg bg-violet-500"
        >
          <CornerDownLeft color={"#FFFFFF"} size={18} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

import { DrawerNavigationProp } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import { AlignJustify, CornerDownRight } from "lucide-react-native";
import { TextInput, TouchableOpacity, View } from "react-native";
import { ChatbotDrawerParamList } from "../../../navigation/chatbotDrawerNavigator";

type ChatbotDrawerNavigation = DrawerNavigationProp<
  ChatbotDrawerParamList,
  "Chat"
>;

export function Chatting({
  message,
  setMessage,
}: {
  message: string;
  setMessage: (message: string) => void;
}) {
  const navigation = useNavigation<ChatbotDrawerNavigation>();

  return (
    <View className="py-2 flex-row gap-2 items-center justify-between">
      {/* 채팅 목록 버튼 */}
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <AlignJustify color={"#525252"} />
      </TouchableOpacity>

      {/* 입력창 */}
      <View className="flex-1 flex-row items-center justify-between">
        <TextInput
          placeholder="메시지를 입력해주세요."
          value={message}
          onChangeText={setMessage}
        />
        <TouchableOpacity className="px-3 py-2 rounded-xl bg-violet-500">
          <CornerDownRight color={"#FFFFFF"} size={18} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

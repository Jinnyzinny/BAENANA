import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import { ArrowLeftFromLine } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";
import { FormatTime } from "../../../utils/formatTime";

export function ChatDrawer(props: DrawerContentComponentProps) {
  const dummyChats = [
    { id: "1", title: "첫 번째 대화", createAt: "2025-03-21T12:17:02.123Z" },
    { id: "2", title: "두 번째 대화", createAt: "2025-04-12T12:19:02.123Z" },
    { id: "3", title: "세 번째 대화", createAt: "2025-04-19T12:25:02.123Z" },
    { id: "4", title: "네 번째 대화", createAt: "2025-04-20T12:31:02.123Z" },
    { id: "5", title: "다섯 번째 대화", createAt: "2025-04-21T11:10:02.123Z" },
  ];

  return (
    <View className="flex-1 ">
      <DrawerContentScrollView {...props}>
        <View className="p-3 gap-5">
          <Text className="text-neutral-800 font-bold text-lg">채팅 목록</Text>
          <View className="gap-3">
            {dummyChats.map((chat) => (
              <TouchableOpacity
                key={chat.id}
                onPress={() => {
                  props.navigation.navigate("Chat", { chatId: chat.id });
                  props.navigation.closeDrawer();
                }}
              >
                <View className="flex-row items-center justify-between">
                  <Text className="text-neutral-800">{chat.title}</Text>
                  <Text className="text-neutral-800">
                    {FormatTime(chat.createAt)}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </DrawerContentScrollView>
      <TouchableOpacity
        className="px-5 py-10 self-end"
        onPress={() => props.navigation.closeDrawer()}
      >
        <ArrowLeftFromLine color={"#737373"} size={22} />
      </TouchableOpacity>
    </View>
  );
}

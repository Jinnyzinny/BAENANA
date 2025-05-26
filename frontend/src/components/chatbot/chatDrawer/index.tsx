import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  useDrawerStatus,
} from "@react-navigation/drawer";
import { ArrowLeftFromLine, RotateCcw } from "lucide-react-native";
import { useEffect } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { useGetChatList } from "../../../api/quries/chat";
import { formatTime } from "../../../utils/Time";

export function ChatDrawer(props: DrawerContentComponentProps) {
  const drawerStatus = useDrawerStatus();
  const { data: chatData, refetch: refetchChat } = useGetChatList();

  async function handleRotate() {
    props.navigation.navigate("Chat", {
      sessionId: null,
    });
    console.log("sessionId: null");
    props.navigation.closeDrawer();
  }

  useEffect(() => {
    if (drawerStatus === "open") {
      refetchChat();
    }
  }, [drawerStatus]);

  return (
    <View className="flex-1 ">
      <DrawerContentScrollView {...props}>
        <View className="p-3 gap-10">
          <Text className="text-neutral-800 font-bold text-lg">채팅 목록</Text>
          {chatData && (
            <FlatList
              data={chatData.slice(0, 10)}
              scrollEnabled={false}
              renderItem={({ item, index }) => (
                <View
                  className={`${index < chatData.length - 1 ? "pb-4" : ""}`}
                >
                  <View className="flex-row items-center justify-between">
                    <TouchableOpacity
                      key={item.lastTime}
                      onPress={() => {
                        props.navigation.navigate("Chat", {
                          sessionId: item.sessionId,
                        });
                        props.navigation.closeDrawer();
                      }}
                    >
                      <Text className="text-neutral-800">
                        {item.lastMessage.length > 20
                          ? `${item.lastMessage.slice(0, 20)}...`
                          : item.lastMessage}
                      </Text>
                    </TouchableOpacity>
                    <Text className="text-neutral-400">
                      {formatTime(item.lastTime)}
                    </Text>
                  </View>
                </View>
              )}
            />
          )}
        </View>
      </DrawerContentScrollView>
      <View className="flex-row px-7 pb-10 items-center justify-between">
        <View className="self-end">
          <TouchableOpacity onPress={handleRotate}>
            <RotateCcw color={"#737373"} size={20} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => props.navigation.closeDrawer()}>
          <ArrowLeftFromLine color={"#737373"} size={22} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

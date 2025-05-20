import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  useDrawerStatus,
} from "@react-navigation/drawer";
import { ArrowLeftFromLine } from "lucide-react-native";
import { useEffect } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { useGetChatList } from "../../../api/quries/chat";
import { FormatTime } from "../../../utils/formatTime";

export function ChatDrawer(props: DrawerContentComponentProps) {
  const drawerStatus = useDrawerStatus();
  const { data, refetch } = useGetChatList();

  useEffect(() => {
    if (drawerStatus === "open") {
      refetch();
    }
  }, [drawerStatus]);

  return (
    <View className="flex-1 ">
      <DrawerContentScrollView {...props}>
        <View className="p-3 gap-10">
          <Text className="text-neutral-800 font-bold text-lg">채팅 목록</Text>
          {data && (
            <FlatList
              data={data}
              scrollEnabled={false}
              renderItem={({ item, index }) => (
                <View className={`${index < data.length - 1 ? "pb-4" : ""}`}>
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
                        {item.lastMessage}
                      </Text>
                    </TouchableOpacity>
                    <Text className="text-neutral-400">
                      {FormatTime(item.lastTime)}
                    </Text>
                  </View>
                </View>
              )}
            />
          )}
        </View>
      </DrawerContentScrollView>
      <TouchableOpacity
        className="px-7 py-10 self-end"
        onPress={() => props.navigation.closeDrawer()}
      >
        <ArrowLeftFromLine color={"#737373"} size={22} />
      </TouchableOpacity>
    </View>
  );
}

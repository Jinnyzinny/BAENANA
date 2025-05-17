import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  useDrawerStatus,
} from "@react-navigation/drawer";
import { ArrowLeftFromLine } from "lucide-react-native";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { FormatTime } from "../../../utils/formatTime";
import { useGetChatList } from "../../../api/quries/chat";
import { useEffect } from "react";

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
        <View className="p-3 gap-5">
          <Text className="text-neutral-800 font-bold text-lg">채팅 목록</Text>
          <View className="gap-3">
            {data && (
              <FlatList
                data={data}
                scrollEnabled={false}
                renderItem={({ item }) => (
                  <View>
                    <TouchableOpacity
                      key={item.lastTime}
                      onPress={() => {
                        props.navigation.navigate("Chat", {
                          sessionId: item.sessionId,
                        });
                        props.navigation.closeDrawer();
                      }}
                    >
                      <View className="flex-row items-center justify-between">
                        <Text className="text-neutral-800">
                          {item.lastMessage}
                        </Text>
                        <Text className="text-neutral-800">
                          {FormatTime(item.lastTime)}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                )}
              />
            )}
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

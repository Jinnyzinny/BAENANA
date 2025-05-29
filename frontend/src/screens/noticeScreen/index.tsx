import { useRef } from "react";
import {
  FlatList,
  InteractionManager,
  ScrollView,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { Modalize } from "react-native-modalize";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGetNoticeList } from "../../api/quries/notice";
import { CustomButton } from "../../components/common/customButton";
import { HeaderLogo } from "../../components/common/headerLogo";
import { NoticeBottomSheet } from "../../components/notice/noticeBottomSheet";
import { NoticeList } from "../../components/notice/noticeList";
import { useLoginStore } from "../../store/loginStore";

export function NoticeScreen() {
  const sheetRef = useRef<Modalize>(null);
  const { height } = useWindowDimensions();

  const { user } = useLoginStore();
  const { data } = useGetNoticeList();

  function handleBottomSheet() {
    InteractionManager.runAfterInteractions(() => {
      sheetRef.current?.open();
    });
  }

  return (
    <>
      <SafeAreaView>
        <HeaderLogo before={true} settings={false} />
        <ScrollView>
          <View className="mx-5 gap-3 pb-16">
            {/* 시스템 공지 정보 설명 */}
            <View>
              <Text className="text-neutral-800 text-lg font-bold">
                시스템 공지
              </Text>
              <Text className="text-neutral-600 text-sm">
                업데이트 및 버그 수정 등을 확인해보세요
              </Text>
            </View>
            <View className="m-1" />

            {user?.role === "ADMIN" && (
              <>
                <CustomButton
                  fill={true}
                  content="공지사항 작성"
                  onPress={handleBottomSheet}
                />
              </>
            )}

            {/* 공지사항 */}
            {data && (
              <FlatList
                data={data}
                scrollEnabled={false}
                renderItem={({ item, index }) => (
                  <View className={index === data.length ? "" : "pb-3"}>
                    <NoticeList
                      noticeId={item.notificationId}
                      title={item.title}
                    />
                  </View>
                )}
              />
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
      <NoticeBottomSheet height={height} sheetRef={sheetRef} />
    </>
  );
}

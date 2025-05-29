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
import { useGetFaqList } from "../../api/quries/faq";
import { CustomButton } from "../../components/common/customButton";
import { HeaderLogo } from "../../components/common/headerLogo";
import { FaqBottomSheet } from "../../components/faq/faqBottomSheet";
import { FaqList } from "../../components/faq/faqList";
import { useLoginStore } from "../../store/loginStore";

export function FaqScreen() {
  const sheetRef = useRef<Modalize>(null);
  const { height } = useWindowDimensions();
  const { user } = useLoginStore();

  const { data } = useGetFaqList();

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
            {/* 자주 묻는 질문 정보 설명 */}
            <View>
              <Text className="text-neutral-800 text-lg font-bold">
                자주 묻는 질문
              </Text>
              <Text className="text-neutral-600 text-sm">
                자주 묻는 질문을 확인해보세요
              </Text>
            </View>
            <View className="m-1" />

            {user?.role === "ADMIN" && (
              <>
                <CustomButton
                  fill={true}
                  content="자주 묻는 질문 작성"
                  onPress={handleBottomSheet}
                />
              </>
            )}

            {/* 자주묻는 질문 */}
            {data && (
              <FlatList
                data={data}
                scrollEnabled={false}
                renderItem={({ item, index }) => (
                  <View className={index === data.length ? "" : "pb-3"}>
                    <FaqList faqId={item.faqId} question={item.question} />
                  </View>
                )}
              />
            )}
          </View>
        </ScrollView>
      </SafeAreaView>

      <FaqBottomSheet height={height} sheetRef={sheetRef} />
    </>
  );
}

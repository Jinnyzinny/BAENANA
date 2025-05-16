import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { Alert, FlatList, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAddInquiry, useGetInquiryList } from "../../api/quries/inquiry";
import { CustomButton } from "../../components/common/customButton";
import { HeaderLogo } from "../../components/common/headerLogo";
import { TabMenu } from "../../components/common/tabMenu";
import { Form } from "../../components/settings/form";
import { InquiryList } from "../../components/settings/inquiryList";

export function InquriyScreen() {
  const [selectedMenu, setSelectedMenu] = useState<string>("inquriy");
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const { mutate: addInquiry } = useAddInquiry();
  const { data, refetch } = useGetInquiryList();

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [])
  );

  function handleCancel() {
    Alert.alert("삭제", "입력된 내용을 삭제하시겠습니까?", [
      { text: "취소", style: "cancel" },
      {
        text: "확인",
        style: "destructive",
        onPress: () => {
          setTitle("");
          setContent("");
        },
      },
    ]);
  }

  function handleSave() {
    if (!title || !content)
      return Alert.alert("제목과 내용을 모두 입력해주세요.");

    addInquiry({ title, questionContent: content });
    setTitle("");
    setContent("");
  }

  return (
    <SafeAreaView>
      <HeaderLogo before={true} settings={false} />
      <ScrollView>
        <View className="mx-5 gap-3 pb-16">
          {/* 문의사항 정보 설명 */}
          <View>
            <Text className="text-neutral-800 text-lg font-bold">문의사항</Text>
            <Text className="text-neutral-600 text-sm">
              사용 중 궁금한 점을 남겨주세요
            </Text>
          </View>
          <View className="m-1" />
          <TabMenu
            tabs={[
              { key: "inquriy", label: "문의 하기" },
              { key: "list", label: "문의 내역" },
            ]}
            onSelect={(key) => {
              setSelectedMenu(key);
              setTitle("");
              setContent("");
            }}
          />
          {/* 문의내역 조회 */}
          {selectedMenu === "list" && data && (
            <FlatList
              scrollEnabled={false}
              data={data}
              renderItem={({ item, index }) => (
                <View className={index === data.length ? "" : "pb-3"}>
                  <InquiryList
                    inquiryId={item.inquiryId}
                    title={item.title}
                    status={item.status}
                  />
                </View>
              )}
            />
          )}
          {selectedMenu === "list" && !data && (
            <View className="flex-1 justify-center items-center gap-5">
              <Text className="text-neutral-400">입력된 문의내역이 없어요</Text>
            </View>
          )}

          {/* 문의사항 작성 */}
          {selectedMenu === "inquriy" && (
            <View className="gap-5">
              <Form
                title={title}
                content={content}
                setTitle={setTitle}
                setContent={setContent}
              />
              <View className="flex-row gap-3">
                <View className="flex-1">
                  <CustomButton
                    fill={false}
                    content="취소"
                    onPress={handleCancel}
                  />
                </View>
                <View className="flex-1">
                  <CustomButton
                    fill={true}
                    content="확인"
                    onPress={handleSave}
                  />
                </View>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

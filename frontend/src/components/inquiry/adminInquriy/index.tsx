import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { FlatList, Image, Text, View } from "react-native";
import { useGetAdminInquiryList } from "../../../api/quries/inquiry";
import { AdminInquiryCard } from "../adminInquiryCard";

export function AdminInquriy() {
  const { data, refetch } = useGetAdminInquiryList();

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [])
  );

  return (
    <View>
      {/* 문의내역 조회 */}
      {/* 사용자가 입력한 문의사항이 존재하는 경우 */}
      {data && data.length > 0 && (
        <FlatList
          scrollEnabled={false}
          data={data}
          renderItem={({ item, index }) => (
            <View className={index === data.length ? "" : "pb-3"}>
              <AdminInquiryCard
                inquiryId={item.inquiryId}
                title={item.title}
                status={item.status}
              />
            </View>
          )}
        />
      )}

      {/* 사용자가 입력한 문의사항이 없거나 로딩 중인 상태  */}
      {data && data.length === 0 && (
        <View
          className="flex-1 items-center gap-3"
          style={{ marginVertical: 140 }}
        >
          <Image
            source={require("../../../assets/images/mascot_sad.png")}
            style={{ width: 100, height: 100 }}
          />
          <Text className="text-neutral-600 text-sm mt-5">
            아직 사용자가 남긴 문의사항이 없어요.
          </Text>
        </View>
      )}
    </View>
  );
}

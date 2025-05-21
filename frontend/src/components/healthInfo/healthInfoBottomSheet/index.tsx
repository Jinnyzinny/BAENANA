import { RefObject } from "react";
import { ActivityIndicator, Image, ScrollView, Text, View } from "react-native";
import { Modalize } from "react-native-modalize";
import { useGetHealthInfoDetail } from "../../../api/quries/healthInfo";
import { CustomButton } from "../../common/customButton";

export function HealthInfoBottomSheet({
  height,
  sheetRef,
  selectedId,
}: {
  height: number;
  sheetRef: RefObject<Modalize | null>;
  selectedId: number | null;
}) {
  const { data, isFetching } = useGetHealthInfoDetail(selectedId);

  const [content1, content2] = data?.content?.split("\n") ?? ["", ""];

  if (!selectedId) return null;

  return (
    <Modalize ref={sheetRef} snapPoint={height * 0.76}>
      {/* 헤더 */}
      <View className="mx-5 mt-7 mb-5 flex-row items-start justify-start gap-2">
        <Image
          source={require("../../../assets/images/mascot.png")}
          className="w-10 h-10"
        />
        <Text
          numberOfLines={2}
          ellipsizeMode="tail"
          className="mr-12 text-lg font-bold self-center"
        >
          {isFetching ? "로딩 중" : data?.title}
        </Text>
      </View>

      {/* 본문 */}
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 32 }}>
        <View className="mx-7 gap-5">
          {isFetching ? (
            <ActivityIndicator size="large" />
          ) : (
            <View className="items-center gap-5">
              <Image
                source={
                  data?.imageUrl
                    ? { uri: data.imageUrl }
                    : require("../../../assets/images/default_image.png")
                }
                className="w-60 h-60 rounded-lg"
              />
              <Text className="text-neutral-800">{content1}</Text>
              <Text className="text-neutral-800">{content2}</Text>
            </View>
          )}
          <View className="m-5" />
          <CustomButton
            fill={false}
            content="확인"
            onPress={() => sheetRef.current?.close()}
          />
        </View>
      </ScrollView>
    </Modalize>
  );
}

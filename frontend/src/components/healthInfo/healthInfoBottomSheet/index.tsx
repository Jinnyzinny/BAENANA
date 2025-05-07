import { RefObject } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { Modalize } from "react-native-modalize";
import dataMocks from "../../../mocks/healthInfo_Detail.json";

const data = dataMocks;

export function HealthInfoBottomSheet({
  height,
  sheetRef,
}: {
  height: number;
  sheetRef: RefObject<Modalize | null>;
}) {
  return (
    <Modalize ref={sheetRef} snapPoint={height * 0.76}>
      {/* 헤더 */}
      <View className="mx-5 mt-7 mb-5 flex-row items-start justify-start gap-2">
        <Image
          source={require("../../../assets/images/mascot.png")}
          className="w-10 h-10"
        />
        <Text className="text-lg font-bold self-center">{data.title}</Text>
      </View>

      {/* 본문 */}
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 32 }}>
        <View className="mx-7 gap-5">
          {data.image_url ? (
            <Image
              source={{ uri: data.image_url }}
              className="w-full h-60 rounded-lg"
            />
          ) : (
            <Image
              source={require("../../../assets/images/default_image.png")}
              className="w-full h-60 rounded-lg"
            />
          )}

          <Text>{data.content}</Text>
        </View>
      </ScrollView>
    </Modalize>
  );
}

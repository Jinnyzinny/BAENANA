import { useRef, useState } from "react";
import {
  InteractionManager,
  ScrollView,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { Modalize } from "react-native-modalize";
import { SafeAreaView } from "react-native-safe-area-context";
import { HeaderLogo } from "../../components/common/headerLogo";
import { TabMenu } from "../../components/common/tabMenu";
import { HealthInfoBottomSheet } from "../../components/healthInfo/healthInfoBottomSheet";
import { ImageSlider } from "../../components/healthInfo/imageSlider";
import { InfoCard } from "../../components/healthInfo/infoCard";

export function HealthInfoScreen() {
  const [selectedMenu, setSelectedMenu] = useState<string>("period");
  const sheetRef = useRef<Modalize>(null);
  const { height } = useWindowDimensions();
  const selectedNumberMap: Record<string, number> = {
    ovulation: 1,
    period: 2,
  };

  const selectedNumber = selectedNumberMap[selectedMenu] ?? 1;
  const [selectedId, setSelectedId] = useState<number | null>(null);

  function handleBottomSheet(id: number) {
    setSelectedId(id);
    InteractionManager.runAfterInteractions(() => {
      sheetRef.current?.open();
    });
  }

  return (
    <>
      <SafeAreaView>
        <HeaderLogo before={true} settings={false} />
        <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 32 }}>
          <View className="mx-5 gap-3 pb-16">
            {/* 건강 정보 설명 */}
            <View>
              <Text className="text-neutral-800 text-lg font-bold">
                건강 정보
              </Text>
              <Text className="text-neutral-600 text-sm">
                다양한 건강 정보를 확인해보세요
              </Text>
            </View>
            {/* 이미지 슬라이더 */}
            <ImageSlider />
            {/* 카테고리 */}
            <View className="m-1" />
            {/* 메뉴 */}
            <TabMenu
              tabs={[
                { key: "period", label: "월경 & 임신" },
                { key: "ovulation", label: "배란" },
              ]}
              onSelect={(key) => {
                setSelectedMenu(key);
              }}
            />
            {/* 건강 정보 카드 */}
            <InfoCard
              onPress={handleBottomSheet}
              selectedNumber={selectedNumber}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
      <HealthInfoBottomSheet
        height={height}
        sheetRef={sheetRef}
        selectedId={selectedId}
      />
    </>
  );
}

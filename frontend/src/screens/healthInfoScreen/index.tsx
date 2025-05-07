import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { HeaderLogo } from "../../components/common/headerLogo";
import { ImageSlider } from "../../components/healthInfo/imageSlider";
import { InfoCard } from "../../components/healthInfo/infoCard";
import { TabMenu } from "../../components/common/tabMenu";
import { useState } from "react";

export function HealthInfoScreen() {
  const [selectedMenu, setSelectedMenu] = useState<string>("period");

  return (
    <SafeAreaView>
      <HeaderLogo before={true} settings={false} />
      <ScrollView>
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
          <TabMenu
            tabs={[
              { key: "period", label: "월경 관리" },
              { key: "diet", label: "식이 요법" },
              { key: "exercise", label: "운동 요법" },
              { key: "habit", label: "생활 습관" },
            ]}
            onSelect={(key) => {
              setSelectedMenu(key);
            }}
          />
          {/* 건강 정보 카드 */}
          <InfoCard selectedMenu={selectedMenu} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

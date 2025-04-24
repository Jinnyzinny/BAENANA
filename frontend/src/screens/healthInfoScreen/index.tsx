import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { HeaderLogo } from "../../components/common/headerLogo";
import { ImageSlider } from "../../components/healthInfo/imageSlider";
import { InfoCard } from "../../components/healthInfo/infoCard";

export function HealthInfoScreen() {
  return (
    <SafeAreaView>
      <HeaderLogo />
      <ScrollView>
        <View className="mx-5 gap-3 pb-16">
          {/* 건강 정보 설명 */}
          <View>
            <Text className="text-neutral-800 text-lg font-bold">
              건강 정보
            </Text>
            <Text className="text-neutral-800 text-sm">
              건강 정보 설명이나 주의사항 문구가 들어갈 예정
            </Text>
          </View>
          {/* 이미지 슬라이더 */}
          <ImageSlider />
          {/* 건강 정보 카드 */}
          <Text className="text-neutral-800 font-bold">건강 정보</Text>
          <InfoCard />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

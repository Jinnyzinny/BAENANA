import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { HeaderLogo } from "../../components/common/headerLogo";
import { TabMenu } from "../../components/common/tabMenu";
import { useState } from "react";

export function NoticeScreen() {
  const [selectedMenu, setSelectedMenu] = useState<string>("notice");

  return (
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
          <TabMenu
            tabs={[
              { key: "notice", label: "공지사항" },
              { key: "update", label: "업데이트" },
              { key: "bug", label: "버그 수정" },
              { key: "policy", label: "정책 변경" },
            ]}
            onSelect={(key) => {
              setSelectedMenu(key);
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { HeaderLogo } from "../../components/common/headerLogo";
import { useState } from "react";
import { TabMenu } from "../../components/common/tabMenu";

export function FAQScreen() {
  const [selectedMenu, setSelectedMenu] = useState<string>("calendar");

  return (
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
          <TabMenu
            tabs={[
              { key: "calendar", label: "캘린더" },
              { key: "alert", label: "알림" },
              { key: "login", label: "계정" },
              { key: "etc", label: "기타" },
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

import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { HeaderLogo } from "../../components/common/headerLogo";
import { NoticeCard } from "../../components/notice/noticeCard";

export function NoticeScreen() {
  // 임시 데이터
  const data = [
    {
      id: 1,
      title: "시스템 공지 제목",
    },
    {
      id: 2,
      title: "제목 2",
    },
    {
      id: 3,
      title: "제목 2",
    },
  ];
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

          {/* 관리자: 공지사항 추가 버튼 추가 필요 => 바텀시트 띄워서 공지사항 작성 */}

          <View className="gap-3">
            {data.map((item) => (
              <NoticeCard key={item.id} id={item.id} title={item.title} />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

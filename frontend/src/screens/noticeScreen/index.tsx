import { ScrollView, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { HeaderLogo } from "../../components/common/headerLogo";
import { TabMenu } from "../../components/common/tabMenu";
import { useState } from "react";
import { NoticeItem } from "../../components/notice/NoticeItem";
import { 
  ServerMaintenanceNotice, 
  ServiceRecoveryNotice,
  UpdateNotice,
  AndroidUpdateNotice,
  AndroidSecurityNotice,
  BugFixNotice,
  PolicyChangeNotice
} from "../../components/notice/NoticeContent";

interface Notice {
  id: string;
  title: string;
  content: React.ReactNode | null;
}

export function NoticeScreen() {
  const [selectedMenu, setSelectedMenu] = useState<string>("notice");
  const [expandedNotices, setExpandedNotices] = useState<string[]>(["2025.04.25", "2025.04.24", "2025.04.23"]);

  const toggleNotice = (id: string) => {
    if (expandedNotices.includes(id)) {
      setExpandedNotices(expandedNotices.filter(item => item !== id));
    } else {
      setExpandedNotices([...expandedNotices, id]);
    }
  };

  // 공지사항 데이터
  const noticeData: Notice[] = [
    {
      id: "2025.04.23",
      title: "[2025.04.23] 서버 점검 안내",
      content: <ServerMaintenanceNotice />
    },
    {
      id: "2025.04.02",
      title: "[2025.04.02] 서비스 장애 복구 완료",
      content: <ServiceRecoveryNotice />
    },
    {
      id: "2025.03.23",
      title: "[2025.03.23] 서버 점검 안내",
      content: null
    },
    {
      id: "2025.02.23",
      title: "[2025.02.23] 서버 점검 안내",
      content: null
    }
  ];

  // 업데이트 데이터
  const updateData: Notice[] = [
    {
      id: "2025.04.25",
      title: "2025.04.25 [업데이트] iOS 업데이트 관련",
      content: <UpdateNotice />
    },
    {
      id: "2025.04.24",
      title: "2025.04.24 [업데이트] 안드로이드 업데이트 관련",
      content: <AndroidUpdateNotice />
    },
    {
      id: "2025.03.10",
      title: "[2025.03.10] 버전 3.5.2 업데이트",
      content: null
    },
    {
      id: "2025.02.05",
      title: "[2025.02.05] 버전 3.5.0 업데이트",
      content: null
    }
  ];

  // 버그 수정 데이터
  const bugFixData: Notice[] = [
    {
      id: "2025.04.23",
      title: "2025.04.23 [보안] 안드로이드 보안 관련",
      content: <AndroidSecurityNotice />
    },
    {
      id: "2025.03.22",
      title: "[2025.03.22] 알림 기능 버그 수정",
      content: null
    },
    {
      id: "2025.02.15",
      title: "[2025.02.15] 로그인 오류 수정",
      content: null
    }
  ];

  // 정책 변경 데이터
  const policyData: Notice[] = [
    {
      id: "2025.04.01",
      title: "[2025.04.01] 개인정보 처리방침 변경",
      content: <PolicyChangeNotice />
    },
    {
      id: "2025.03.15",
      title: "[2025.03.15] 서비스 이용약관 개정",
      content: null
    },
    {
      id: "2025.01.20",
      title: "[2025.01.20] 결제 정책 변경",
      content: null
    }
  ];

  // 현재 선택된 탭에 따라 보여줄 데이터 선택
  const getActiveData = () => {
    switch (selectedMenu) {
      case "notice":
        return noticeData;
      case "update":
        return updateData;
      case "bug":
        return bugFixData;
      case "policy":
        return policyData;
      default:
        return noticeData;
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <HeaderLogo before={true} settings={true} />
      
      {/* 시스템 공지 정보 설명 */}
      <View className="px-5 py-3 bg-gray-100">
        <Text className="text-neutral-800 text-xl font-bold">
          시스템 공지
        </Text>
        <Text className="text-neutral-600 text-sm">
          시스템 공지 관련 문구가 들어갈 예정
        </Text>
      </View>
      
      {/* 탭 메뉴 */}
      <View className="bg-gray-100">
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
      
      {/* 선택된 탭에 따른 콘텐츠 표시 */}
      <ScrollView className="flex-1 bg-gray-100">
        <View className="p-4 gap-2">
          {getActiveData().map(item => (
            <NoticeItem
              key={item.id}
              id={item.id}
              title={item.title}
              content={item.content}
              isExpanded={expandedNotices.includes(item.id)}
              onToggle={toggleNotice}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

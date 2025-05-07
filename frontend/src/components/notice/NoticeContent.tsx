import React from "react";
import { View, Text } from "react-native";

interface IconTextProps {
  icon: string;
  text: string;
  iconColor?: string;
}

function IconText({ icon, text, iconColor = "#333" }: IconTextProps) {
  return (
    <View className="flex-row gap-2 mb-2">
      <Text style={{ color: iconColor }}>{icon}</Text>
      <Text className="text-neutral-700 text-sm flex-1">{text}</Text>
    </View>
  );
}

export function ServerMaintenanceNotice() {
  return (
    <View className="gap-2">
      <Text className="text-neutral-700 text-sm">안녕하세요.</Text>
      <Text className="text-neutral-700 text-sm">더 나은 서비스 제공을 위해 아래 일정으로 서버 점검이 진행됩니다.</Text>
      
      <IconText 
        icon="🔧" 
        text="점검 일시: 2025년 4월 25일(목) 02:00 ~ 04:00 (KST)" 
      />
      
      <IconText 
        icon="▲" 
        text="점검 영향: 점검 시간 동안 서비스 이용이 일시적으로 제한됩니다." 
      />
      
      <Text className="text-neutral-700 text-sm mt-2">이용에 불편을 드려 죄송하며, 더욱 안정적인 서비스를 위해 최선을 다하겠습니다.</Text>
      <Text className="text-neutral-700 text-sm">감사합니다.</Text>
    </View>
  );
}

export function ServiceRecoveryNotice() {
  return (
    <View className="gap-2">
      <Text className="text-neutral-700 text-sm">2025년 4월 23일 오전 중 일부 사용자에게서 켜렌더 일정이 사라지는 문제가 발생하였습니다.</Text>
      <Text className="text-neutral-700 text-sm">현재 해당 문제는 완전히로 복구되었으며, 다시 정인 튠딘트됨니다.</Text>
      
      <IconText 
        icon="📌" 
        text="장애 발생 시간: 4월 23일 오전 9:00 ~ 10:40" 
        iconColor="#F87171"
      />
      
      <IconText 
        icon="✓" 
        text="조치 내용: 서버 데이터 복구 및 안정화 작업 완료" 
        iconColor="#10B981"
      />
      
      <IconText 
        icon="📢" 
        text="추가 조치: 동일 오류 방지를 위한 점검 예정" 
      />
      
      <Text className="text-neutral-700 text-sm mt-2">불편을 드려 진심으로 사과드리며, 보다 안정적인 서비스를 제공할 수 있도록 최선을 다하겠습니다.</Text>
    </View>
  );
}

// iOS 업데이트 관련 공지 내용
export function UpdateNotice() {
  return (
    <View className="gap-2">
      <Text className="text-neutral-700 text-sm">안녕하세요. iOS 앱 업데이트 안내입니다.</Text>
      <Text className="text-neutral-700 text-sm">더 나은 사용자 경험을 위해 다음과 같은 기능이 업데이트되었습니다.</Text>
      
      <IconText 
        icon="✨" 
        text="새로운 대시보드 UI 개선" 
        iconColor="#6366F1"
      />
      
      <IconText 
        icon="📊" 
        text="주간/월간 통계 기능 강화" 
        iconColor="#6366F1"
      />
      
      <IconText 
        icon="🛡️" 
        text="iOS 17.5 호환성 개선" 
        iconColor="#6366F1"
      />
      
      <Text className="text-neutral-700 text-sm mt-2">앱스토어에서 최신 버전으로 업데이트하여 개선된 기능을 이용해보세요.</Text>
      <Text className="text-neutral-700 text-sm">감사합니다.</Text>
    </View>
  );
}

// 안드로이드 업데이트 관련 공지 내용
export function AndroidUpdateNotice() {
  return (
    <View className="gap-2">
      <Text className="text-neutral-700 text-sm">안녕하세요. 안드로이드 앱 업데이트 안내입니다.</Text>
      <Text className="text-neutral-700 text-sm">더 나은 사용자 경험을 위해 다음과 같은 기능이 업데이트되었습니다.</Text>
      
      <IconText 
        icon="✨" 
        text="새로운 사용자 인터페이스 적용" 
        iconColor="#6366F1"
      />
      
      <IconText 
        icon="🚀" 
        text="앱 실행 속도 최적화" 
        iconColor="#6366F1"
      />
      
      <IconText 
        icon="🔄" 
        text="데이터 동기화 성능 개선" 
        iconColor="#6366F1"
      />
      
      <Text className="text-neutral-700 text-sm mt-2">플레이스토어에서 최신 버전으로 업데이트하여 개선된 기능을 이용해보세요.</Text>
      <Text className="text-neutral-700 text-sm">감사합니다.</Text>
    </View>
  );
}

// 안드로이드 보안 관련 공지 내용
export function AndroidSecurityNotice() {
  return (
    <View className="gap-2">
      <Text className="text-neutral-700 text-sm">안녕하세요. 안드로이드 앱 보안 업데이트 안내입니다.</Text>
      <Text className="text-neutral-700 text-sm">사용자 개인정보 보호 강화를 위해 보안 업데이트가 진행되었습니다.</Text>
      
      <IconText 
        icon="🔒" 
        text="생체인증 보안 강화" 
        iconColor="#EF4444"
      />
      
      <IconText 
        icon="🔐" 
        text="데이터 암호화 알고리즘 개선" 
        iconColor="#EF4444"
      />
      
      <IconText 
        icon="👮" 
        text="비정상 로그인 감지 시스템 추가" 
        iconColor="#EF4444"
      />
      
      <Text className="text-neutral-700 text-sm mt-2">보안 강화를 위해 앱을 최신 버전으로 업데이트해주시길 권장합니다.</Text>
      <Text className="text-neutral-700 text-sm">감사합니다.</Text>
    </View>
  );
}

// 버그 수정 공지 내용
export function BugFixNotice() {
  return (
    <View className="gap-2">
      <Text className="text-neutral-700 text-sm font-bold">최근 수정된 버그</Text>
      
      <IconText 
        icon="🐛" 
        text="데이터 로딩 시 간헐적으로 발생하는 오류 수정" 
        iconColor="#EF4444"
      />
      
      <IconText 
        icon="🐛" 
        text="프로필 이미지 업로드 실패 문제 해결" 
        iconColor="#EF4444"
      />
      
      <IconText 
        icon="🐛" 
        text="푸시 알림 지연 문제 개선" 
        iconColor="#EF4444"
      />
      
      <Text className="text-neutral-700 text-sm mt-2">버그 발견 시 고객센터로 제보해 주시면 빠르게 수정하겠습니다.</Text>
    </View>
  );
}

// 정책 변경 관련 공지 내용
export function PolicyChangeNotice() {
  return (
    <View className="gap-2">
      <Text className="text-neutral-700 text-sm font-bold">정책 변경 사항</Text>
      
      <IconText 
        icon="📝" 
        text="개인정보 처리방침 업데이트 (2025년 4월 1일부터 적용)" 
        iconColor="#6366F1"
      />
      
      <IconText 
        icon="📝" 
        text="서비스 이용약관 개정 안내" 
        iconColor="#6366F1"
      />
      
      <IconText 
        icon="📝" 
        text="결제 정책 변경 사항" 
        iconColor="#6366F1"
      />
      
      <Text className="text-neutral-700 text-sm mt-2">자세한 내용은 설정 > 약관 및 정책에서 확인하실 수 있습니다.</Text>
    </View>
  );
}

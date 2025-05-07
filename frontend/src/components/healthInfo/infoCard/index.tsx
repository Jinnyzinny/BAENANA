import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { useState } from "react";
import { BottomSheet } from "../../common/bottomSheet";

interface InfoCardProps {
  selectedMenu: string;
}

interface InfoCardItem {
  id: string;
  title: string;
  content: string;
  img: string;
  detailContent?: string;
  isDummy?: boolean;
}

// 월경 관리 데이터
const mensesData = [
  {
    id: "m1",
    title: "월경 주기 이해하기",
    img: "https://i.namu.wiki/i/Mj0aArUbJiq5_c500MqmbYyDPWnSiDBCsxbesdkR0XTOtDvwrjj2ponJvctbYgQ7zPE_LvjsJHAl786rZu0tkw.webp",
    content: "건강한 월경 주기 관리 방법",
    detailContent:
      "월경 주기는 여성 건강의 중요한 지표로, 평균 28일이지만 21-35일 사이가 정상 범위입니다. 규칙적인 주기를 위해서는 충분한 수면, 규칙적인 운동, 균형 잡힌 식단이 필요합니다. 특히 철분, 칼슘, 마그네슘이 풍부한 음식 섭취가 도움됩니다. 월경 주기 추적 앱을 통해 시작일, 기간, 출혈량을 기록하면 본인의 패턴을 파악하고 이상 징후 발견 시 의료 전문가와 상담할 수 있습니다.",
  },
  {
    id: "m2",
    title: "생리통 완화 방법",
    img: "https://i.namu.wiki/i/Mj0aArUbJiq5_c500MqmbYyDPWnSiDBCsxbesdkR0XTOtDvwrjj2ponJvctbYgQ7zPE_LvjsJHAl786rZu0tkw.webp",
    content: "효과적인 생리통 관리 팁",
    detailContent:
      "생리통 완화에는 온찜질이 효과적입니다. 따뜻한 물주머니나 온열 패드를 아랫배나 허리에 대면 근육 긴장을 풀어주고 통증을 줄여줍니다. 가벼운 스트레칭이나 요가는 혈액 순환을 촉진하고 엔도르핀을 분비해 통증을 완화합니다. 오메가-3, 마그네슘, 비타민 B가 풍부한 식품은 염증 감소에 도움을 줍니다. 심한 생리통이 지속되거나 일상생활에 지장을 준다면 자궁내막증이나 자궁근종 같은 질환의 징후일 수 있으니 전문의와 상담하세요.",
  },
  {
    id: "m3",
    title: "PMS 관리하기",
    img: "https://i.namu.wiki/i/Mj0aArUbJiq5_c500MqmbYyDPWnSiDBCsxbesdkR0XTOtDvwrjj2ponJvctbYgQ7zPE_LvjsJHAl786rZu0tkw.webp",
    content: "월경 전 증후군 완화법",
    detailContent:
      "월경 전 증후군(PMS)은 월경 시작 전 1-2주 동안 나타나는 복부 팽만감, 두통, 피로, 기분 변화 등의 증상입니다. 관리를 위해 하루 30분의 걷기, 수영 같은 유산소 운동이 중요합니다. 명상, 심호흡, 요가로 스트레스를 줄이고, 카페인, 알코올, 짠 음식은 제한하세요. 비타민 B6, 칼슘, 마그네슘이 풍부한 식품은 증상 완화에 도움이 됩니다. 심한 증상으로 일상생활이 어렵다면 의사와 상담하세요.",
  },
];

// 식이 요법 데이터
const dietData = [
  {
    id: "d1",
    title: "균형 잡힌 식단 구성하기",
    img: "https://i.namu.wiki/i/Mj0aArUbJiq5_c500MqmbYyDPWnSiDBCsxbesdkR0XTOtDvwrjj2ponJvctbYgQ7zPE_LvjsJHAl786rZu0tkw.webp",
    content: "여성 건강을 위한 식단 구성법",
    detailContent:
      "여성 건강을 위한 균형 잡힌 식단은 다양한 색상의 과일과 채소, 통곡물, 저지방 단백질, 건강한 지방을 포함해야 합니다. 특히 중요한 영양소는 철분(월경 중 혈액 손실 보충), 칼슘과 비타민 D(뼈 건강), 엽산(세포 생성과 DNA 합성)입니다. 가공식품, 설탕, 소금의 과다 섭취는 줄이고 하루 2리터 정도의 물을 마시세요. 개인 건강 상태와 목표에 따라 식단을 조정하고 필요시 영양사나 의사와 상담하세요.",
  },
  {
    id: "d2",
    title: "호르몬 균형을 위한 영양소",
    img: "https://i.namu.wiki/i/Mj0aArUbJiq5_c500MqmbYyDPWnSiDBCsxbesdkR0XTOtDvwrjj2ponJvctbYgQ7zPE_LvjsJHAl786rZu0tkw.webp",
    content: "호르몬 건강을 지원하는 식품 소개",
    detailContent:
      "호르몬 균형에 중요한 영양소로는 오메가-3(연어, 참치, 아마씨, 호두), 마그네슘(시금치, 아몬드, 검은콩), 아연(굴, 소고기, 호박씨), 비타민 B6(바나나, 닭고기, 참치)가 있습니다. 오메가-3는 염증을 줄이고, 마그네슘은 에스트로겐과 프로게스테론 대사에 중요하며, 아연은 생식 호르몬 생성에 필수적입니다. 두부, 아마씨, 콩과 같은 피토에스트로겐 식품도 도움이 됩니다. 가공식품, 설탕, 알코올은 줄이고 유기농 식품을 선택하세요.",
  },
  {
    id: "d3",
    title: "건강한 간식 선택하기",
    img: "https://i.namu.wiki/i/Mj0aArUbJiq5_c500MqmbYyDPWnSiDBCsxbesdkR0XTOtDvwrjj2ponJvctbYgQ7zPE_LvjsJHAl786rZu0tkw.webp",
    content: "영양가 있는 간식 아이디어",
    detailContent:
      "건강한 간식은 굶주림을 달래고 혈당을 안정적으로 유지합니다. 추천 간식으로는 건강한 지방과 단백질이 풍부한 견과류와 씨앗, 단백질과 칼슘이 풍부한 그릭 요거트, 비타민과 미네랄이 풍부한 신선한 과일과 채소, 단백질과 필수 아미노산이 풍부한 삶은 달걀, 영양소를 조절할 수 있는 홈메이드 에너지 바, 호무스와 야채 스틱이 있습니다. 가공식품, 설탕이 많은 간식, 짠 스낵은 제한하세요.",
  },
];

// 운동 요법 데이터
const exerciseData = [
  {
    id: "e1",
    title: "여성 건강을 위한 추천 운동",
    img: "https://i.namu.wiki/i/Mj0aArUbJiq5_c500MqmbYyDPWnSiDBCsxbesdkR0XTOtDvwrjj2ponJvctbYgQ7zPE_LvjsJHAl786rZu0tkw.webp",
    content: "여성에게 적합한 운동 유형",
    detailContent:
      "여성 건강을 위한 최적의 운동은 유산소, 근력, 유연성, 코어 강화 운동의 조합입니다. 유산소 운동(걷기, 조깅, 수영)은 심혈관 건강과 체중 관리에 도움되며 주 150분이 권장됩니다. 근력 운동은 뼈 건강과 기초 대사율 향상에 중요하며 주 2-3회가 적당합니다. 요가와 필라테스는 유연성, 코어 강화, 정신적 웰빙에 효과적이고, 골반저근 운동은 요실금 예방에 좋습니다. 규칙적인 운동은 기분, 에너지, 수면 개선과 스트레스 감소에 도움됩니다.",
  },
  {
    id: "e2",
    title: "월경 주기별 운동 가이드",
    img: "https://i.namu.wiki/i/Mj0aArUbJiq5_c500MqmbYyDPWnSiDBCsxbesdkR0XTOtDvwrjj2ponJvctbYgQ7zPE_LvjsJHAl786rZu0tkw.webp",
    content: "주기에 맞는 최적의 운동법",
    detailContent:
      "월경 주기별 운동: 월경 단계(1-5일)는 에너지가 낮으므로 요가, 걷기, 스트레칭 같은 저강도 활동에 집중하세요. 난포기(6-14일)는 에너지와 근력이 증가하는 시기로 HIIT, 러닝, 근력 운동에 적합합니다. 배란기(14일경)는 근력과 지구력이 최고조로 도전적인 운동에 좋습니다. 황체기(15-28일)는 체온 상승과 피로감이 증가하므로 필라테스, 수영 등 중강도 운동이 적합합니다. 월경 전(24-28일)은 걷기, 가벼운 요가로 전환하세요. 항상 몸 상태에 귀 기울이고 필요시 휴식을 취하세요.",
  },
  {
    id: "e3",
    title: "효과적인 스트레칭 방법",
    img: "https://i.namu.wiki/i/Mj0aArUbJiq5_c500MqmbYyDPWnSiDBCsxbesdkR0XTOtDvwrjj2ponJvctbYgQ7zPE_LvjsJHAl786rZu0tkw.webp",
    content: "유연성과 통증 완화를 위한 스트레칭",
    detailContent:
      "효과적인 스트레칭 원칙: 항상 5-10분의 가벼운 워밍업 후 스트레칭하세요. 갑작스러운 동작은 피하고 천천히 호흡하며 점진적으로 깊게 스트레칭하세요. 각 자세를 15-30초 유지하고 2-4회 반복하며, 통증이 있으면 즉시 중단하세요. 주요 스트레칭은 햄스트링, 대퇴사두근, 종아리, 등/어깨, 목 스트레칭이 있습니다. 생리통이나 PMS 증상에는 고양이-소 자세, 아동 자세, 나비 자세와 같은 골반/복부 스트레칭이 도움됩니다. 이상적으로는 매일, 최소 주 3회 스트레칭하세요.",
  },
];

// 생활 습관 데이터
const habitData = [
  {
    id: "h1",
    title: "건강한 수면 습관",
    img: "https://i.namu.wiki/i/Mj0aArUbJiq5_c500MqmbYyDPWnSiDBCsxbesdkR0XTOtDvwrjj2ponJvctbYgQ7zPE_LvjsJHAl786rZu0tkw.webp",
    content: "수면의 질을 높이는 방법",
    detailContent:
      "건강한 수면 습관: 주말에도 같은 시간에 자고 일어나는 일관된 수면 스케줄을 유지하세요. 취침 전 따뜻한 목욕, 스트레칭, 명상, 독서와 같은 루틴을 만들고, 어둡고 조용하며 시원한(18-20°C) 침실 환경을 조성하세요. 취침 전 1-2시간은 블루 라이트(휴대폰, 태블릿)를 피하고, 오후 이후 카페인과 알코올을 제한하세요. 일찍 규칙적인 운동을 하되 취침 직전 고강도 운동은 피하고, 취침 전 무거운 식사도 피하세요. 월경 중 수면 문제는 체온 조절과 통증 관리에 주의하세요.",
  },
  {
    id: "h2",
    title: "효과적인 스트레스 관리",
    img: "https://i.namu.wiki/i/Mj0aArUbJiq5_c500MqmbYyDPWnSiDBCsxbesdkR0XTOtDvwrjj2ponJvctbYgQ7zPE_LvjsJHAl786rZu0tkw.webp",
    content: "일상에서 실천하는 스트레스 완화법",
    detailContent:
      "스트레스 관리 방법: 하루 5-10분의 명상이나 심호흡(4-7-8 호흡법)으로 스트레스 호르몬을 낮추세요. 주 150분의 규칙적인 운동은 엔도르핀을 분비해 기분을 개선합니다. 7-9시간의 양질의 수면을 취하고, 설탕과 가공식품을 줄이며 오메가-3와 항산화제가 풍부한 식품을 섭취하세요. 친구, 가족과의 소통, 효과적인 시간 관리, 취미 활동, 자연 속에서 시간 보내기도 스트레스 완화에 도움됩니다. 지속적인 스트레스로 어려움이 있다면 전문가의 도움을 구하세요.",
  },
  {
    id: "h3",
    title: "디지털 디톡스 가이드",
    img: "https://i.namu.wiki/i/Mj0aArUbJiq5_c500MqmbYyDPWnSiDBCsxbesdkR0XTOtDvwrjj2ponJvctbYgQ7zPE_LvjsJHAl786rZu0tkw.webp",
    content: "디지털 기기 사용 줄이기",
    detailContent:
      "디지털 디톡스 방법: 매일 식사 시간이나 취침 전 1시간 등 화면 없는 시간을 설정하고, 필수 알림만 활성화하세요. 침실이나 식당을 디지털 프리 공간으로 지정하고, 소셜 미디어 사용 시간을 제한하세요. 독서, 걷기, 요리 같은 오프라인 활동을 늘리고, 주말 하루를 디지털 디톡스 데이로 지정해보세요. 자연에서 시간을 보내는 것도 정신적 회복에 효과적입니다. 한 번에 모든 기기를 끊지 말고 점진적으로 의식적인 사용을 목표로 하세요.",
  },
];

export function InfoCard({ selectedMenu }: InfoCardProps) {
  // 바텀시트 상태 관리
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<InfoCardItem | null>(null);

  // 카드 클릭 핸들러
  const handleCardPress = (item: InfoCardItem) => {
    setSelectedItem(item);
    setBottomSheetVisible(true);
  };

  // 선택된 메뉴에 따라 다른 데이터 표시
  const getDataByMenu = () => {
    switch (selectedMenu) {
      case "menses":
        return mensesData;
      case "diet":
        return dietData;
      case "exercise":
        return exerciseData;
      case "habit":
        return habitData;
      default:
        return mensesData; // 기본값은 월경 관리 데이터
    }
  };

  const data = getDataByMenu();

  // 데이터가 홀수인 경우 더미 데이터 추가하여 카드 크기 일관성 유지
  const normalizedData: InfoCardItem[] = [...data] as InfoCardItem[];
  if (data.length % 2 !== 0) {
    normalizedData.push({
      id: "dummy",
      title: "",
      content: "",
      img: "",
      isDummy: true,
    });
  }

  return (
    <View className="flex flex-row flex-wrap">
      {normalizedData.map((item) => {
        if (item.isDummy) {
          // 더미 아이템은 보이지 않지만 공간은 차지
          return (
            <View
              key={item.id}
              style={{
                width: "50%",
                height: 0,
                margin: 0,
                padding: 0,
                opacity: 0,
              }}
            />
          );
        }
        return (
          <TouchableOpacity
            key={item.id}
            style={{ width: "50%", padding: 5 }}
            onPress={() => handleCardPress(item)}
            activeOpacity={0.8}
          >
            <View
              style={{
                padding: 12,
                borderRadius: 12,
                backgroundColor: "white",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.1,
                shadowRadius: 2,
                elevation: 2,
                height: 200,
              }}
            >
              <Image
                source={{
                  uri: item.img,
                }}
                style={{ width: "100%", height: 112, borderRadius: 8 }}
              />
              <View
                style={{
                  marginTop: 8,
                  gap: 8,
                  flex: 1,
                  justifyContent: "flex-start",
                }}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    color: "#333333",
                    fontSize: 14,
                    marginBottom: 4,
                  }}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {item.title}
                </Text>
                <Text
                  style={{ fontSize: 12, color: "#666666", lineHeight: 18 }}
                  numberOfLines={3}
                  ellipsizeMode="tail"
                >
                  {item.content}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      })}

      {/* 바텀시트 */}
      {selectedItem && (
        <BottomSheet
          visible={bottomSheetVisible}
          onClose={() => setBottomSheetVisible(false)}
          title={selectedItem.title}
          content={selectedItem.detailContent || selectedItem.content}
          imageUrl={selectedItem.img}
        />
      )}
    </View>
  );
}

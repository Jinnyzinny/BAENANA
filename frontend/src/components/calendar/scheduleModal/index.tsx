import { X } from "lucide-react-native";
import {
  Image,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { FormatDate } from "../../../utils/formatDate";
import { ScheduleButton } from "../scheduleButton";
import { PeriodInfo } from "../periodInfo";
import dailyMock from "../../../mocks/daily.json";
import { Daily } from "../../../types/Daily";
import { HospitalInfo } from "../hospitalInfo";

export function ScheduleModal({
  visible,
  date,
  onClose,
  handleBottomSheet,
}: {
  visible: boolean;
  date: string | null;
  onClose: () => void;
  handleBottomSheet: (type: "hospital" | "medicine" | "symptom") => void;
}) {
  // 임시 데이터(추후 변경 예정)
  const data = dailyMock as Daily;

  return (
    <Modal
      visible={visible}
      transparent
      statusBarTranslucent
      animationType="slide"
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View className="flex-1 justify-center items-center bg-black/50">
          {/* 모달 내부 */}
          <View className="w-[90%] max-h-[70%] bg-white rounded-xl gap-3">
            {/* 헤더 - 이미지 / 선택한 날짜 / 닫기 */}
            <View className="px-5 pt-5 flex-row items-center justify-between">
              <View className="flex-row items-center gap-1">
                <Image
                  source={require("../../../assets/images/mascot.png")}
                  className="w-10 h-10"
                />
                <Text className="text-lg font-bold">{FormatDate(date)}</Text>
              </View>
              <TouchableOpacity onPress={onClose}>
                <X color="#A3A3A3" size={24} />
              </TouchableOpacity>
            </View>
            {/* 본문 */}
            <ScrollView
              contentContainerStyle={{ flexGrow: 1, paddingBottom: 24 }}
            >
              <View className="px-5 pb-5 gap-2">
                {/* 토글 - 주기 관련 정보 */}
                <PeriodInfo data={data} />
                <View className="w-full h-[0.5px] my-3 bg-neutral-300" />

                {/* 토글 - 병원 관련 정보보 */}
                <HospitalInfo data={data} />
                <View className="w-full h-[0.5px] my-3 bg-neutral-300" />

                {/* 토글 형태의 컴포넌트 추가 예정 */}
                {/* 안내선 */}
                {/* <View className="w-full h-[0.5px] my-3 bg-neutral-300" /> */}

                {/* 버튼 - 병원 예약 / 복용약 알림 / 월경 증상 입력 */}
                <View className="gap-3">
                  <View className="flex-row gap-3">
                    <ScheduleButton
                      type="hospital"
                      onPress={() => handleBottomSheet("hospital")}
                    />
                    <ScheduleButton
                      type="medicine"
                      onPress={() => handleBottomSheet("medicine")}
                    />
                  </View>
                  <View className="flex-row">
                    <ScheduleButton
                      type="period"
                      onPress={() => handleBottomSheet("symptom")}
                    />
                  </View>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

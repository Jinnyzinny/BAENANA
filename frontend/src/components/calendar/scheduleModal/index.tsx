import { useFocusEffect } from "@react-navigation/native";
import { X } from "lucide-react-native";
import { useCallback, useEffect, useState } from "react";
import {
  Image,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useGetDaily } from "../../../api/quries/daily";
import { Daily } from "../../../types/Daily";
import { FormatDate } from "../../../utils/formatDate";
import { IsInRange } from "../../../utils/isInRange";
import { HospitalInfo } from "../hospitalInfo";
import { MedicineInfo } from "../medicineInfo";
import { PeriodInfo } from "../periodInfo";
import { ScheduleButton } from "../scheduleButton";

export function ScheduleModal({
  visible,
  date,
  onClose,
  handleBottomSheet,
}: {
  visible: boolean;
  date: string;
  onClose: () => void;
  handleBottomSheet: (type: "hospital" | "medicine" | "symptom") => void;
}) {
  const year = date ? Number(date.slice(0, 4)) : null;
  const month = date ? Number(date.slice(5, 7)) : null;
  const day = date ? Number(date.slice(8, 10)) : null;

  const { data: dailyData, refetch } = useGetDaily(
    year,
    month,
    day,
    visible && !!date
  );

  const [data, setData] = useState<Daily>({
    date: "",
    prediction: false,
    menstrual_cycle: {
      start_date: "",
      end_date: "",
    },
    menstrual_daily_log: {
      bleeding_level: 0,
      pain_level: 0,
      symptom: [],
    },
    hospital_reservation: [],
    medication: [],
  });

  useEffect(() => {
    if (dailyData?.data) {
      const corrected: Daily = {
        date: dailyData.data.date ?? "",
        prediction: dailyData.data.prediction ?? false,
        menstrual_cycle: dailyData.data.menstrual_cycle ?? {
          start_date: "",
          end_date: "",
        },
        menstrual_daily_log: dailyData.data.menstrual_daily_log ?? {
          bleeding_level: 0,
          pain_level: 0,
          symptom: [],
        },
        hospital_reservation: dailyData.data.hospital_reservation ?? [],
        medication: dailyData.data.medication ?? [],
      };

      setData(corrected);
    }
  }, [dailyData]);

  console.log("data 변경 완료: ", data);

  useFocusEffect(
    useCallback(() => {
      if (visible && date) {
        refetch();
      }
    }, [visible, date])
  );

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
          <TouchableWithoutFeedback onPress={() => {}}>
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
                  {/* 실제 주기 데이터를 받아와서 그 날짜 안에 있는 경우 */}

                  {IsInRange(
                    date,
                    data.menstrual_cycle.start_date,
                    data.menstrual_cycle.end_date
                  ) && (
                    <>
                      <PeriodInfo data={data} />

                      <View
                        className="w-full my-3 bg-neutral-300"
                        style={{ height: 1 }}
                      />
                    </>
                  )}

                  {/* 토글 - 병원 관련 정보 */}
                  {data.hospital_reservation.length > 0 && (
                    <>
                      <HospitalInfo data={data} />
                      <View
                        className="w-full my-3 bg-neutral-300"
                        style={{ height: 1 }}
                      />
                    </>
                  )}

                  {/* 토글 - 복용약 관련 정보 */}
                  {data.medication.length > 0 && (
                    <>
                      <MedicineInfo data={data} />
                      <View
                        className="w-full my-3 bg-neutral-300"
                        style={{ height: 1 }}
                      />
                    </>
                  )}

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
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

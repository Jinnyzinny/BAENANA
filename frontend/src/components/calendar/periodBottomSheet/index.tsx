import { useState } from "react";
import {
  Image,
  Modal,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useAddPeriod } from "../../../api/quries/period";
import { CustomButton } from "../../common/customButton";
import { DateDropdown } from "../../common/dateDropdown";

export function PeriodBottomSheet({
  visible,
  onClose,
  period,
}: {
  visible: boolean;
  onClose: () => void;
  period: number;
}) {
  const selectedDate = new Date();
  const startYear = selectedDate.getFullYear();
  const startMonth = selectedDate.getMonth() + 1;
  const startDay = selectedDate.getDate();

  const selectedDateEnd = new Date(
    selectedDate.getTime() + period * 24 * 60 * 60 * 1000
  );
  const endYear = selectedDateEnd.getFullYear();
  const endMonth = selectedDateEnd.getMonth() + 1;
  const endDay = selectedDateEnd.getDate();

  const [startDate, setStartDate] = useState<Date | null>(selectedDate);
  const [endDate, setEndDate] = useState<Date | null>(selectedDateEnd);

  const { mutate: addPeriod } = useAddPeriod();

  function handleSave() {
    if (startDate && endDate) {
      const start = `${startDate.getFullYear()}-${String(startDate.getMonth() + 1).padStart(2, "0")}-${String(startDate.getDate()).padStart(2, "0")}`;
      const end = `${endDate.getFullYear()}-${String(endDate.getMonth() + 1).padStart(2, "0")}-${String(endDate.getDate()).padStart(2, "0")}`;

      console.log("월경 시작일:", start);
      console.log("월경 종료일:", end);

      addPeriod(
        { startDate: start, endDate: end },
        {
          onSuccess: () => {
            onClose();
          },
          onError: (error) => {
            console.error("월경 기간 등록 실패:", error);
          },
        }
      );
    }
  }

  return (
    <Modal
      visible={visible}
      transparent
      statusBarTranslucent
      animationType="fade"
    >
      <TouchableWithoutFeedback onPress={() => onClose()}>
        <View className="flex-1 justify-end items-center bg-black/50">
          {/* 모달 내부 */}
          <TouchableWithoutFeedback onPress={() => {}}>
            <View className="w-[100%] max-h-[80%] bg-white rounded-t-xl pb-20">
              {/* 헤더 */}
              <View className="mx-5 mt-7 mb-5 flex-row items-start justify-start gap-2">
                <Image
                  source={require("../../../assets/images/mascot.png")}
                  className="w-10 h-10"
                />
                <Text className="text-lg font-bold self-center">
                  월경일 입력
                </Text>
              </View>
              <ScrollView>
                <View className="mx-7 gap-7">
                  {/* 월경 시작일 */}
                  <View className="gap-3">
                    <Text className="text-neutral-800 text-sm font-bold ">
                      월경 시작일
                    </Text>
                    <View className="flex-row mx-5 items-center justify-between">
                      <DateDropdown
                        year={startYear}
                        month={startMonth}
                        day={startDay}
                        onChange={setStartDate}
                      />
                    </View>
                  </View>

                  {/* 월경 종료일 */}
                  <View className="gap-3">
                    <Text className="text-neutral-800 text-sm font-bold ">
                      월경 종료일
                    </Text>
                    <View className="flex-row mx-5 items-center justify-between">
                      <DateDropdown
                        year={endYear}
                        month={endMonth}
                        day={endDay}
                        onChange={setEndDate}
                      />
                    </View>
                  </View>

                  {/* 저장 버튼 */}
                  <View className="mt-10">
                    <CustomButton
                      fill={true}
                      content="저장"
                      onPress={handleSave}
                    />
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

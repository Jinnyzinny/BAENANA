import { ChevronDown, ChevronUp, SquarePen, Trash2 } from "lucide-react-native";
import { useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import {
  useDeletePeriodSymptom,
  useEditPeriodSymptom,
} from "../../../api/quries/period";
import { Daily } from "../../../types/Daily";
import { periodDate } from "../../../utils/Date";
import { CustomButton } from "../../common/customButton";
import { SelectTag } from "../../common/selectTag";
import { SelectLevel } from "../selectLevel";

export function PeriodInfo({ data }: { data: Daily }) {
  const color: string = "#A3A3A3";
  const size: number = 18;
  const [isToggleOpen, setIsToggleOpen] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const [selectedPeriod, setSelectedPeriod] = useState<0 | 1 | 2 | 3 | 4 | 5>(
    data.menstrual_daily_log?.bleeding_level
  );
  const [selectedStress, setSelectedStress] = useState<0 | 1 | 2 | 3 | 4 | 5>(
    data.menstrual_daily_log?.pain_level
  );
  const [symptom, setSymptom] = useState<string[]>([
    ...(data.menstrual_daily_log?.symptom ?? []),
  ]);
  const symptomItems = [
    { id: 1, label: "복통" },
    { id: 2, label: "두통" },
    { id: 3, label: "요통" },
    { id: 4, label: "메스꺼움" },
    { id: 5, label: "피로" },
    { id: 6, label: "우울" },
  ];

  const { mutate: editPeriodSymptom } = useEditPeriodSymptom();
  const { mutate: deletePeriodSymptom } = useDeletePeriodSymptom();

  function handleSymptom(label: string) {
    // 선택된 증상 선택 시 배열에서 삭제, 선택되지 않은 증상 선택 시 배열에 추가
    setSymptom((prev) =>
      prev.includes(label) ? prev.filter((s) => s !== label) : [...prev, label]
    );
  }

  // 수정 시 토글 열기, 상태 변경
  function handleEdit() {
    resetForm();
    setIsEdit(true);
    setIsToggleOpen(true);
  }

  // 수정 취소(입력 내용 초기화, 상태 변경)
  function cancelEdit() {
    resetForm();
    setIsEdit(false);
  }

  // 수정 내용 저장(상태 변경)
  function saveEdit() {
    console.log(symptom);
    editPeriodSymptom({
      cycleId: data.menstrual_daily_log.daily_id,
      date: data.date,
      bleedingLevel: selectedPeriod,
      painLevel: selectedStress,
      symptom: symptom,
    });
    setIsEdit(false);
  }

  // 초기화
  function resetForm() {
    setSelectedPeriod(data.menstrual_daily_log?.bleeding_level ?? 0);
    setSelectedStress(data.menstrual_daily_log?.pain_level ?? 0);
    setSymptom([...(data.menstrual_daily_log?.symptom ?? [])]);
  }

  // 삭제
  function handleDelete() {
    Alert.alert("삭제", "입력된 내용을 삭제하시겠습니까?", [
      {
        text: "취소",
        style: "cancel",
      },
      {
        text: "확인",
        style: "destructive",
        onPress: () => deletePeriodSymptom(data.menstrual_daily_log.daily_id),
      },
    ]);
  }

  return (
    <View className="gap-3">
      {/* 헤더 - 제목 / 수정 / 삭제 / 토글 */}
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-2">
          <Text className="text-neutral-800 text-lg font-bold">
            {periodDate(data.menstrual_cycle.start_date, data.date)}
          </Text>
          <View className="pt-1 flex-row items-center gap-1">
            {/* 수정 버튼 */}
            <TouchableOpacity onPress={handleEdit}>
              <SquarePen color={color} size={size - 2} />
            </TouchableOpacity>
            {/* 삭제 버튼 */}
            <TouchableOpacity onPress={handleDelete}>
              <Trash2 color={color} size={size - 2} />
            </TouchableOpacity>
          </View>
        </View>
        {/* 토글 */}
        <TouchableOpacity onPress={() => setIsToggleOpen(!isToggleOpen)}>
          {isToggleOpen ? (
            <ChevronUp color={color} size={size} />
          ) : (
            <ChevronDown color={color} size={size} />
          )}
        </TouchableOpacity>
      </View>

      {/* 본문 */}
      {isToggleOpen &&
        (isEdit ? (
          // 수정 중인 경우
          <>
            {/* 출혈량 */}
            <View className="gap-3">
              <Text className="text-neutral-800 text-sm font-bold ">
                출혈량
              </Text>
              <View className="mx-5">
                <SelectLevel
                  selected={selectedPeriod}
                  setSelected={setSelectedPeriod}
                  contents={["매우 적음", "보통", "매우 많음"]}
                />
              </View>
            </View>
            {/* 스트레스 지수 */}
            <View className="gap-3">
              <Text className="text-neutral-800 text-sm font-bold ">
                스트레스 지수
              </Text>
              <View className="mx-5">
                <SelectLevel
                  selected={selectedStress}
                  setSelected={setSelectedStress}
                  contents={["매우 낮음", "보통", "매우 높음"]}
                />
              </View>
            </View>
            {/* 증상 */}
            <View className="gap-3">
              <Text className="text-neutral-800 text-sm font-bold ">증상</Text>
              <View className="gap-3">
                {/* 증상: 복통 / 두통 / 요통 / 메스꺼움 */}
                <View className="mx-5 flex-row gap-2 flex-wrap">
                  {symptomItems.slice(0, 4).map((item) => (
                    <TouchableOpacity
                      key={item.id}
                      onPress={() => handleSymptom(item.label)}
                    >
                      <SelectTag
                        fill={symptom.includes(item.label)}
                        content={item.label}
                      />
                    </TouchableOpacity>
                  ))}
                </View>
                {/* 증상: 피로 / 우울 */}
                <View className="mx-5 flex-row gap-2">
                  {symptomItems.slice(4).map((item) => (
                    <TouchableOpacity
                      key={item.id}
                      onPress={() => handleSymptom(item.label)}
                    >
                      <SelectTag
                        fill={symptom.includes(item.label)}
                        content={item.label}
                      />
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>
            <View className="pt-5 flex-row gap-3">
              <View className="flex-1">
                <CustomButton
                  fill={false}
                  content="취소"
                  onPress={cancelEdit}
                />
              </View>
              <View className="flex-1">
                <CustomButton fill={true} content="저장" onPress={saveEdit} />
              </View>
            </View>
          </>
        ) : (
          // 수정하지 않는 경우
          <>
            {/* 출혈량 */}
            <View className="gap-3">
              <Text className="text-neutral-800 text-sm font-bold ">
                출혈량
              </Text>
              <View className="mx-5">
                <SelectLevel
                  selected={data.menstrual_daily_log?.bleeding_level}
                  setSelected={() => {}}
                  contents={["매우 적음", "보통", "매우 많음"]}
                />
              </View>
            </View>
            {/* 스트레스 지수 */}
            <View className="gap-3">
              <Text className="text-neutral-800 text-sm font-bold ">
                스트레스 지수
              </Text>
              <View className="mx-5">
                <SelectLevel
                  selected={data.menstrual_daily_log?.pain_level}
                  setSelected={() => {}}
                  contents={["매우 낮음", "보통", "매우 높음"]}
                />
              </View>
            </View>
            {/* 증상 */}
            <View className="gap-3">
              <Text className="text-neutral-800 text-sm font-bold ">증상</Text>
              <View className="gap-3">
                {/* 증상: 복통 / 두통 / 요통 / 메스꺼움 */}
                <View className="mx-5 flex-row gap-2 flex-wrap">
                  {symptomItems.slice(0, 4).map((item) => (
                    <TouchableOpacity key={item.id} onPress={() => {}}>
                      <SelectTag
                        fill={data.menstrual_daily_log?.symptom.includes(
                          item.label
                        )}
                        content={item.label}
                      />
                    </TouchableOpacity>
                  ))}
                </View>
                {/* 증상: 피로 / 우울 */}
                <View className="mx-5 flex-row gap-2">
                  {symptomItems.slice(4).map((item) => (
                    <TouchableOpacity key={item.id} onPress={() => {}}>
                      <SelectTag
                        fill={data.menstrual_daily_log?.symptom.includes(
                          item.label
                        )}
                        content={item.label}
                      />
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>
          </>
        ))}
    </View>
  );
}

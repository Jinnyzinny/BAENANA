import { RefObject, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Modalize } from "react-native-modalize";
import { Button } from "../../common/button";
import { SelectNumber } from "../../common/selectNumber";
import { Tag } from "../../common/tag";
import { LevelSelectBox } from "../levelSelectBox";

export function PeriodBottomSheet({
  height,
  sheetRef,
  selectedDate,
}: {
  height: number;
  sheetRef: RefObject<Modalize | null>;
  selectedDate: string | null;
}) {
  const [selectedPeriod, setSelectedPeriod] = useState<0 | 1 | 2 | 3 | 4 | 5>(
    0
  );
  const [selectedStress, setSelectedStress] = useState<0 | 1 | 2 | 3 | 4 | 5>(
    0
  );
  const [symptom, setSymptom] = useState<number[]>([]);
  const symptomItems = [
    { id: 1, label: "복통" },
    { id: 2, label: "두통" },
    { id: 3, label: "요통" },
    { id: 4, label: "메스꺼움" },
    { id: 5, label: "피로" },
    { id: 6, label: "우울" },
  ];
  const year = Number(selectedDate?.slice(0, 4));
  const month = Number(selectedDate?.slice(5, 7));
  const day = Number(selectedDate?.slice(8, 10));

  function handleSymptom(id: number) {
    // 선택된 증상 선택 시 배열에서 삭제, 선택되지 않은 증상 선택 시 배열에 추가
    setSymptom((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  }

  return (
    <Modalize ref={sheetRef} snapPoint={height * 0.8}>
      {/* 헤더 */}
      <View className="m-5 flex-row items-start justify-start gap-2">
        <Image
          source={require("../../../assets/images/mascot.png")}
          className="w-10 h-10"
        />
        <Text className="text-lg font-bold self-center">월경일 입력</Text>
      </View>
      <ScrollView>
        <View className="mx-7 gap-5">
          {/* 월경 시작일 */}
          <View className="gap-3">
            <Text className="text-neutral-800 text-sm font-bold ">
              월경 시작일
            </Text>
            <View className="flex-row mx-5 items-center justify-between">
              {/* 연 */}
              <SelectNumber
                min={1}
                max={9999}
                initial={year}
                onChange={() => {}}
              />

              {/* 월 */}
              <SelectNumber
                min={1}
                max={12}
                initial={month}
                onChange={() => {}}
              />

              {/* 일 */}
              <SelectNumber
                min={1}
                max={31}
                initial={day}
                onChange={() => {}}
              />
            </View>
          </View>

          {/* 월경 종료일 */}
          <View className="gap-3">
            <Text className="text-neutral-800 text-sm font-bold ">
              월경 종료일
            </Text>
            <View className="flex-row mx-5 items-center justify-between">
              {/* 연 */}
              <SelectNumber
                min={1}
                max={9999}
                initial={year}
                onChange={() => {}}
              />

              {/* 월 */}
              <SelectNumber
                min={1}
                max={12}
                initial={month}
                onChange={() => {}}
              />

              {/* 일 */}
              <SelectNumber
                min={1}
                max={31}
                initial={day}
                onChange={() => {}}
              />
            </View>
          </View>

          {/* 출혈량 입력 (선택) */}
          <View className="gap-3">
            <Text className="text-violet-700 text-sm font-bold ">
              출혈량 입력 (선택)
            </Text>
            <View className="mx-5">
              <LevelSelectBox
                selected={selectedPeriod}
                setSelected={setSelectedPeriod}
                contents={["매우 적음", "보통", "매우 많음"]}
              />
            </View>
          </View>

          {/* 스트레스 지수 입력 (선택) */}
          <View className="gap-3">
            <Text className="text-neutral-800 text-sm font-bold ">
              스트레스 지수 입력 (선택)
            </Text>
            <View className="mx-5">
              <LevelSelectBox
                selected={selectedStress}
                setSelected={setSelectedStress}
                contents={["매우 낮음", "보통", "매우 높음"]}
              />
            </View>
          </View>

          {/* 증상 입력 (선택) */}
          <View className="gap-3">
            <Text className="text-neutral-800 text-sm font-bold ">
              증상 입력 (선택)
            </Text>
            <View className="gap-2">
              {/* 증상: 복통 / 두통 / 요통 / 메스꺼움 */}
              <View className="mx-5 flex-row gap-2 flex-wrap">
                {symptomItems.slice(0, 4).map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    onPress={() => handleSymptom(item.id)}
                  >
                    <Tag
                      fill={symptom.includes(item.id)}
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
                    onPress={() => handleSymptom(item.id)}
                  >
                    <Tag
                      fill={symptom.includes(item.id)}
                      content={item.label}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>

          {/* 저장 버튼 */}
          <Button fill={true} content="저장" onPress={() => {}} />
        </View>
      </ScrollView>
    </Modalize>
  );
}

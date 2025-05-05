import { RefObject, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Modalize } from "react-native-modalize";
import { TextInput } from "react-native-gesture-handler";
import { DateDropdown } from "../../common/dateDropdown";
import { TimeDropdown } from "../../common/timeDropdown";
import { CustomButton } from "../../common/customButton";
import { SelectTag } from "../../common/selectTag";

export function HospitalBottomSheet({
  height,
  sheetRef,
  selectedDate,
}: {
  height: number;
  sheetRef: RefObject<Modalize | null>;
  selectedDate: string | null;
}) {
  const [hospitalName, setHospitalName] = useState<string>("");
  const year = Number(selectedDate?.slice(0, 4));
  const month = Number(selectedDate?.slice(5, 7));
  const day = Number(selectedDate?.slice(8, 10));
  const [reservationDate, setReservationDate] = useState<Date | null>(null);
  const [reservationTime, setReservationTime] = useState<Date | null>(null);

  const [purpose, setPurpose] = useState<number>(0);
  const purposeItems = [
    { id: 1, label: "검진" },
    { id: 2, label: "초음파" },
    { id: 3, label: "배란확인" },
    { id: 4, label: "상담" },
    { id: 5, label: "기타" },
  ];
  const [purposeInput, setPurposeInput] = useState<string>("");

  return (
    <Modalize ref={sheetRef} snapPoint={height * 0.76}>
      {/* 헤더 */}
      <View className="mx-5 mt-7 mb-5 flex-row items-start justify-start gap-2">
        <Image
          source={require("../../../assets/images/mascot.png")}
          className="w-10 h-10"
        />
        <Text className="text-lg font-bold self-center">
          병원 예약 일정 입력
        </Text>
      </View>
      <ScrollView>
        <View className="mx-7 gap-7">
          {/* 병원 이름 입력 */}
          <View className="gap-3">
            <Text className="text-neutral-800 text-sm font-bold ">
              병원 이름
            </Text>
            <View className="mx-5 border-b border-neutral-400">
              <View className="relative justify-center h-12">
                {hospitalName === "" && (
                  <Text className="absolute left-3 text-neutral-400 font-bold text-lg">
                    병원 이름을 입력해주세요.
                  </Text>
                )}
                <TextInput
                  className="pl-3 h-12 font-bold text-lg"
                  value={hospitalName}
                  onChangeText={setHospitalName}
                />
              </View>
            </View>
          </View>

          {/* 예약 일시 */}
          <View className="gap-3">
            <Text className="text-neutral-800 text-sm font-bold ">
              예약 일시
            </Text>
            <View className="flex-row mx-5 items-center justify-between">
              <DateDropdown
                year={year}
                month={month}
                day={day}
                title="병원 예약 일시"
                onChange={setReservationDate}
              />
            </View>
          </View>

          {/* 예약 시간 */}
          <View className="gap-3">
            <Text className="text-neutral-800 text-sm font-bold ">
              예약 시간
            </Text>
            <View className="mx-5">
              <TimeDropdown title="예약 시간" onChange={setReservationTime} />
            </View>
          </View>

          {/* 방문 목적 */}
          <View className="gap-3">
            <Text className="text-neutral-800 text-sm font-bold">
              방문 목적
            </Text>
            <View className="gap-3">
              {/* 검진 / 초음파 / 배란확인 / 상담 */}
              <View className="mx-5 flex-row gap-2 flex-wrap">
                {purposeItems.slice(0, 4).map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    onPress={() => {
                      setPurpose(item.id);
                      setPurposeInput("");
                    }}
                  >
                    <SelectTag
                      fill={purpose === item.id}
                      content={item.label}
                    />
                  </TouchableOpacity>
                ))}
              </View>

              {/* 기타 + 입력창 (조건부 렌더링) */}
              <View className="mx-5 flex-row gap-2">
                {purposeItems.slice(4).map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    onPress={() => setPurpose(item.id)}
                  >
                    <SelectTag
                      fill={purpose === item.id}
                      content={item.label}
                    />
                  </TouchableOpacity>
                ))}
              </View>

              {/* 입력창 */}
              {purpose === 5 && (
                <View className="flex-1 mx-5 border-b border-neutral-400 relative justify-center">
                  {purposeInput === "" && (
                    <Text
                      className="absolute text-neutral-400 text-sm"
                      style={{ left: 5 }}
                    >
                      방문 목적을 입력해주세요.
                    </Text>
                  )}
                  <TextInput
                    value={purposeInput}
                    onChangeText={setPurposeInput}
                    className="text-sm pl-1"
                  />
                </View>
              )}
            </View>
          </View>

          {/* 저장 버튼 */}
          <View className="mt-10">
            <CustomButton fill={true} content="저장" onPress={() => {}} />
          </View>
        </View>
      </ScrollView>
    </Modalize>
  );
}

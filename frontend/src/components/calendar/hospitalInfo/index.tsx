import { ChevronDown, ChevronUp, SquarePen, Trash2 } from "lucide-react-native";
import { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Daily } from "../../../types/Daily";
import { CustomButton } from "../../common/customButton";
import { DateDropdown } from "../../common/dateDropdown";
import { SelectTag } from "../../common/selectTag";
import { TimeDropdown } from "../../common/timeDropdown";
import { deleteHospitalReservation } from "../../../api/hospital";
import { useDeleteHospitalReservation } from "../../../api/quries/hospital";

export function HospitalInfo({ data }: { data: Daily }) {
  const color: string = "#A3A3A3";
  const size: number = 18;

  const [isToggleOpenList, setIsToggleOpenList] = useState<boolean[]>(
    data.hospital_reservation.map(() => false)
  );
  const [isEditList, setIsEditList] = useState<boolean[]>(
    data.hospital_reservation.map(() => false)
  );

  const [hospitalNameList, setHospitalNameList] = useState<string[]>(
    data.hospital_reservation.map((r) => r.hospital_name)
  );

  const [reservationDateList, setReservationDateList] = useState<
    (Date | null)[]
  >(data.hospital_reservation.map(() => null));
  const [reservationTimeList, setReservationTimeList] = useState<
    (Date | null)[]
  >(data.hospital_reservation.map(() => null));

  const purposeItems = [
    { id: 1, label: "검진" },
    { id: 2, label: "초음파" },
    { id: 3, label: "배란확인" },
    { id: 4, label: "상담" },
    { id: 5, label: "기타" },
  ];

  const [purposeList, setPurposeList] = useState<number[]>(
    data.hospital_reservation.map((r) => {
      const matched = purposeItems.find((i) => r.purpose.startsWith(i.label));
      return matched?.id ?? 0;
    })
  );

  const [purposeInputList, setPurposeInputList] = useState<string[]>(
    data.hospital_reservation.map((r) =>
      r.purpose.startsWith("기타") ? r.purpose.replace(/^기타:\s?/, "") : ""
    )
  );

  const { mutate: deleteHospitalReservation } = useDeleteHospitalReservation();

  function handleEdit(index: number) {
    const toggleCopy = [...isToggleOpenList];
    const editCopy = [...isEditList];
    toggleCopy[index] = true;
    editCopy[index] = true;
    setIsToggleOpenList(toggleCopy);
    setIsEditList(editCopy);
  }

  function cancelEdit(index: number) {
    const editCopy = [...isEditList];
    editCopy[index] = false;
    setIsEditList(editCopy);
  }

  function saveEdit(index: number) {
    const editCopy = [...isEditList];
    editCopy[index] = false;
    setIsEditList(editCopy);
    // 저장 로직 추가 시 여기에
  }

  function handleDelete(index: number) {
    const id = data.hospital_reservation[index].reservation_id;
    Alert.alert("삭제", "입력된 내용을 삭제하시겠습니까?", [
      { text: "취소", style: "cancel" },
      {
        text: "확인",
        style: "destructive",
        onPress: () => {
          deleteHospitalReservation(id);
        },
      },
    ]);
  }

  return (
    <View className="gap-4">
      {data.hospital_reservation.map((reservation, index) => {
        const isEdit = isEditList[index];
        const isToggleOpen = isToggleOpenList[index];
        const hospitalName = hospitalNameList[index];
        const year = Number(reservation.reservation_date.slice(0, 4));
        const month = Number(reservation.reservation_date.slice(5, 7));
        const day = Number(reservation.reservation_date.slice(8, 10));
        const hour = Number(reservation.reservation_date.slice(11, 13));
        const minute = Number(reservation.reservation_date.slice(14, 16));
        const purpose = purposeList[index];
        const purposeInput = purposeInputList[index];

        return (
          <View className="gap-3" key={reservation.reservation_date + index}>
            {/* 헤더 */}
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center gap-2">
                <Text className="text-neutral-800 text-lg font-bold">
                  {reservation.reservation_date.slice(11, 16)}{" "}
                  {reservation.hospital_name}
                </Text>
                <View className="pt-1 flex-row items-center gap-1">
                  <TouchableOpacity onPress={() => handleEdit(index)}>
                    <SquarePen color={color} size={size - 2} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleDelete(index)}>
                    <Trash2 color={color} size={size - 2} />
                  </TouchableOpacity>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => {
                  const copy = [...isToggleOpenList];
                  copy[index] = !copy[index];
                  setIsToggleOpenList(copy);
                }}
              >
                {isToggleOpen ? (
                  <ChevronUp color={color} size={size} />
                ) : (
                  <ChevronDown color={color} size={size} />
                )}
              </TouchableOpacity>
            </View>

            {isToggleOpen &&
              (isEdit ? (
                <>
                  {/* 병원 이름 */}
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
                          onChangeText={(text) => {
                            const copy = [...hospitalNameList];
                            copy[index] = text;
                            setHospitalNameList(copy);
                          }}
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
                        onChange={(date) => {
                          const copy = [...reservationDateList];
                          copy[index] = date;
                          setReservationDateList(copy);
                        }}
                      />
                    </View>
                  </View>

                  {/* 예약 시간 */}
                  <View className="gap-3">
                    <Text className="text-neutral-800 text-sm font-bold ">
                      예약 시간
                    </Text>
                    <View className="mx-5">
                      <TimeDropdown
                        title="예약 시간"
                        hour={hour}
                        minute={minute}
                        onChange={(time) => {
                          const copy = [...reservationTimeList];
                          copy[index] = time;
                          setReservationTimeList(copy);
                        }}
                      />
                    </View>
                  </View>

                  {/* 방문 목적 */}
                  <View className="gap-3">
                    <Text className="text-neutral-800 text-sm font-bold">
                      방문 목적
                    </Text>
                    <View className="gap-3">
                      <View className="mx-5 flex-row gap-2 flex-wrap">
                        {purposeItems.slice(0, 4).map((item) => (
                          <TouchableOpacity
                            key={item.id}
                            onPress={() => {
                              const purposeCopy = [...purposeList];
                              purposeCopy[index] = item.id;
                              setPurposeList(purposeCopy);

                              const inputCopy = [...purposeInputList];
                              inputCopy[index] = "";
                              setPurposeInputList(inputCopy);
                            }}
                          >
                            <SelectTag
                              fill={purpose === item.id}
                              content={item.label}
                            />
                          </TouchableOpacity>
                        ))}
                      </View>

                      <View className="mx-5 flex-row gap-2">
                        <TouchableOpacity
                          onPress={() => {
                            const purposeCopy = [...purposeList];
                            purposeCopy[index] = 5;
                            setPurposeList(purposeCopy);
                          }}
                        >
                          <SelectTag fill={purpose === 5} content="기타" />
                        </TouchableOpacity>
                      </View>

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
                            onChangeText={(text) => {
                              const copy = [...purposeInputList];
                              copy[index] = text;
                              setPurposeInputList(copy);
                            }}
                            className="text-sm pl-1"
                          />
                        </View>
                      )}
                    </View>
                  </View>

                  <View className="pt-5 flex-row gap-3">
                    <View className="flex-1">
                      <CustomButton
                        fill={false}
                        content="취소"
                        onPress={() => cancelEdit(index)}
                      />
                    </View>
                    <View className="flex-1">
                      <CustomButton
                        fill={true}
                        content="저장"
                        onPress={() => saveEdit(index)}
                      />
                    </View>
                  </View>
                </>
              ) : (
                <>
                  {/* 방문 목적 */}
                  <View className="gap-3">
                    <Text className="text-neutral-800 text-sm font-bold">
                      방문 목적
                    </Text>
                    <View className="gap-3">
                      <View className="mx-5 flex-row gap-2 flex-wrap">
                        {purposeItems.slice(0, 4).map((item) => (
                          <TouchableOpacity key={item.id}>
                            <SelectTag
                              fill={purpose === item.id}
                              content={item.label}
                            />
                          </TouchableOpacity>
                        ))}
                      </View>

                      <View className="mx-5 flex-row gap-2">
                        <TouchableOpacity key="etc">
                          <SelectTag fill={purpose === 5} content="기타" />
                        </TouchableOpacity>
                      </View>

                      {purpose === 5 && (
                        <View className="flex-1 mx-5 border-b border-neutral-400 relative justify-center">
                          <Text
                            className="text-neutral-800 text-sm"
                            style={{ marginLeft: 4, marginBottom: 10 }}
                          >
                            {purposeInput}
                          </Text>
                        </View>
                      )}
                    </View>
                  </View>
                </>
              ))}
          </View>
        );
      })}
    </View>
  );
}

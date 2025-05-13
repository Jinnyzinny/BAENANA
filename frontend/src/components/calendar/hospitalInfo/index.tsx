import { ChevronDown, ChevronUp, SquarePen, Trash2 } from "lucide-react-native";
import { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Daily } from "../../../types/Daily";
import { CustomButton } from "../../common/customButton";
import { DateDropdown } from "../../common/dateDropdown";
import { SelectTag } from "../../common/selectTag";
import { TimeDropdown } from "../../common/timeDropdown";

export function HospitalInfo({ data }: { data: Daily }) {
  const color: string = "#A3A3A3";
  const size: number = 18;
  const [isToggleOpen, setIsToggleOpen] = useState<boolean>(false); // 토글 상태(t/f)
  const [isEdit, setIsEdit] = useState<boolean>(false); // 편집 상태(t/f)

  // 병원 이름
  const [hospitalName, setHospitalName] = useState<string>(
    data.hospital_reservation.hospital_name
  );

  const reservationDateRaw = data.hospital_reservation?.reservation_date;
  // 예약 일시 - 초기값
  const year: number = reservationDateRaw
    ? Number(reservationDateRaw.slice(0, 4))
    : 0; // 연
  const month: number = reservationDateRaw
    ? Number(reservationDateRaw.slice(5, 7))
    : 0; // 월
  const day: number = reservationDateRaw
    ? Number(reservationDateRaw.slice(8, 10))
    : 0; // 일
  const hour: number = reservationDateRaw
    ? Number(reservationDateRaw.slice(11, 13))
    : 0; // 시
  const minute: number = reservationDateRaw
    ? Number(reservationDateRaw.slice(14, 16))
    : 0; // 분

  // 예약 일시
  const [reservationDate, setReservationDate] = useState<Date | null>(null);
  const [reservationTime, setReservationTime] = useState<Date | null>(null);

  // 방문 목적 - 리스트
  const purposeItems = [
    { id: 1, label: "검진" },
    { id: 2, label: "초음파" },
    { id: 3, label: "배란확인" },
    { id: 4, label: "상담" },
    { id: 5, label: "기타" },
  ];

  // 방문 목적 - 초기값
  const initPurpose: string = data.hospital_reservation.purpose;

  const matchedItem = purposeItems.find((item) =>
    initPurpose.startsWith(item.label)
  );

  const initialPurposeId = matchedItem?.id ?? 0;
  const initialPurposeInput =
    initialPurposeId === 5 ? initPurpose.replace(/^기타:\s?/, "") : "";

  // 방문 목적
  const [purpose, setPurpose] = useState<number>(initialPurposeId);
  const [purposeInput, setPurposeInput] = useState<string>(initialPurposeInput);

  // 수정 시 토글 열기, 상태 변경
  function handleEdit() {
    setIsEdit(true);
    setIsToggleOpen(true);
  }

  // 수정 취소(입력 내용 초기화, 상태 변경)
  function cancelEdit() {
    setIsEdit(false);
  }

  // 수정 내용 저장(상태 변경)
  function saveEdit() {
    setIsEdit(false);
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
        onPress: () => {},
      },
    ]);
  }

  return (
    <View className="gap-3">
      {/* 헤더 - 제목 / 수정 / 삭제 / 토글 */}
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-2">
          <Text className="text-neutral-800 text-lg font-bold">
            {data.hospital_reservation.reservation_date.slice(11, 16)}{" "}
            {data.hospital_reservation.hospital_name}
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
                    onChangeText={setHospitalName}
                  />
                </View>
              </View>
            </View>

            {/* 병원 예약 일시 */}
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
                <TimeDropdown
                  title="예약 시간"
                  onChange={setReservationTime}
                  hour={hour}
                  minute={minute}
                />
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
            {/* 방문 목적 */}
            <View className="gap-3">
              <Text className="text-neutral-800 text-sm font-bold">
                방문 목적
              </Text>
              <View className="gap-3">
                {/* 검진 / 초음파 / 배란확인 / 상담 */}
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

                {/* 기타 + 입력창 (조건부 렌더링) */}
                <View className="mx-5 flex-row gap-2">
                  {purposeItems.slice(4).map((item) => (
                    <TouchableOpacity key={item.id}>
                      <SelectTag
                        fill={purpose === item.id}
                        content={item.label}
                      />
                    </TouchableOpacity>
                  ))}
                </View>

                {/* 기타: 내용 */}
                {purpose === 5 && (
                  <View className="flex-1 mx-5 border-b border-neutral-400 relative justify-center">
                    <Text
                      className="text-neutral-800 text-sm"
                      style={{ marginLeft: 4, marginBottom: 10 }}
                    >
                      {initialPurposeInput}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </>
        ))}
    </View>
  );
}

import { CalendarPlus, ChevronLeft } from "lucide-react-native";
import { useRef, useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { PhotoFile } from "react-native-vision-camera";
import { CameraView } from "../../components/camera/cameraView";
import { PermissionCheck } from "../../components/common/permissionCheck";
import { useCameraPermission } from "../../hooks/useCameraPermission";
import { Modalize } from "react-native-modalize";
import { CustomButton } from "../../components/common/customButton";
import { SelectNumber } from "../../components/camera/selectNumber";
import {
  formatDateKST,
  getTodayDateString,
  parseDateString,
} from "../../utils/Date";
import { useAddOvulationTest } from "../../api/quries/report";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/types";
import { DateDropdown } from "../../components/common/dateDropdown";

export function CameraScreen() {
  const hasPermission = useCameraPermission();
  const { year, month, day } = parseDateString(getTodayDateString());
  const [date, setDate] = useState<Date>(new Date(year, month - 1, day));
  const [photo, setPhoto] = useState<PhotoFile | null>(null);
  const sheetRef = useRef<Modalize>(null);
  const { height } = useWindowDimensions();
  const [value, setValue] = useState<number>(1);

  const { mutate: addOvulationTest } = useAddOvulationTest();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  async function handlePhotoTaken(newPhoto: PhotoFile) {
    await setPhoto(newPhoto);
    sheetRef.current?.open();
  }

  function handleSave() {
    const dateStr = formatDateKST(date);
    console.log(dateStr, value);
    addOvulationTest(
      { date: dateStr, value },
      {
        onSuccess: () => {
          navigation.reset({
            index: 0,
            routes: [
              {
                name: "Main",
                params: { screen: "Home" },
              },
            ],
          });
        },
      }
    );
  }

  function resetForm() {
    setValue(1);
  }

  if (hasPermission === null) {
    return <PermissionCheck name="카메라" />;
  }

  return (
    <View className="flex-1">
      {photo ? (
        <View className="flex-1">
          {/* 뒤로 가기 버튼 */}
          <TouchableOpacity
            onPress={() => {
              setPhoto(null);
            }}
            className="absolute top-7 left-5 z-10"
          >
            <ChevronLeft color="white" size={40} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => sheetRef.current?.open()}
            className="absolute top-9 right-5 z-10"
          >
            <CalendarPlus color="white" size={30} />
          </TouchableOpacity>

          <Image
            source={{ uri: "file://" + photo.path }}
            className="flex-1 resize-contain"
          />
        </View>
      ) : (
        <CameraView onPhotoTaken={handlePhotoTaken} />
      )}

      <Modalize ref={sheetRef} snapPoint={height * 0.5} onClosed={resetForm}>
        <ScrollView>
          <View className="mx-5">
            {photo && (
              <View>
                {/* 헤더 */}
                <View className="mt-7 mb-5 flex-row items-start justify-start gap-2">
                  <Image
                    source={require("../../assets/images/mascot.png")}
                    className="w-10 h-10"
                  />
                  <Text className="text-lg font-bold self-center">
                    배란테스트 결과 입력
                  </Text>
                </View>
                <View className="gap-12">
                  <View className="gap-7">
                    <View className="gap-3">
                      <Text className="text-neutral-800 text-sm font-bold ">
                        테스트한 날짜
                      </Text>
                      <View className="flex-row mx-5 items-center justify-between">
                        <DateDropdown
                          year={year}
                          month={month}
                          day={day}
                          onChange={setDate}
                        />
                      </View>
                    </View>

                    <View className="gap-3">
                      <Text className="text-neutral-800 text-sm font-bold ">
                        테스트 결과
                      </Text>
                      <View className="flex-row mx-5 items-center justify-between">
                        <SelectNumber initial={value} onChange={setValue} />
                      </View>
                    </View>
                  </View>

                  <CustomButton
                    fill={true}
                    content="저장"
                    onPress={handleSave}
                  />
                </View>
              </View>
            )}
          </View>
        </ScrollView>
      </Modalize>
    </View>
  );
}

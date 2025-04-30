import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { HeaderLogo } from "../../components/common/headerLogo";
import { DoseDate } from "../../components/medicine/doseDate";

export function MedicineScreen() {
  return (
    <SafeAreaView edges={["top", "left", "right"]} className="flex-1">
      <HeaderLogo before={true} settings={true} />
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 32 }}>
        <View className="flex-1 rounded-xl shadow-neutral-300">
          <View className="mx-5 flex-row justify-between">
            <Text className="text-neutral-800 text-lg font-bold">
              전체 복용약
            </Text>
          </View>
          <View className="m-3" />
          {/* 반복문 사용해서 모든 기록 보여줄 예정 */}
          <View className="mx-5 gap-3">
            <View className="p-5 rounded-xl gap-5 bg-white shadow-neutral-300">
              <View className="flex-row justify-between">
                <View className="gap-1">
                  <Text className="text-neutral-800 font-bold">
                    최근 복용약
                  </Text>
                  <View className="flex-row">
                    <Text className="text-neutral-600 text-sm">
                      현재 복용 중인 약은{" "}
                    </Text>
                    <Text className="text-violet-700 text-sm font-bold">
                      1개
                    </Text>
                    <Text className="text-neutral-600 text-sm">입니다.</Text>
                  </View>
                </View>
              </View>
              <View className="gap-2">
                {/* 반복문 사용해서 복용약 보여줄 예정 */}
                <DoseDate
                  name="오가루트란주 주사"
                  start="2025.03.21"
                  end="2025.03.28"
                />
              </View>
            </View>
            <View className="p-5 rounded-xl gap-5 bg-white shadow-neutral-300">
              <View className="flex-row justify-between">
                <View className="gap-1">
                  <Text className="text-neutral-800 font-bold">
                    과거 복용약
                  </Text>
                </View>
              </View>
              <View className="gap-2">
                {/* 반복문 사용해서 복용약 보여줄 예정 */}
                <DoseDate
                  name="고날-에프펜"
                  start="2025.03.21"
                  end="2025.03.28"
                />
                <DoseDate name="타이레놀" start="2025.03.20" end="2025.03.22" />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

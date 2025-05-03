import { Text, TouchableOpacity, View } from "react-native";

export function SelectLevel({
  selected,
  setSelected,
  contents,
}: {
  selected: 0 | 1 | 2 | 3 | 4 | 5;
  setSelected: (level: 0 | 1 | 2 | 3 | 4 | 5) => void;
  contents: string[];
}) {
  return (
    <>
      <View className="border-2 border-violet-400 rounded-xl overflow-hidden">
        <View className="flex-row w-full">
          {/* 첫 번째 선택지 */}
          <TouchableOpacity className="w-1/5" onPress={() => setSelected(1)}>
            <View
              className={`p-4 ${selected >= 1 ? "bg-violet-400" : "bg-violet-50"}`}
            />
          </TouchableOpacity>

          {/* 점선 */}
          <View
            className="h-full w-[1px] border-l border-violet-400"
            style={{ borderStyle: "dashed" }}
          />

          {/* 두 번째 선택지 */}
          <TouchableOpacity className="w-1/5" onPress={() => setSelected(2)}>
            <View
              className={`p-4 ${selected >= 2 ? "bg-violet-400" : "bg-violet-50"}`}
            />
          </TouchableOpacity>

          {/* 점선 */}
          <View
            className="h-full w-[1px] border-l border-violet-400"
            style={{ borderStyle: "dashed" }}
          />

          {/* 세 번째 선택지 */}
          <TouchableOpacity className="w-1/5" onPress={() => setSelected(3)}>
            <View
              className={`p-4 ${selected >= 3 ? "bg-violet-400" : "bg-violet-50"}`}
            />
          </TouchableOpacity>

          {/* 점선 */}
          <View
            className="h-full w-[1px] border-l border-violet-400"
            style={{ borderStyle: "dashed" }}
          />

          {/* 네 번째 선택지 */}
          <TouchableOpacity className="w-1/5" onPress={() => setSelected(4)}>
            <View
              className={`p-4 ${selected >= 4 ? "bg-violet-400" : "bg-violet-50"}`}
            />
          </TouchableOpacity>

          {/* 점선 */}
          <View
            className="h-full w-[1px] border-l border-violet-400"
            style={{ borderStyle: "dashed" }}
          />

          {/* 다섯 번째 선택지 */}
          <TouchableOpacity className="w-1/5" onPress={() => setSelected(5)}>
            <View
              className={`p-4 ${selected >= 5 ? "bg-violet-400" : "bg-violet-50"}`}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View className="flex-row justify-between items-center pt-1">
        <Text className="text-xs font-medium text-violet-400">
          {contents[0]}
        </Text>
        <Text className="text-xs font-medium text-violet-400">
          {contents[1]}
        </Text>
        <Text className="text-xs font-medium text-violet-400">
          {contents[2]}
        </Text>
      </View>
    </>
  );
}

import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { useGetCategoryHealthInfo } from "../../../api/quries/healthInfo";

export function InfoCard({
  onPress,
  selectedNumber,
}: {
  onPress: (id: number) => void;
  selectedNumber: number;
}) {
  const { data, refetch } = useGetCategoryHealthInfo(selectedNumber);
  const navigation = useNavigation();
  const paddedData = (() => {
    const safeData = data ?? [];
    return safeData.length % 2 === 0
      ? safeData
      : [
          ...safeData,
          {
            id: "placeholder",
            title: "",
            imageUrl: "",
            createdAt: "",
          },
        ];
  })();

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      console.log("🔄건강 정보 목록 포커스 → 게시글 다시 불러오기");
      refetch();
    });

    return unsubscribe;
  }, [navigation, refetch]);

  return (
    <FlatList
      data={paddedData}
      numColumns={2}
      scrollEnabled={false}
      columnWrapperStyle={{ gap: 12 }}
      contentContainerStyle={{ gap: 12 }}
      keyExtractor={(item) => item.title}
      renderItem={({ item }) => {
        if (item.id === "placeholder") {
          return (
            <View className="flex-1">
              <View className="p-3 rounded-xl bg-white opacity-0" />
            </View>
          );
        }

        return (
          <TouchableOpacity
            className="flex-1"
            onPress={() => onPress(item.id as number)}
          >
            <View className="flex-1">
              <View className="flex-1 p-3 rounded-xl gap-7 bg-white shadow-neutral-300">
                <Image
                  source={{ uri: item.imageUrl }}
                  className="w-full h-32 rounded-lg"
                />
                <Text className="text-neutral-800 font-bold">{item.title}</Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
}

import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";

const data = [
  {
    id: "1",
    title: "건강 정보 1",
    image_url:
      "https://i.namu.wiki/i/Mj0aArUbJiq5_c500MqmbYyDPWnSiDBCsxbesdkR0XTOtDvwrjj2ponJvctbYgQ7zPE_LvjsJHAl786rZu0tkw.webp",
    created_at: "2025-04-21 10:00:00",
  },
  {
    id: "2",
    title: "건강 정보 2",
    image_url:
      "https://i.namu.wiki/i/Mj0aArUbJiq5_c500MqmbYyDPWnSiDBCsxbesdkR0XTOtDvwrjj2ponJvctbYgQ7zPE_LvjsJHAl786rZu0tkw.webp",
    created_at: "2025-04-21 10:00:00",
  },
  {
    id: "3",
    title: "건강 정보 3",
    image_url:
      "https://i.namu.wiki/i/Mj0aArUbJiq5_c500MqmbYyDPWnSiDBCsxbesdkR0XTOtDvwrjj2ponJvctbYgQ7zPE_LvjsJHAl786rZu0tkw.webp",
    created_at: "2025-04-21 10:00:00",
  },
  {
    id: "4",
    title: "건강 정보 4",
    image_url:
      "https://i.namu.wiki/i/Mj0aArUbJiq5_c500MqmbYyDPWnSiDBCsxbesdkR0XTOtDvwrjj2ponJvctbYgQ7zPE_LvjsJHAl786rZu0tkw.webp",
    created_at: "2025-04-21 10:00:00",
  },
  {
    id: "5",
    title: "건강 정보 5",
    image_url:
      "https://i.namu.wiki/i/Mj0aArUbJiq5_c500MqmbYyDPWnSiDBCsxbesdkR0XTOtDvwrjj2ponJvctbYgQ7zPE_LvjsJHAl786rZu0tkw.webp",
    created_at: "2025-04-21 10:00:00",
  },
  {
    id: "6",
    title: "건강 정보 6",
    image_url:
      "https://i.namu.wiki/i/Mj0aArUbJiq5_c500MqmbYyDPWnSiDBCsxbesdkR0XTOtDvwrjj2ponJvctbYgQ7zPE_LvjsJHAl786rZu0tkw.webp",
    created_at: "2025-04-21 10:00:00",
  },
  {
    id: "7",
    title: "건강 정보 7",
    image_url:
      "https://i.namu.wiki/i/Mj0aArUbJiq5_c500MqmbYyDPWnSiDBCsxbesdkR0XTOtDvwrjj2ponJvctbYgQ7zPE_LvjsJHAl786rZu0tkw.webp",
    created_at: "2025-04-21 10:00:00",
  },
];

export function InfoCard({ onPress }: { onPress: () => void }) {
  const paddedData =
    data.length % 2 === 0
      ? data
      : [
          ...data,
          {
            id: "placeholder",
            title: "",
            image_url: "",
            created_at: "",
          },
        ];

  return (
    <FlatList
      data={paddedData}
      numColumns={2}
      scrollEnabled={false}
      columnWrapperStyle={{ gap: 12 }}
      contentContainerStyle={{ gap: 12 }}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => {
        if (item.id === "placeholder") {
          return (
            <View className="flex-1">
              <View className="p-3 rounded-xl bg-white opacity-0" />
            </View>
          );
        }

        return (
          <TouchableOpacity className="flex-1" onPress={onPress}>
            <View className="flex-1">
              <View className="flex-1 p-3 rounded-xl gap-7 bg-white shadow-neutral-300">
                <Image
                  source={{ uri: item.image_url }}
                  className="w-full h-28 rounded-lg"
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

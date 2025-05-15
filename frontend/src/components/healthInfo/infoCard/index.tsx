import { FlatList, Image, Text, View } from "react-native";

const data = [
  {
    id: "1",
    title: "건강 정보 1",
    img: "https://i.namu.wiki/i/Mj0aArUbJiq5_c500MqmbYyDPWnSiDBCsxbesdkR0XTOtDvwrjj2ponJvctbYgQ7zPE_LvjsJHAl786rZu0tkw.webp",
    content: "건강 정보 관련 내용이 들어갈 예정입니다.",
  },
  {
    id: "2",
    title: "건강 정보 2",
    img: "https://i.namu.wiki/i/Mj0aArUbJiq5_c500MqmbYyDPWnSiDBCsxbesdkR0XTOtDvwrjj2ponJvctbYgQ7zPE_LvjsJHAl786rZu0tkw.webp",
    content: "건강 정보 관련 내용이 들어갈 예정입니다.",
  },
  {
    id: "3",
    title: "건강 정보 3",
    img: "https://i.namu.wiki/i/Mj0aArUbJiq5_c500MqmbYyDPWnSiDBCsxbesdkR0XTOtDvwrjj2ponJvctbYgQ7zPE_LvjsJHAl786rZu0tkw.webp",
    content: "건강 정보 관련 내용이 들어갈 예정입니다.",
  },
  {
    id: "4",
    title: "건강 정보 4",
    img: "https://i.namu.wiki/i/Mj0aArUbJiq5_c500MqmbYyDPWnSiDBCsxbesdkR0XTOtDvwrjj2ponJvctbYgQ7zPE_LvjsJHAl786rZu0tkw.webp",
    content: "건강 정보 관련 내용이 들어갈 예정입니다.",
  },
  {
    id: "5",
    title: "건강 정보 5",
    img: "https://i.namu.wiki/i/Mj0aArUbJiq5_c500MqmbYyDPWnSiDBCsxbesdkR0XTOtDvwrjj2ponJvctbYgQ7zPE_LvjsJHAl786rZu0tkw.webp",
    content: "건강 정보 관련 내용이 들어갈 예정입니다.",
  },
  {
    id: "6",
    title: "건강 정보 6",
    img: "https://i.namu.wiki/i/Mj0aArUbJiq5_c500MqmbYyDPWnSiDBCsxbesdkR0XTOtDvwrjj2ponJvctbYgQ7zPE_LvjsJHAl786rZu0tkw.webp",
    content: "건강 정보 관련 내용이 들어갈 예정입니다.",
  },
  {
    id: "7",
    title: "건강 정보 7",
    img: "https://i.namu.wiki/i/Mj0aArUbJiq5_c500MqmbYyDPWnSiDBCsxbesdkR0XTOtDvwrjj2ponJvctbYgQ7zPE_LvjsJHAl786rZu0tkw.webp",
    content: "건강 정보 관련 내용이 들어갈 예정입니다.",
  },
  {
    id: "8",
    title: "건강 정보 8",
    img: "https://i.namu.wiki/i/Mj0aArUbJiq5_c500MqmbYyDPWnSiDBCsxbesdkR0XTOtDvwrjj2ponJvctbYgQ7zPE_LvjsJHAl786rZu0tkw.webp",
    content: "건강 정보 관련 내용이 들어갈 예정입니다.",
  },
];

export function InfoCard() {
  return (
    <FlatList
      data={data}
      numColumns={2}
      scrollEnabled={false}
      columnWrapperStyle={{ gap: 12 }}
      contentContainerStyle={{ gap: 12 }}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View className="flex-1">
          <View className="flex-1 p-3 rounded-xl gap-2 bg-white shadow-neutral-300">
            <Image
              source={{
                uri: item.img,
              }}
              className="w-full h-28 rounded-lg"
            />
            <View className="gap-5">
              <Text className="text-neutral-800 font-bold">{item.title}</Text>
              <Text className="text-neutral-800 text-sm">{item.content}</Text>
            </View>
          </View>
        </View>
      )}
    />
  );
}

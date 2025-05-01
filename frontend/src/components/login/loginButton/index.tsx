import { Image, Text, TouchableOpacity, View } from "react-native";

export function LoginButton({
  type,
  onPress,
}: {
  type: "google" | "kakao";
  onPress: () => void;
}) {
  return (
    <TouchableOpacity onPress={onPress}>
      {type === "google" ? (
        <View className="flex-row bg-white p-4 gap-5 items-center justify-center rounded-xl">
          <Image
            source={require("../../../assets/images/google_logo.png")}
            className="w-5 h-5"
          />
          <Text className="text-neutral-800 text-sm font-bold">
            구글 계정으로 로그인
          </Text>
        </View>
      ) : (
        <View className="flex-row bg-yellow-300 p-4 gap-5 items-center justify-center rounded-xl">
          <Image
            source={require("../../../assets/images/kakao_logo.png")}
            className="w-5 h-5"
          />
          <Text className="text-neutral-800 text-sm font-bold">
            카카오 계정으로 로그인
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

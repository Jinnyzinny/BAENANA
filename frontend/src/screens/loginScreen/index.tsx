import { login } from "@react-native-seoul/kakao-login";
import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LoginButton } from "../../components/login/loginButton";
import { useLoginStore } from "../../store/loginStore";

export function LoginScreen() {
  const setLogin = useLoginStore((state) => state.setLogin);

  function handleLogin() {
    setLogin();
  }

  async function handleKakaoLogin() {
    try {
      const token = await login();
      console.log("카카오 로그인: ", token.accessToken);
    } catch (error) {
      console.log("카카오 로그인 오류: ", error);
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-neutral-100 mx-5 justify-center gap-20">
      <Image
        source={require("../../assets/images/mascot.png")}
        className="w-28 h-28 self-center"
      />
      <View className="gap-7 mx-5">
        <Text className="self-center text-neutral-800 text-sm">
          SNS 계정으로 로그인
        </Text>
        <View className="gap-5">
          <LoginButton type="kakao" onPress={handleKakaoLogin} />
          <LoginButton type="google" onPress={handleLogin} />
        </View>
      </View>
    </SafeAreaView>
  );
}

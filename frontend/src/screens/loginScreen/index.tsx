import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLoginStore } from "../../store/loginStore";
import { LoginButton } from "../../components/login/loginButton";

export function LoginScreen() {
  const setLogin = useLoginStore((state) => state.setLogin);

  function handleLogin() {
    setLogin();
  }

  return (
    <SafeAreaView className="flex-1 bg-neutral-100 mx-5 justify-center gap-20">
      <Image
        source={require("../../assets/images/mascot.png")}
        className="w-32 h-32 self-center"
      />
      <View className="gap-5 mx-10">
        <Text>SNS 계정으로 로그인</Text>
        <LoginButton type="kakao" onPress={handleLogin} />
        <LoginButton type="google" onPress={handleLogin} />
      </View>
    </SafeAreaView>
  );
}

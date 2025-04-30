import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "../../components/common/button";
import { useLoginStore } from "../../store/loginStore";

export function LoginScreen() {
  const setLogin = useLoginStore((state) => state.setLogin);

  function handleLogin() {
    setLogin();
  }

  return (
    <SafeAreaView>
      <Text>로그인</Text>
      <Button content="로그인" onPress={handleLogin} fill={true} />
    </SafeAreaView>
  );
}

import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import RNBootSplash from "react-native-bootsplash";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "./global.css";
import { RootStackNavigator } from "./src/navigation/rootStackNavigator";
import { LoginScreen } from "./src/screens/loginScreen";
import { useLoginStore } from "./src/store/loginStore";

export default function App(): React.JSX.Element {
  const mainTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: "#F5F5F5",
    },
  };
  const isLoggedIn = useLoginStore((state) => state.isLoggedIn);
  const restoreLogin = useLoginStore((state) => state.restoreLogin);
  const [isReady, setIsReady] = useState<boolean>(false);
  const queryClient = new QueryClient();

  useEffect(() => {
    async function init() {
      await restoreLogin();
      await new Promise((r) => setTimeout(r, 500));
      RNBootSplash.hide({ fade: true });
      setIsReady(true);
    }
    init();
  }, []);

  if (!isReady) return <></>;

  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView className="flex-1">
        <NavigationContainer theme={mainTheme}>
          {isLoggedIn ? <RootStackNavigator /> : <LoginScreen />}
        </NavigationContainer>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}

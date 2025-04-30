import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import React, { useEffect } from "react";
import RNBootSplash from "react-native-bootsplash";
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

  useEffect(() => {
    const hide = async () => {
      await new Promise((r) => setTimeout(r, 500));
      RNBootSplash.hide({ fade: true });
    };
    hide();
  }, []);

  return (
    <NavigationContainer theme={mainTheme}>
      {isLoggedIn ? <RootStackNavigator /> : <LoginScreen />}
    </NavigationContainer>
  );
}

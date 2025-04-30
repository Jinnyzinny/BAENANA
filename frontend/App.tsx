import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import React, { useEffect } from "react";
import RNBootSplash from "react-native-bootsplash";
import "./global.css";
import { RootStackNavigator } from "./src/navigation/rootStackNavigator";

export default function App(): React.JSX.Element {
  const mainTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: "#F5F5F5",
    },
  };

  useEffect(() => {
    const hide = async () => {
      await new Promise((r) => setTimeout(r, 500));
      RNBootSplash.hide({ fade: true });
    };
    hide();
  }, []);

  return (
    <NavigationContainer theme={mainTheme}>
      <RootStackNavigator />
    </NavigationContainer>
  );
}

import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import React from "react";
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
  return (
    <NavigationContainer theme={mainTheme}>
      <RootStackNavigator />
    </NavigationContainer>
  );
}

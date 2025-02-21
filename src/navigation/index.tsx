import { NavigationContainer } from "@react-navigation/native";
import MainStack from "./navigators/stacks/MainStack";
import { Asset } from "expo-asset";
import * as SplashScreen from "expo-splash-screen";
import * as React from "react";

Asset.loadAsync([
  require("root/assets/newspaper.png"),
  require("root/assets/user.png"),
]);

SplashScreen.preventAutoHideAsync();

const AppContainer = () => {
  return (
    <NavigationContainer
      onReady={() => {
        SplashScreen.hideAsync();
      }}
    >
      <MainStack />
    </NavigationContainer>
  );
};

export default AppContainer;

import { Asset } from "expo-asset";
import * as SplashScreen from "expo-splash-screen";
import * as React from "react";
import AppContainer from "./navigation";

Asset.loadAsync([
  require("./assets/newspaper.png"),
  require("./assets/user.png"),
]);

SplashScreen.preventAutoHideAsync();

const App = () => <AppContainer />;

export default App;

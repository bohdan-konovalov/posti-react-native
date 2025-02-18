import { Asset } from "expo-asset";
import * as SplashScreen from "expo-splash-screen";
import * as React from "react";
import AppContainer from "./navigation";
import { Provider } from "react-redux";
import { store } from "./redux/store";

Asset.loadAsync([
  require("./assets/newspaper.png"),
  require("./assets/user.png"),
]);

SplashScreen.preventAutoHideAsync();

const App = () => (
  <Provider store={store}>
    <AppContainer />
  </Provider>
);

export default App;

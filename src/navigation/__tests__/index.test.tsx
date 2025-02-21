import { render, waitFor } from "@testing-library/react-native";
import * as SplashScreen from "expo-splash-screen";
import { Provider } from "react-redux";
import { mockStore, MockEnhancedStore } from "src/redux/store";
import AppContainer from "../index";

jest.mock("../navigators/TabNavigator", () => ({
  __esModule: true,
  default: jest.requireActual("react-native").View,
}));

jest.mock("expo-splash-screen", () => ({
  ...jest.requireActual("expo-splash-screen"),
  preventAutoHideAsync: jest.fn().mockResolvedValue(undefined),
  hideAsync: jest.fn().mockResolvedValue(undefined),
}));

jest.mock("expo-asset", () => ({
  ...jest.requireActual("expo-asset"),
  Asset: {
    loadAsync: jest.fn().mockResolvedValue(undefined),
  },
}));

const mockableStore = mockStore();

describe("AppContainer", () => {
  let store: MockEnhancedStore;

  beforeEach(() => {
    store = mockableStore();
  });

  it("calls SplashScreen.hideAsync when NavigationContainer is ready", async () => {
    render(
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );

    await waitFor(() =>
      expect(SplashScreen.hideAsync).toHaveBeenCalledTimes(1)
    );
  });
});

import * as React from "react";
import AppContainer from "./navigation";
import { Provider } from "react-redux";
import { store } from "./redux/store";

const App = () => (
  <Provider store={store}>
    <AppContainer />
  </Provider>
);

export default App;

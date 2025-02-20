import { createStackNavigator } from "@react-navigation/stack";
import TabNavigator from "../TabNavigator";
import { MainStackParamList } from "../types";

const Stack = createStackNavigator<MainStackParamList>();

const MainStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="tabs" component={TabNavigator} />
  </Stack.Navigator>
);

export default MainStack;

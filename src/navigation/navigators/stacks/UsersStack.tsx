import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Users from "../../../screens/users/Users";
import User from "../../../screens/users/User";
import { UsersStackParamList } from "../types";

const Stack = createNativeStackNavigator<UsersStackParamList>();

const UsersStack = () => (
  <Stack.Navigator initialRouteName="users">
    <Stack.Screen name="users" options={{ title: "Users" }} component={Users} />
    <Stack.Screen name="user" options={{ title: "User" }} component={User} />
  </Stack.Navigator>
);

export default UsersStack;

import { createStackNavigator } from "@react-navigation/stack";
import Users from "src/screens/users/Users";
import User from "src/screens/users/User";
import { UsersStackParamList } from "../types";

const Stack = createStackNavigator<UsersStackParamList>();

const UsersStack = () => (
  <Stack.Navigator initialRouteName="users">
    <Stack.Screen name="users" options={{ title: "Users" }} component={Users} />
    <Stack.Screen name="user" options={{ title: "User" }} component={User} />
  </Stack.Navigator>
);

export default UsersStack;

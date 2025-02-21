import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image } from "react-native";
import user from "root/assets/user.png";
import newspaper from "root/assets/newspaper.png";
import PostsStack from "./stacks/PostsStack";
import UsersStack from "./stacks/UsersStack";
import { TabNavigatorParamList } from "./types";

const Tab = createBottomTabNavigator<TabNavigatorParamList>();

const TabNavigator = () => (
  <Tab.Navigator
    initialRouteName="posts-tab"
    screenOptions={{ headerShown: false, lazy: false }}
  >
    <Tab.Screen
      name="posts-tab"
      component={PostsStack}
      options={{
        title: "Posts",
        tabBarIcon: ({ color, size }) => (
          <Image
            source={newspaper}
            tintColor={color}
            style={{
              width: size,
              height: size,
            }}
          />
        ),
      }}
    />
    <Tab.Screen
      name="users-tab"
      component={UsersStack}
      options={{
        title: "Users",
        tabBarIcon: ({ color, size }) => (
          <Image
            source={user}
            tintColor={color}
            style={{
              width: size,
              height: size,
            }}
          />
        ),
      }}
    />
  </Tab.Navigator>
);

export default TabNavigator;

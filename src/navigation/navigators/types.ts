import { NavigatorScreenParams } from "@react-navigation/native";

export type UserScreenParams = {
  userId: number;
};

export type PostsStackParamList = {
  posts: undefined;
  post: undefined;
};

export type UsersStackParamList = {
  users: undefined;
  user: UserScreenParams;
};

export type TabNavigatorParamList = {
  "posts-tab": NavigatorScreenParams<PostsStackParamList>;
  "users-tab": NavigatorScreenParams<UsersStackParamList>;
};

export type MainStackParamList = {
  tabs: NavigatorScreenParams<TabNavigatorParamList>;
};

import { NavigatorScreenParams } from "@react-navigation/native";
import type { StackScreenProps } from "@react-navigation/stack";

type FilterTypes = "by-user";

interface Filter {
  type: FilterTypes;
}

interface UserFilter extends Filter {
  type: "by-user";
  userId: number;
  userName: string;
}

export type UserScreenParams = {
  userId: number;
};

export type FilteredPostsScreenParams = {
  filter: UserFilter;
};

export type PostScreenParams = {
  postId: number;
  userId: number;
};

export type PostsStackParamList = {
  "all-posts": undefined;
  "filtered-posts": FilteredPostsScreenParams;
  post: PostScreenParams;
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

export type PostsStackScreenProps<T extends keyof PostsStackParamList> =
  StackScreenProps<PostsStackParamList, T>;

export type UsersStackScreenProps<T extends keyof UsersStackParamList> =
  StackScreenProps<UsersStackParamList, T>;

export type StackNavigatorParamList = PostsStackParamList &
  UsersStackParamList &
  TabNavigatorParamList &
  MainStackParamList;

export type NavigatorParamList = StackNavigatorParamList;

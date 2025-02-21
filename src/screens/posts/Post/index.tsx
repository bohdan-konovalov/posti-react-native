import { useCallback } from "react";
import {
  NavigatorParamList,
  PostsStackParamList,
} from "src/navigation/navigators/types";
import {
  useGetPostByIdQuery,
  useGetUserByIdQuery,
  useGetPostCommentsQuery,
} from "src/redux/api/apiSlice";
import { PostWithComments } from "./components/PostWithComments";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { ErrorMessage } from "src/ui/components/ErrorMessage";

export const testID = "Post";

interface PostScreenRoute {
  route: RouteProp<PostsStackParamList, "post">;
}

const Post = ({ route }: PostScreenRoute) => {
  const { userId, postId } = route.params;
  const {
    data: post,
    isLoading: isPostLoading,
    isError: isPostError,
  } = useGetPostByIdQuery(postId);

  const {
    data: user,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useGetUserByIdQuery(userId);

  const { data: comments, isLoading: areCommentsLoading } =
    useGetPostCommentsQuery(postId);

  const navigation = useNavigation<StackNavigationProp<NavigatorParamList>>();

  const isPostDataLoading = isPostLoading || isUserLoading;

  const onAuthorPress = useCallback(() => {
    navigation.navigate("users-tab", { screen: "user", params: { userId } });
  }, [navigation, userId]);

  return isPostError || isUserError ? (
    <ErrorMessage />
  ) : (
    <PostWithComments
      testID={testID}
      authorId={userId}
      authorName={user?.name}
      title={post?.title}
      body={post?.body}
      comments={comments}
      isLoading={isPostDataLoading}
      areCommentsLoading={areCommentsLoading}
      onAuthorPress={onAuthorPress}
    />
  );
};

export default Post;

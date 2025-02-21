import { useCallback } from "react";
import {
  NavigatorParamList,
  PostsStackScreenProps,
} from "../../../navigation/navigators/types";
import {
  useGetPostByIdQuery,
  useGetUserByIdQuery,
  useGetPostCommentsQuery,
} from "../../../redux/api/apiSlice";
import { PostWithComments } from "./components/PostWithComments";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { ErrorMessage } from "../../../ui/components/ErrorMessage";

const Post = ({ route }: PostsStackScreenProps<"post">) => {
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

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

const Post = ({ route }: PostsStackScreenProps<"post">) => {
  const { userId, postId } = route.params;
  const {
    data: post,
    isLoading: isPostLoading,
    isError,
  } = useGetPostByIdQuery(postId);
  const { data: user, isLoading: isUserLoading } = useGetUserByIdQuery(userId);
  const { data: comments } = useGetPostCommentsQuery(postId);
  const navigation = useNavigation<StackNavigationProp<NavigatorParamList>>();

  const isPostDataLoading = isPostLoading || isUserLoading;

  const onAuthorPress = useCallback(() => {
    navigation.navigate("users-tab", { screen: "user", params: { userId } });
  }, [navigation, userId]);

  return (
    <PostWithComments
      authorId={userId}
      authorName={user?.name}
      title={post?.title}
      body={post?.body}
      comments={comments}
      isLoading={isPostDataLoading}
      onAuthorPress={onAuthorPress}
    />
  );
};

export default Post;

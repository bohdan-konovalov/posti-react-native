import { useCallback } from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { PostsStackParamList } from "../../../navigation/navigators/types";
import { useGetAllPostsQuery } from "../../../redux/api/apiSlice";
import { FlatList } from "../../../ui/components/FlatList";
import { PostListItem } from "../components/PostListItem";
import { useNavigation } from "@react-navigation/native";
import { Post } from "../../../redux/api/apiTypes";

const AllPosts = () => {
  const { data: posts, isLoading, isFetching, refetch } = useGetAllPostsQuery();
  const navigation = useNavigation<StackNavigationProp<PostsStackParamList>>();

  const onPostPress = useCallback(
    (postId: number, userId: number) => {
      navigation.navigate("post", { postId, userId });
    },
    [navigation]
  );

  const renderItem = useCallback(
    ({ item }: { item: Post }) => (
      <PostListItem post={item} onPress={onPostPress} />
    ),
    []
  );

  const keyExtractor = useCallback((post: Post) => `${post.id}`, []);

  return (
    <FlatList
      data={posts}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      onRefresh={refetch}
      isLoading={isLoading}
      isFetching={isFetching}
    />
  );
};

export default AllPosts;

import { useCallback } from "react";
import { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useGetPostsByUserIdQuery } from "../../../redux/api/apiSlice";
import {
  PostsStackParamList,
  PostsStackScreenProps,
} from "../../../navigation/navigators/types";
import { StackNavigationProp } from "@react-navigation/stack";
import { Post } from "../../../redux/api/apiTypes";
import { PostListItem } from "../components/PostListItem";
import { FlatList } from "../../../ui/components/FlatList";

const emptyArray: any[] = [];

const FilteredPosts = ({ route }: PostsStackScreenProps<"filtered-posts">) => {
  const {
    filter: { userId, userName },
  } = route.params;

  const {
    data: filteredPosts = [],
    refetch,
    isLoading,
    isFetching,
  } = useGetPostsByUserIdQuery(userId);

  const navigation = useNavigation<StackNavigationProp<PostsStackParamList>>();

  // As we are dealing with mobile navigation, the screen is not removed from the stack when we leave it.
  // So, when we open it again with a new userId, the old filteredPosts are still available.
  // This check helps us avoid showing posts filtered by the previous userId.
  const validFilteredPosts =
    filteredPosts[0]?.userId === userId ? filteredPosts : emptyArray;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: `Posts by ${userName}`,
    });
  }, [navigation, userName]);

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
      data={validFilteredPosts}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      onRefresh={refetch}
      isLoading={isLoading}
      isFetching={isFetching}
    />
  );
};

export default FilteredPosts;

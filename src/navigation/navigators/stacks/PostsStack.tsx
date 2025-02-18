import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AllPosts from "../../../screens/posts/AllPosts";
import FilteredPosts from "../../../screens/posts/FilteredPosts";
import Post from "../../../screens/posts/Post";
import { PostsStackParamList } from "../types";

const Stack = createNativeStackNavigator<PostsStackParamList>();

const PostsStack = () => (
  <Stack.Navigator initialRouteName="all-posts">
    <Stack.Screen
      name="all-posts"
      options={{ title: "Posts" }}
      component={AllPosts}
    />
    <Stack.Screen
      name="filtered-posts"
      options={{ title: "Filtered Posts" }}
      component={FilteredPosts}
    />
    <Stack.Screen name="post" options={{ title: "Post" }} component={Post} />
  </Stack.Navigator>
);

export default PostsStack;

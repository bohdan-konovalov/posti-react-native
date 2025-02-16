import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Posts from "../../../screens/posts/Posts";
import Post from "../../../screens/posts/Post";
import { PostsStackParamList } from "../types";

const Stack = createNativeStackNavigator<PostsStackParamList>();

const PostsStack = () => (
  <Stack.Navigator initialRouteName="posts">
    <Stack.Screen name="posts" options={{ title: "Posts" }} component={Posts} />
    <Stack.Screen name="post" options={{ title: "Post" }} component={Post} />
  </Stack.Navigator>
);

export default PostsStack;

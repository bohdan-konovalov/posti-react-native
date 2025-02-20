import { createStackNavigator } from "@react-navigation/stack";
import AllPosts from "../../../screens/posts/AllPosts";
import FilteredPosts from "../../../screens/posts/FilteredPosts";
import Post from "../../../screens/posts/Post";
import { PostsStackParamList } from "../types";
import { Ionicons } from "@expo/vector-icons";

const Stack = createStackNavigator<PostsStackParamList>();

const PostsStack = () => (
  <Stack.Navigator initialRouteName="all-posts">
    <Stack.Screen
      name="all-posts"
      options={{ title: "All posts" }}
      component={AllPosts}
    />
    <Stack.Screen
      name="filtered-posts"
      component={FilteredPosts}
      options={({ navigation }) => ({
        headerLeft: () => (
          <Ionicons
            name="close"
            size={28}
            style={{ marginLeft: 10 }}
            onPress={() => {
              navigation.reset({
                index: 0,
                routes: [{ name: "all-posts" }],
              });
            }}
          />
        ),
      })}
    />
    <Stack.Screen
      name="post"
      options={{ title: "Post", headerBackButtonDisplayMode: "generic" }}
      component={Post}
    />
  </Stack.Navigator>
);

export default PostsStack;

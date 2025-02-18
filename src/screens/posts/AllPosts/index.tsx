import { StyleSheet, View, Text } from "react-native";
import { useGetAllPostsQuery } from "../../../redux/api/apiSlice";

const AllPosts = () => {
  const { data: posts } = useGetAllPostsQuery();
  console.log(JSON.stringify(posts, null, 2), "POSTS - Screen: All posts");
  return (
    <View style={styles.container}>
      <Text>All Posts Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
});

export default AllPosts;

import { StyleSheet, View, Text } from "react-native";
import { PostComment } from "../../../redux/api/apiTypes";

interface DetailedPost {
  authorId: number;
  authorName: string;
  id: number;
  title: string;
  body: string;
  comments: PostComment[];
}

const Post = () => {
  return (
    <View style={styles.container}>
      <Text>Post Screen</Text>
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

export default Post;

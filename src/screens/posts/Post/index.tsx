import { StyleSheet, View, Text } from "react-native";

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

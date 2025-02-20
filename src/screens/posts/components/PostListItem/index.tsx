import { FC } from "react";
import { Pressable } from "react-native";
import { Text } from "../../../../ui/components/Text";
import { Post } from "../../../../redux/api/apiTypes";
import { styles } from "./styles";

interface PostListItemProps {
  post: Post;
  onPress: (postId: number, userId: number) => void;
}

const PostListItem: FC<PostListItemProps> = ({ post, onPress }) => {
  const handlePress = () => {
    onPress(post.id, post.userId);
  };
  return (
    <Pressable onPress={handlePress} style={styles.container}>
      <Text style={styles.titleText}>{post.title}</Text>
      <Text numberOfLines={2} style={styles.bodyText}>
        {post.body}
      </Text>
    </Pressable>
  );
};

export { PostListItem };

import { View } from "react-native";
import { Text } from "src/ui/components/Text";
import { PostComment } from "src/redux/api/apiTypes";
import { styles } from "./styles";

interface CommentListItemProps {
  comment: PostComment;
}

const CommentListItem = ({ comment }: CommentListItemProps) => (
  <View style={styles.container}>
    <Text numberOfLines={"unlimited"} style={styles.nameText}>
      {comment.name}
    </Text>
    <Text style={styles.emailText}>{comment.email}</Text>
    <Text numberOfLines={"unlimited"} style={styles.bodyText}>
      {comment.body}
    </Text>
  </View>
);

export { CommentListItem };

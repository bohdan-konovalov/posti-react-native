import { FC } from "react";
import { View } from "react-native";
import { Text } from "../../../../../ui/components/Text";
import { PostComment } from "../../../../../redux/api/apiTypes";
import { styles } from "./styles";

interface CommentListItemProps {
  comment: PostComment;
}

const CommentListItem: FC<CommentListItemProps> = ({ comment }) => (
  <View style={styles.container}>
    <Text style={styles.nameText}>{comment.name}</Text>
    <Text numberOfLines={"unlimited"} style={styles.bodyText}>
      {comment.body}
    </Text>
  </View>
);

export { CommentListItem };

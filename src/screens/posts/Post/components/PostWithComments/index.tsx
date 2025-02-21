import { FC } from "react";
import { View, ScrollView } from "react-native";
import { Text } from "../../../../../ui/components/Text";
import { PostComment } from "../../../../../redux/api/apiTypes";
import { CommentListItem } from "../CommentListItem";
import { Link } from "../../../../../ui/components/Link";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { styles } from "./styles";

interface PostProps {
  authorId: number;
  authorName?: string;
  title?: string;
  body?: string;
  comments?: PostComment[];
  isLoading?: boolean;
  areCommentsLoading?: boolean;
  onAuthorPress?: () => void;
}

const PostWithComments: FC<PostProps> = ({
  authorName,
  title,
  body,
  comments,
  isLoading,
  areCommentsLoading,
  onAuthorPress,
}) => {
  const tabBarHeight = useBottomTabBarHeight();
  const showComments = comments && comments.length;
  const commentsPlaceholderText = areCommentsLoading
    ? "Loading..."
    : "No data available";

  return (
    <View
      style={[
        styles.container,
        { marginBottom: tabBarHeight + styles.container.padding },
      ]}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.titleText} loading={isLoading} numberOfLines={3}>
          {title}
        </Text>
        <Link prefix="By:" loading={isLoading} onPress={onAuthorPress}>
          {authorName}
        </Link>
        <Text
          numberOfLines={"unlimited"}
          loading={isLoading}
          style={styles.bodyText}
        >
          {body}
        </Text>
        <Text style={styles.subtitleText}>{"Comments:"}</Text>
        {showComments ? (
          comments.map((comment) => {
            return <CommentListItem key={comment.id} comment={comment} />;
          })
        ) : (
          <Text numberOfLines={2} style={styles.noDataText}>
            {commentsPlaceholderText}
          </Text>
        )}
      </ScrollView>
    </View>
  );
};

export { PostWithComments };

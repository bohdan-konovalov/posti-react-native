import { View, ScrollView } from "react-native";
import { Text } from "src/ui/components/Text";
import { PostComment } from "src/redux/api/apiTypes";
import { CommentListItem } from "../CommentListItem";
import { Link } from "src/ui/components/Link";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { styles } from "./styles";

export interface PostProps {
  testID?: string;
  authorId: number;
  authorName?: string;
  title?: string;
  body?: string;
  comments?: PostComment[];
  isLoading?: boolean;
  areCommentsLoading?: boolean;
  onAuthorPress?: () => void;
}

const PostWithComments = ({
  testID = "Generic",
  authorName,
  title,
  body,
  comments,
  isLoading,
  areCommentsLoading,
  onAuthorPress,
}: PostProps) => {
  const tabBarHeight = useBottomTabBarHeight();
  const showComments = !!comments?.length;
  const commentsPlaceholderText = areCommentsLoading
    ? "Loading..."
    : "No data available";

  return (
    <View
      testID={`${testID}-post-with-comments-container`}
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

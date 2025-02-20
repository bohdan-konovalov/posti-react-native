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
  onAuthorPress?: () => void;
}

const PostWithComments: FC<PostProps> = ({
  authorName,
  title,
  body,
  comments,
  isLoading,
  onAuthorPress,
}) => {
  const tabBarHeight = useBottomTabBarHeight();
  const postWrittenBy = `${authorName}`;

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
          {postWrittenBy}
        </Link>
        <Text
          numberOfLines={"unlimited"}
          loading={isLoading}
          style={styles.bodyText}
        >
          {body}
        </Text>
        <Text style={styles.subtitleText}>{"Comments:"}</Text>
        {comments?.map((comment) => {
          return <CommentListItem key={comment.id} comment={comment} />;
        })}
      </ScrollView>
    </View>
  );
};

export { PostWithComments };

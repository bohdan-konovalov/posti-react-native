import { View } from "react-native";
import { Text } from "../../../ui/components/Text";
import {
  NavigatorParamList,
  UsersStackScreenProps,
} from "../../../navigation/navigators/types";
import { useGetUserByIdQuery } from "../../../redux/api/apiSlice";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Button } from "../../../ui/components/Button";

const User = ({ route }: UsersStackScreenProps<"user">) => {
  const { userId } = route.params;
  const { data: user, isLoading, isError } = useGetUserByIdQuery(userId);

  const navigation = useNavigation<StackNavigationProp<NavigatorParamList>>();

  const onBrowsePress = () => {
    if (user) {
      navigation.navigate("posts-tab", {
        screen: "filtered-posts",
        params: {
          filter: { type: "by-user", userId, userName: user.name },
        },
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text loading={isLoading} style={styles.nameText}>
        {user?.name && `Name: ${user?.name}`}
      </Text>
      <Text loading={isLoading}>{user?.email && `Email: ${user.email}`}</Text>
      <Text loading={isLoading}>{user?.phone && `Phone: ${user.phone}`}</Text>
      <Text loading={isLoading}>
        {user?.website && `Website: ${user.website}`}
      </Text>
      <Button
        disabled={isLoading || isError}
        title={
          user?.name ? `Browse ${user.name}'s posts` : `Browse this user posts`
        }
        onPress={onBrowsePress}
      />
    </View>
  );
};

export default User;

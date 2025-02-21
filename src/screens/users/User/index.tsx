import { View } from "react-native";
import { Text } from "src/ui/components/Text";
import {
  NavigatorParamList,
  UsersStackParamList,
} from "src/navigation/navigators/types";
import { useGetUserByIdQuery } from "src/redux/api/apiSlice";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Button } from "src/ui/components/Button";
import { ErrorMessage } from "src/ui/components/ErrorMessage";
import { styles } from "./styles";

interface UserScreenRoute {
  route: RouteProp<UsersStackParamList, "user">;
}

const User = ({ route }: UserScreenRoute) => {
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

  return isError ? (
    <ErrorMessage />
  ) : (
    <View style={styles.container}>
      <Text loading={isLoading} style={styles.nameText}>
        {user?.name && `Name: ${user.name}`}
      </Text>
      <Text loading={isLoading}>{user?.email && `Email: ${user.email}`}</Text>
      <Text loading={isLoading}>{user?.phone && `Phone: ${user.phone}`}</Text>
      <Text loading={isLoading}>
        {user?.website && `Website: ${user.website}`}
      </Text>
      <Button
        disabled={isLoading}
        title={
          user?.name ? `Browse ${user.name}'s posts` : `Browse this user posts`
        }
        onPress={onBrowsePress}
      />
    </View>
  );
};

export default User;

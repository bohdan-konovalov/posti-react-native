import { useCallback } from "react";
import { Pressable } from "react-native";
import { Text } from "src/ui/components/Text";
import { useGetAllUsersQuery } from "src/redux/api/apiSlice";
import { styles } from "./styles";
import { User } from "src/redux/api/apiTypes";
import { FlatList } from "src/ui/components/FlatList";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { UsersStackParamList } from "src/navigation/navigators/types";

export const flatListTestID = "Users-list";

interface UserListItemProps {
  user: User;
  onPress: (userId: number) => void;
}

const UserListItem = ({ user, onPress }: UserListItemProps) => {
  const handlePress = () => {
    onPress(user.id);
  };
  return (
    <Pressable onPress={handlePress} style={styles.pressableContainer}>
      <Text style={styles.text}>{user.name}</Text>
    </Pressable>
  );
};

const Users = () => {
  const { data: users, refetch, isLoading, isFetching } = useGetAllUsersQuery();
  const navigation = useNavigation<StackNavigationProp<UsersStackParamList>>();

  const onUserItemPress = useCallback(
    (userId: number) => {
      navigation.navigate("user", {
        userId,
      });
    },
    [navigation]
  );

  const renderItem = useCallback(
    ({ item }: { item: User }) => (
      <UserListItem user={item} onPress={onUserItemPress} />
    ),
    []
  );

  const keyExtractor = useCallback((user: User) => `${user.id}`, []);

  return (
    <FlatList
      testID={flatListTestID}
      data={users}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      onRefresh={refetch}
      isLoading={isLoading}
      isFetching={isFetching}
    />
  );
};

export default Users;

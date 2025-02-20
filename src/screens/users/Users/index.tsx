import { FC, useCallback } from "react";
import { Pressable } from "react-native";
import { Text } from "../../../ui/components/Text";
import { useGetAllUsersQuery } from "../../../redux/api/apiSlice";
import { styles } from "./styles";
import { User } from "../../../redux/api/apiTypes";
import { FlatList } from "../../../ui/components/FlatList";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { UsersStackParamList } from "../../../navigation/navigators/types";

interface UserListItemProps {
  user: User;
  onPress: (userId: number) => void;
}

const UserListItem: FC<UserListItemProps> = ({ user, onPress }) => {
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

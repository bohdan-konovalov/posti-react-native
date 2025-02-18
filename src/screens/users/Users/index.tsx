import { StyleSheet, View, Text } from "react-native";
import { useGetAllUsersQuery } from "../../../redux/api/apiSlice";

const Users = () => {
  const { data: users } = useGetAllUsersQuery();
  console.log(JSON.stringify(users, null, 2), "USERS - Screen: Users");
  return (
    <View style={styles.container}>
      <Text>Users Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
});

export default Users;

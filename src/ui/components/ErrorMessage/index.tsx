import { View } from "react-native";
import { Text } from "../Text";
import { styles } from "./styles";

interface ErrorMessageProps {
  message?: string;
}

const ErrorMessage = ({ message }: ErrorMessageProps) => (
  <View style={styles.container}>
    <Text style={styles.titleText}>Error</Text>
    <Text numberOfLines={3} style={styles.messageText}>
      {message || "Something went wrong. Please try again later."}
    </Text>
  </View>
);

export { ErrorMessage };

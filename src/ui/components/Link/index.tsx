import { Pressable, View } from "react-native";
import { Text } from "../Text";
import { styles } from "./styles";

interface LinkProps {
  prefix?: string;
  loading?: boolean;
  children?: string;
  onPress?: () => void;
}

const Link = ({ prefix, loading, children, onPress }: LinkProps) => (
  <View style={styles.container}>
    {prefix ? (
      <Text style={styles.prefix} loading={loading}>
        {`${prefix} `}
      </Text>
    ) : null}
    <Pressable
      disabled={!children}
      onPress={onPress}
      style={styles.pressableContainer}
    >
      <Text loading={loading} style={styles.text}>
        {children}
      </Text>
    </Pressable>
  </View>
);

export { Link };

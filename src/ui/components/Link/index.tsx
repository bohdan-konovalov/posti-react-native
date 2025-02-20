import { FC } from "react";
import { Pressable, View } from "react-native";
import { Text } from "../Text";
import { styles } from "./styles";

interface LinkProps {
  prefix?: string;
  loading?: boolean;
  children?: string;
  onPress?: () => void;
}

const Link: FC<LinkProps> = ({ prefix, loading, children, onPress }) => (
  <View style={styles.container}>
    {prefix ? (
      <Text style={styles.prefix} loading={loading}>
        {`${prefix} `}
      </Text>
    ) : null}
    <Pressable onPress={onPress} style={styles.pressableContainer}>
      <Text loading={loading} style={styles.text}>
        {children}
      </Text>
    </Pressable>
  </View>
);

export { Link };

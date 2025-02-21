import { Text as NativeText, View, TextStyle, StyleProp } from "react-native";
import { styles } from "./styles";

interface TextProps {
  loading?: boolean;
  style?: StyleProp<TextStyle>;
  numberOfLines?: number | "unlimited";
  children?: string;
}

const Text = ({ loading, style, numberOfLines = 1, children }: TextProps) => {
  return loading ? (
    <View style={styles.loadingPlaceholder} />
  ) : (
    <NativeText
      style={[styles.text, style]}
      numberOfLines={numberOfLines === "unlimited" ? undefined : numberOfLines}
      ellipsizeMode="tail"
    >
      {children}
    </NativeText>
  );
};

export { Text };

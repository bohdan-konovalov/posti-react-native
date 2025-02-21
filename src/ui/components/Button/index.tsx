import { Pressable, ViewStyle, TextStyle } from "react-native";
import { Text } from "../Text";
import { styles } from "./styles";

interface ButtonProps {
  title: string;
  onPress: () => void;
  color?: ViewStyle["backgroundColor"];
  titleColor?: TextStyle["color"];
  borderColor?: ViewStyle["borderColor"];
  disabled?: boolean;
  disabledColor?: ViewStyle["backgroundColor"];
  disabledBorderColor?: ViewStyle["borderColor"];
}

const Button = ({
  title,
  onPress,
  color = "#6200EE",
  titleColor = "#FFF",
  borderColor,
  disabled,
  disabledColor = "#CCC",
  disabledBorderColor = "#AAA",
}: ButtonProps) => (
  <Pressable
    onPress={onPress}
    disabled={disabled}
    style={[
      styles.pressableContainer,
      {
        backgroundColor: disabled ? disabledColor : color,
        borderColor: disabled ? disabledBorderColor : borderColor || color,
      },
    ]}
  >
    <Text style={[styles.text, { color: titleColor }]}>{title}</Text>
  </Pressable>
);

export { Button };

import { StyleSheet, Platform } from "react-native";

const paddingBottomValue = Platform.OS === "android" ? 15 : 10;

export const styles = StyleSheet.create({
  flatList: { padding: 8 },
  text: { textAlign: "center", padding: 16, color: "#888" },
  contentContainer: { paddingBottom: paddingBottomValue },
});

import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexBasis: "100%",
    flexGrow: 1,
    flexShrink: 0,
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 3,
    margin: 8,
  },
  titleText: { fontWeight: "bold", fontSize: 20, marginBottom: 4 },
  bodyText: { marginVertical: 8 },
  articleText: {
    fontSize: 16,
    lineHeight: 24,
    padding: 16,
    textAlign: "left",
  },
  subtitleText: { fontWeight: "bold", marginBottom: 4 },
  noDataText: { textAlign: "center", padding: 16, color: "#888" },
});

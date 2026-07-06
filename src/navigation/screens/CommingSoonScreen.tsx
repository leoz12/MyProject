import { View, Text, StyleSheet } from "react-native";

export default function CommingSoonScreen() {
  return (
    <View style={styles.container}>
      <Text>This Page is Comming Soon</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

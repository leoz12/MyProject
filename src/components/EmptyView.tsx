import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface EmptyViewProps {
  message?: string;
}

export default function EmptyView({
  message = "No data available.",
}: EmptyViewProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 32,
    paddingHorizontal: 24,
  },
  message: {
    fontSize: 14,
    textAlign: "center",
    color: "#666",
  },
});

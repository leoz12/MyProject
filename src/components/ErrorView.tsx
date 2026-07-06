import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import color from "../api-hooks/styles/color";

interface ErrorViewProps {
  message?: string;
  onRetry: () => void;
  retryText?: string;
}

export default function ErrorView({
  message = "Something went wrong.",
  onRetry,
  retryText = "Retry",
}: ErrorViewProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>{message}</Text>

      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.8}
        onPress={onRetry}
      >
        <Text style={styles.buttonText}>{retryText}</Text>
      </TouchableOpacity>
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
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: color.white,
    fontWeight: "600",
    fontSize: 14,
  },
});

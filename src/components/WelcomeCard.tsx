import React from "react";
import { StyleSheet, Text, View } from "react-native";
import color from "../api-hooks/styles/color";

interface WelcomeCardProps {
  firstName: string;
  lastName: string;
}

export default function WelcomeCard({ firstName, lastName }: WelcomeCardProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>👋 Welcome Back</Text>

      <Text style={styles.name}>
        {firstName} {lastName}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.blue,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },

  greeting: {
    fontSize: 16,
    color: "#DBEAFE",
    fontWeight: "500",
  },

  name: {
    marginTop: 6,
    fontSize: 24,
    fontWeight: "700",
    color: color.white,
  },
});

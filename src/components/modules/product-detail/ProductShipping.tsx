import React from "react";
import { StyleSheet, Text, View } from "react-native";
import color from "../../../api-hooks/styles/color";

interface ProductShippingProps {
  shippingInformation: string;
  availabilityStatus: string;
}

export default function ProductShipping({
  shippingInformation,
  availabilityStatus,
}: ProductShippingProps) {
  const isInStock = availabilityStatus.toLowerCase() === "in stock";

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shipping</Text>

      <View style={styles.card}>
        <Text style={styles.icon}>🚚</Text>

        <View style={styles.content}>
          <Text style={styles.label}>Shipping Information</Text>

          <Text style={styles.value}>{shippingInformation}</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.icon}>{isInStock ? "🟢" : "🔴"}</Text>

        <View style={styles.content}>
          <Text style={styles.label}>Availability</Text>

          <Text
            style={[
              styles.status,
              isInStock ? styles.inStock : styles.outOfStock,
            ]}
          >
            {availabilityStatus}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.white,
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    borderRadius: 16,
    elevation: 2,
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 16,
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
  },

  icon: {
    fontSize: 24,
    marginRight: 14,
  },

  content: {
    flex: 1,
  },

  label: {
    fontSize: 13,
    color: "#6B7280",
    marginBottom: 4,
  },

  value: {
    fontSize: 15,
    color: "#111827",
    fontWeight: "600",
    lineHeight: 22,
  },

  status: {
    fontSize: 15,
    fontWeight: "700",
  },

  inStock: {
    color: "#16A34A",
  },

  outOfStock: {
    color: color.danger,
  },
});

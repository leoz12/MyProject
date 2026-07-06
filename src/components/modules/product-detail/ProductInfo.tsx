import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Product } from "../../../api-hooks/product/product.model";
import color from "../../../api-hooks/styles/color";

interface ProductInfoProps {
  product: Product;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const finalPrice =
    product.price - (product.price * product.discountPercentage) / 100;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{product.title}</Text>

      <View style={styles.row}>
        <Text style={styles.brand}>{product.brand}</Text>

        <View style={styles.badge}>
          <Text style={styles.badgeText}>{product.category}</Text>
        </View>
      </View>

      <View style={styles.priceContainer}>
        <Text style={styles.price}>${finalPrice.toFixed(2)}</Text>

        <Text style={styles.originalPrice}>${product.price.toFixed(2)}</Text>

        <View style={styles.discountBadge}>
          <Text style={styles.discountText}>
            -{product.discountPercentage.toFixed(0)}%
          </Text>
        </View>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.infoText}>⭐ {product.rating}</Text>

        <Text style={styles.infoText}>📦 Stock: {product.stock}</Text>

        <Text
          style={[
            styles.status,
            product.availabilityStatus === "In Stock"
              ? styles.inStock
              : styles.outOfStock,
          ]}
        >
          {product.availabilityStatus}
        </Text>
      </View>

      <Text style={styles.sectionTitle}>Description</Text>

      <Text style={styles.description}>{product.description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.white,
    padding: 16,
    borderRadius: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    elevation: 2,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111827",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
  },

  brand: {
    fontSize: 15,
    color: "#6B7280",
    fontWeight: "600",
  },

  badge: {
    backgroundColor: "#DBEAFE",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },

  badgeText: {
    color: color.blue,
    fontSize: 12,
    fontWeight: "600",
    textTransform: "capitalize",
  },

  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
  },

  price: {
    fontSize: 28,
    fontWeight: "700",
    color: color.blue,
  },

  originalPrice: {
    marginLeft: 10,
    textDecorationLine: "line-through",
    color: "#9CA3AF",
    fontSize: 16,
  },

  discountBadge: {
    marginLeft: 10,
    backgroundColor: "#FEE2E2",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },

  discountText: {
    color: color.danger,
    fontWeight: "700",
    fontSize: 12,
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 18,
    flexWrap: "wrap",
  },

  infoText: {
    fontSize: 14,
    color: "#4B5563",
    fontWeight: "500",
  },

  status: {
    fontSize: 14,
    fontWeight: "700",
  },

  inStock: {
    color: "#16A34A",
  },

  outOfStock: {
    color: color.danger,
  },

  sectionTitle: {
    marginTop: 22,
    marginBottom: 8,
    fontSize: 17,
    fontWeight: "700",
    color: "#111827",
  },

  description: {
    fontSize: 14,
    lineHeight: 22,
    color: "#4B5563",
  },
});

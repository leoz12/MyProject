import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Product } from "../../../api-hooks/product/product.model";
import color from "../../../api-hooks/styles/color";

interface ProductCardProps {
  product: Product;
  onPress?: () => void;
}

export default function ProductCard({ product, onPress }: ProductCardProps) {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.8}
      onPress={onPress}
    >
      <Image source={{ uri: product.thumbnail }} style={styles.image} />

      <View style={styles.content}>
        <View>
          <Text numberOfLines={1} style={styles.title}>
            {product.title}
          </Text>

          <Text numberOfLines={2} style={styles.description}>
            {product.description}
          </Text>
        </View>

        <View style={styles.footer}>
          <View>
            <Text style={styles.price}>${product.price.toFixed(2)}</Text>

            <Text style={styles.category}>{product.category}</Text>
          </View>

          <View style={styles.right}>
            <Text style={styles.rating}>⭐ {product.rating}</Text>

            <Text style={styles.stock}>Stock: {product.stock}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: color.white,
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 16,
    elevation: 2,
  },

  image: {
    width: 110,
    height: 110,
  },

  content: {
    flex: 1,
    padding: 12,
    justifyContent: "space-between",
  },

  title: {
    fontSize: 16,
    fontWeight: "700",
  },

  description: {
    marginTop: 4,
    color: "#666",
    fontSize: 13,
    lineHeight: 18,
  },

  footer: {
    marginTop: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },

  price: {
    fontSize: 18,
    fontWeight: "700",
    color: color.blue,
  },

  category: {
    marginTop: 2,
    fontSize: 12,
    color: "#888",
    textTransform: "capitalize",
  },

  right: {
    alignItems: "flex-end",
  },

  rating: {
    fontSize: 13,
    fontWeight: "600",
  },

  stock: {
    marginTop: 4,
    fontSize: 12,
    color: "#666",
  },
});

import React from "react";
import { StyleSheet, View } from "react-native";
import color from "../../../api-hooks/styles/color";

interface ProductCardSkeletonProps {
  count?: number;
}

export default function ProductCardSkeleton({
  count = 5,
}: ProductCardSkeletonProps) {
  return (
    <View style={styles.container}>
      {Array.from({ length: count }).map((_, index) => (
        <View key={index} style={styles.card}>
          <View style={[styles.skeleton, styles.image]} />

          <View style={styles.content}>
            <View style={[styles.skeleton, styles.title]} />

            <View style={styles.spacing8} />

            <View style={[styles.skeleton, styles.description]} />

            <View style={styles.spacing6} />

            <View style={[styles.skeleton, styles.descriptionShort]} />
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },

  card: {
    flexDirection: "row",
    backgroundColor: color.white,
    borderRadius: 12,
    overflow: "hidden",
    padding: 5,
  },

  skeleton: {
    backgroundColor: "#E5E7EB",
  },

  image: {
    width: 110,
    height: 110,
  },

  content: {
    flex: 1,
    padding: 12,
  },

  title: {
    width: "70%",
    height: 18,
    borderRadius: 4,
  },

  description: {
    width: "100%",
    height: 12,
    borderRadius: 4,
  },

  descriptionShort: {
    width: "80%",
    height: 12,
    borderRadius: 4,
  },

  spacing8: {
    height: 8,
  },

  spacing6: {
    height: 6,
  },
});

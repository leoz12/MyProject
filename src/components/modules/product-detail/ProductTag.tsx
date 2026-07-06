import React from "react";
import { StyleSheet, Text, View } from "react-native";
import color from "../../../api-hooks/styles/color";

interface ProductTagProps {
  tags: string[];
}

export default function ProductTag({ tags }: ProductTagProps) {
  if (!tags?.length) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tags</Text>

      <View style={styles.tagContainer}>
        {tags.map((tag) => (
          <View key={tag} style={styles.tag}>
            <Text style={styles.tagText}>#{tag}</Text>
          </View>
        ))}
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
    marginBottom: 12,
  },

  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },

  tag: {
    backgroundColor: "#EFF6FF",
    borderWidth: 1,
    borderColor: "#BFDBFE",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },

  tagText: {
    color: color.blue,
    fontSize: 13,
    fontWeight: "600",
    textTransform: "capitalize",
  },
});

import React from "react";
import { Dimensions, Image, ScrollView, StyleSheet, View } from "react-native";
import color from "../../../api-hooks/styles/color";
interface ProductImageProps {
  images: string[];
}
const { width } = Dimensions.get("window");
export default function ProductImage({ images }: ProductImageProps) {
  if (!images?.length) {
    return null;
  }
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
      >
        {images.map((image, index) => (
          <Image
            key={index}
            source={{ uri: image }}
            style={styles.image}
            resizeMode="contain"
          />
        ))}
      </ScrollView>
      {images.length > 1 && (
        <View style={styles.indicatorContainer}>
          {images.map((_, index) => (
            <View key={index} style={styles.indicator} />
          ))}
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: { backgroundColor: color.white, marginBottom: 16 },
  image: { width: width, height: 300, backgroundColor: "#F5F5F5" },
  indicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 12,
    marginBottom: 8,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#D1D5DB",
    marginHorizontal: 4,
  },
});

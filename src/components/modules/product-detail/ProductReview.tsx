import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Review } from "../../../api-hooks/product/product.model";
import color from "../../../api-hooks/styles/color";

interface ProductReviewProps {
  reviews: Review[];
}

const renderStars = (rating: number) => {
  const fullStars = Math.round(rating);

  return "★".repeat(fullStars) + "☆".repeat(5 - fullStars);
};

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export default function ProductReview({ reviews }: ProductReviewProps) {
  if (!reviews.length) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reviews ({reviews.length})</Text>

      {reviews.map((review, index) => (
        <View
          key={`${review.reviewerEmail}-${index}`}
          style={styles.reviewCard}
        >
          <View style={styles.header}>
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{review.reviewerName}</Text>

              <Text style={styles.date}>{formatDate(review.date)}</Text>
            </View>

            <View style={styles.ratingContainer}>
              <Text style={styles.star}>{renderStars(review.rating)}</Text>

              <Text style={styles.rating}>{review.rating}/5</Text>
            </View>
          </View>

          <Text style={styles.comment}>&quot;{review.comment}&quot;</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.white,
    marginHorizontal: 16,
    marginBottom: 24,
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

  reviewCard: {
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 10,
  },

  name: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111827",
  },

  date: {
    marginTop: 4,
    fontSize: 12,
    color: "#6B7280",
  },

  ratingContainer: {
    alignItems: "flex-end",
  },

  star: {
    fontSize: 15,
    color: "#F59E0B",
  },

  rating: {
    marginTop: 2,
    fontSize: 12,
    color: "#6B7280",
  },

  comment: {
    fontSize: 14,
    lineHeight: 22,
    color: "#374151",
    fontStyle: "italic",
  },
});

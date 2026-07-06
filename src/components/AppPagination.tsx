import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import color from "../api-hooks/styles/color";

interface AppPaginationProps {
  page: number;
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
}

export default function AppPagination({
  page,
  totalPages,
  onPrevious,
  onNext,
}: AppPaginationProps) {
  const isFirstPage = page === 1;
  const isLastPage = page === totalPages;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, isFirstPage && styles.disabledButton]}
        disabled={isFirstPage}
        onPress={onPrevious}
      >
        <Text style={[styles.buttonText, isFirstPage && styles.disabledText]}>
          Previous
        </Text>
      </TouchableOpacity>

      <Text style={styles.pageText}>
        {page} / {totalPages}
      </Text>

      <TouchableOpacity
        style={[styles.button, isLastPage && styles.disabledButton]}
        disabled={isLastPage}
        onPress={onNext}
      >
        <Text style={[styles.buttonText, isLastPage && styles.disabledText]}>
          Next
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderTopWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: color.white,
  },

  button: {
    backgroundColor: color.blue,
    paddingHorizontal: 18,
    height: 42,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },

  disabledButton: {
    backgroundColor: "#D1D5DB",
  },

  buttonText: {
    color: color.white,
    fontWeight: "600",
  },

  disabledText: {
    color: "#6B7280",
  },

  pageText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },
});

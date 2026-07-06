import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import AntdDesign from "@react-native-vector-icons/ant-design";
import color from "../api-hooks/styles/color";

interface SearchBarProps {
  value: string;
  placeholder?: string;
  onChangeText: (text: string) => void;
}

export default function SearchBar({
  value,
  placeholder = "Search...",
  onChangeText,
}: SearchBarProps) {
  return (
    <View style={styles.container}>
      <AntdDesign name="search" size={20} color="#6B7280" />

      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        value={value}
        onChangeText={onChangeText}
        autoCorrect={false}
        autoCapitalize="none"
        returnKeyType="search"
        clearButtonMode="while-editing"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: color.white,
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginBottom: 10,
  },

  input: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: "#111827",
  },
});

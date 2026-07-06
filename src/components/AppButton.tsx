import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import color from "../api-hooks/styles/color";

type ButtonVariant = "primary" | "danger";

interface AppButtonProps extends TouchableOpacityProps {
  title: string;
  loading?: boolean;
  variant?: ButtonVariant;
}

export default function AppButton({
  title,
  loading = false,
  variant = "primary",
  disabled,
  style,
  ...props
}: AppButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={isDisabled}
      style={[
        styles.button,
        variant === "primary" && styles.primary,
        variant === "danger" && styles.danger,
        isDisabled && styles.disabled,
        style,
      ]}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={color.white} />
      ) : (
        <Text style={styles.text}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  primary: {
    backgroundColor: color.blue,
  },

  danger: {
    backgroundColor: color.danger,
  },

  disabled: {
    opacity: 0.6,
  },

  text: {
    color: color.white,
    fontSize: 16,
    fontWeight: "700",
  },
});

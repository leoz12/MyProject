import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import {
  Control,
  FieldPath,
  FieldValues,
  useController,
} from "react-hook-form";
import color from "../api-hooks/styles/color";

type FormTextFieldProps<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
} & TextInputProps;

export default function FormTextField<T extends FieldValues>({
  control,
  name,
  label,
  ...props
}: FormTextFieldProps<T>) {
  const {
    field,
    fieldState: { error },
  } = useController({
    control,
    name,
  });

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <TextInput
        {...props}
        value={field.value}
        onChangeText={field.onChange}
        onBlur={field.onBlur}
        style={[styles.input, error && styles.inputError, props.style]}
      />

      {error && <Text style={styles.error}>{error.message}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },

  label: {
    marginBottom: 8,
    fontWeight: "600",
  },

  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 10,
    paddingHorizontal: 14,
  },

  inputError: {
    borderColor: color.red,
  },

  error: {
    marginTop: 6,
    color: color.red,
    fontSize: 12,
  },
});

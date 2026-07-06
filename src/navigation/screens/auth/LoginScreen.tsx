import React from "react";
import {
  Alert,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoginUser } from "../../../api-hooks/auth/auth.mutation";
import { useAuthStore } from "../../../store/auth.store";
import FormTextField from "../../../components/FormTextField";
import AppButton from "../../../components/AppButton";
import color from "../../../api-hooks/styles/color";

const schema = z.object({
  username: z.string().min(1, "Username wajib diisi"),
  password: z.string().min(1, "Password wajib diisi"),
});

type FormData = z.infer<typeof schema>;

export default function LoginScreen() {
  const { mutateAsync, isPending: isLoading } = useLoginUser();
  const { login } = useAuthStore();

  const { control, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      username: "emilys",
      password: "emilyspass",
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      const response = await mutateAsync({
        body: {
          username: data.username,
          password: data.password,
        },
      });
      login(response, response.accessToken);
    } catch {
      Alert.alert("Login Gagal", "Username atau Password salah");
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={"padding"}>
      <View style={styles.card}>
        <Text style={styles.title}>Welcome 👋</Text>

        <Text style={styles.subtitle}>Login untuk melanjutkan</Text>

        <FormTextField
          control={control}
          name="username"
          label="Username"
          placeholder="Username"
          autoCapitalize="none"
        />

        <FormTextField
          control={control}
          name="password"
          label="Password"
          placeholder="Password"
          secureTextEntry
        />

        <AppButton
          title="Login"
          loading={isLoading}
          variant="primary"
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F7FB",
    justifyContent: "center",
    padding: 24,
  },
  card: {
    backgroundColor: color.white,
    borderRadius: 18,
    padding: 24,
    elevation: 4,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 6,
  },

  subtitle: {
    color: "#666",
    marginBottom: 28,
  },
});

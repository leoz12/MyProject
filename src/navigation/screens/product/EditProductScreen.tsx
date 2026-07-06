import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackParamList } from "../..";
import { Product } from "../../../api-hooks/product/product.model";
import z from "zod";
import { useUpdateProduct } from "../../../api-hooks/product/product.mutation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  View,
  StyleSheet,
} from "react-native";
import AppHeader from "../../../components/AppHeader";
import FormTextField from "../../../components/FormTextField";
import AppButton from "../../../components/AppButton";
import { SafeAreaView } from "react-native-safe-area-context";
import color from "../../../api-hooks/styles/color";

export type EditProductScreenParams = {
  product: Product;
};

type EditProductProps = NativeStackScreenProps<
  StackParamList,
  "EditProductScreen"
>;

const schema = z.object({
  title: z.string().min(1, "title wajib diisi"),
  description: z.string().min(1, "description wajib diisi"),
  category: z.string().min(1, "Category wajib diisi"),
});
type FormData = z.infer<typeof schema>;

export default function EditProductScreen(props: EditProductProps) {
  const { product } = props.route.params;
  const { mutateAsync, isPending: isLoading } = useUpdateProduct();

  const { control, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: product,
  });

  const onSubmit = async (data: FormData) => {
    try {
      await mutateAsync({
        id: product.id,
        body: data,
      });
      Alert.alert("Sukses Memperberbaharui Produk");
    } catch {
      Alert.alert("Gagal Memperberbaharui Produk");
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={"padding"}>
      <AppHeader title="Edit Produk" />
      <View style={styles.content}>
        <ScrollView>
          <FormTextField
            control={control}
            name="title"
            label="Title"
            placeholder="Title"
            autoCapitalize="none"
          />
          <FormTextField
            control={control}
            name="description"
            label="Description"
            placeholder="Description"
          />
          <FormTextField
            control={control}
            name="category"
            label="Category"
            placeholder="Category"
          />
        </ScrollView>
      </View>
      <SafeAreaView edges={["bottom"]} style={styles.footer}>
        <View style={styles.button}>
          <AppButton
            title="Submit"
            variant="primary"
            onPress={handleSubmit(onSubmit)}
            disabled={isLoading}
            loading={isLoading}
          />
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
  content: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 20,
  },

  footer: {
    flexDirection: "row",
    padding: 10,
  },

  button: {
    flex: 1,
  },
});

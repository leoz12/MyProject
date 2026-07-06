import {
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import AppHeader from "../../../components/AppHeader";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateProduct } from "../../../api-hooks/product/product.mutation";
import FormTextField from "../../../components/FormTextField";
import AppButton from "../../../components/AppButton";
import color from "../../../api-hooks/styles/color";

const schema = z.object({
  title: z.string().min(1, "title wajib diisi"),
  description: z.string().min(1, "description wajib diisi"),
  category: z.string().min(1, "Category wajib diisi"),
});
type FormData = z.infer<typeof schema>;

export default function AddProductScreen() {
  const { mutateAsync, isPending: isLoading } = useCreateProduct();

  const { control, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      await mutateAsync({
        body: data,
      });
      Alert.alert("Sukses Menambahkan Produk");
    } catch {
      Alert.alert("Gagal Menambahkan Produk");
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={"padding"}>
      <AppHeader title="Tambah Produk" />
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
      <View style={styles.footer}>
        <View style={styles.button}>
          <AppButton
            title="Submit"
            variant="primary"
            onPress={handleSubmit(onSubmit)}
            disabled={isLoading}
            loading={isLoading}
          />
        </View>
      </View>
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

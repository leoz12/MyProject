import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";

import ProductImage from "../../../components/modules/product-detail/ProductImage";
import ProductInfo from "../../../components/modules/product-detail/ProductInfo";
import ProductReview from "../../../components/modules/product-detail/ProductReview";
import ProductShipping from "../../../components/modules/product-detail/ProductShipping";
import ProductSpecification from "../../../components/modules/product-detail/ProductSpecification";
import ProductTag from "../../../components/modules/product-detail/ProductTag";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackParamList } from "../..";
import { SafeAreaView } from "react-native-safe-area-context";
import AppButton from "../../../components/AppButton";
import AppHeader from "../../../components/AppHeader";
import { useDeleteProduct } from "../../../api-hooks/product/product.mutation";
import { useGetProduct } from "../../../api-hooks/product/product.query";
import { Product } from "../../../api-hooks/product/product.model";
import color from "../../../api-hooks/styles/color";

export type ProductDetailScreenParams = {
  product: Product;
};

type ProductDetailProps = NativeStackScreenProps<
  StackParamList,
  "ProductDetailScreen"
>;

export default function ProductDetailScreen(props: ProductDetailProps) {
  const { params } = props.route;
  const navigation = useNavigation<NavigationProp<StackParamList>>();
  const { data: product, isLoading } = useGetProduct({ id: params.product.id });
  const { mutateAsync, isPending: isDeleting } = useDeleteProduct();

  const handleEdit = () => {
    navigation.navigate("EditProductScreen", {
      product: product!,
    });
  };

  const handleDelete = () => {
    Alert.alert(
      "Delete Product",
      "Are you sure you want to delete this product?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await mutateAsync({ id: product?.id! });
              Alert.alert("Success", "Product deleted successfully.");

              navigation.goBack();
            } catch {
              Alert.alert("Error", "Delete failed.");
            }
          },
        },
      ],
    );
  };

  if (isLoading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <View style={styles.container}>
      <AppHeader title="Produk Detail" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <ProductImage images={product.images} />

        <ProductInfo product={product} />

        <ProductTag tags={product.tags} />

        <ProductSpecification product={product} />

        <ProductShipping
          shippingInformation={product.shippingInformation}
          availabilityStatus={product.availabilityStatus}
        />

        <ProductReview reviews={product.reviews} />
      </ScrollView>

      <SafeAreaView edges={["bottom"]} style={styles.footer}>
        <View style={styles.button}>
          <AppButton
            title="Edit Product"
            variant="primary"
            onPress={handleEdit}
            disabled={isDeleting}
            loading={isDeleting}
          />
        </View>

        <View style={styles.button}>
          <AppButton
            title="Delete"
            variant="danger"
            onPress={handleDelete}
            disabled={isDeleting}
            loading={isDeleting}
          />
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },

  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  footer: {
    flexDirection: "row",
    padding: 16,
    backgroundColor: color.white,
    borderTopWidth: 1,
    borderColor: "#E5E7EB",
    gap: 12,
  },

  button: {
    flex: 1,
  },
});

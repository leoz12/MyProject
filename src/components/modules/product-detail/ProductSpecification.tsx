import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Product } from "../../../api-hooks/product/product.model";
import color from "../../../api-hooks/styles/color";

interface ProductSpecificationProps {
  product: Product;
}

interface SpecRowProps {
  label: string;
  value: string | number;
}

function SpecRow({ label, value }: SpecRowProps) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>

      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

export default function ProductSpecification({
  product,
}: ProductSpecificationProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Specifications</Text>

      <SpecRow label="SKU" value={product.sku} />

      <SpecRow label="Brand" value={product.brand} />

      <SpecRow label="Category" value={product.category} />

      <SpecRow label="Weight" value={`${product.weight} g`} />

      <SpecRow
        label="Dimensions"
        value={`${product.dimensions.width} × ${product.dimensions.height} × ${product.dimensions.depth} cm`}
      />

      <SpecRow
        label="Minimum Order"
        value={`${product.minimumOrderQuantity} pcs`}
      />
      <SpecRow label="Warranty" value={product.warrantyInformation} />

      <SpecRow label="Return Policy" value={product.returnPolicy} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.white,
    marginHorizontal: 16,
    marginBottom: 16,
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

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#E5E7EB",
  },

  label: {
    flex: 1,
    fontSize: 14,
    color: "#6B7280",
    fontWeight: "500",
  },

  value: {
    flex: 1.4,
    fontSize: 14,
    color: "#111827",
    fontWeight: "600",
    textAlign: "right",
  },
});

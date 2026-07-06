import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { ApiError, CustomQueryOptions } from "../../config/client";
import {
  GetProductInput,
  GetProductListInput,
  Product,
  ProductListResponse,
} from "./product.model";

export function useGetProductList(
  input: GetProductListInput,
  options?: CustomQueryOptions<ProductListResponse, ApiError>,
): UseQueryResult<ProductListResponse, ApiError> {
  return useQuery<ProductListResponse, ApiError>({
    queryKey: ["products", "products/search", input?.params],
    ...options,
  });
}

export function useGetProduct(
  input: GetProductInput,
  options?: CustomQueryOptions<Product, ApiError>,
): UseQueryResult<Product, ApiError> {
  return useQuery<Product, ApiError>({
    queryKey: ["product", `products/${input.id}`],
    ...options,
  });
}

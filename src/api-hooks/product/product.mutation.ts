import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { ApiError, MessageResult, MutationFunction } from "../../config/client";
import {
  CreateProductInput,
  DeleteProductInput,
  UpdateProductInput,
} from "./product.model";

export function useCreateProduct(
  options?: UseMutationOptions<MessageResult, ApiError, CreateProductInput>,
) {
  return useMutation({
    mutationFn: async (input: CreateProductInput) => {
      return await MutationFunction({
        url: "products/add",
        method: "POST",
        body: input.body,
      });
    },
    ...options,
  });
}

export function useUpdateProduct(
  options?: UseMutationOptions<MessageResult, ApiError, UpdateProductInput>,
) {
  return useMutation({
    mutationFn: async (input: UpdateProductInput) => {
      return await MutationFunction({
        url: `products/${input.id}`,
        method: "PUT",
        body: input.body,
      });
    },
    ...options,
  });
}

export function useDeleteProduct(
  options?: UseMutationOptions<MessageResult, ApiError, DeleteProductInput>,
) {
  return useMutation({
    mutationFn: async (input: DeleteProductInput) => {
      return await MutationFunction({
        url: `products/${input.id}`,
        method: "DELETE",
      });
    },
    ...options,
  });
}

import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { LoginRequest, LoginResponse } from "./auth.model";
import { ApiError, MutationFunction } from "../../config/client";

export function useLoginUser(
  options?: UseMutationOptions<LoginResponse, ApiError, LoginRequest>,
) {
  return useMutation({
    mutationFn: async (input: LoginRequest) => {
      return await MutationFunction({
        url: "auth/login",
        method: "POST",
        body: input.body,
      });
    },
    ...options,
  });
}

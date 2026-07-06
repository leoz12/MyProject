/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  QueryClient,
  QueryFunctionContext,
  UseQueryOptions,
} from "@tanstack/react-query";
import ky, { Options } from "ky";
import qs from "qs";
import { useAuthStore } from "../store/auth.store";

type MutationMethodType = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
interface MutationFunctionProps {
  url: string;
  method: MutationMethodType;
  body?: any;
  params?: { [x: string]: any };
}

export interface ApiError {
  message: string;
  type?: string;
  statusCode?: number;
  errors?: { [key: string]: string };
}

export interface MessageResult {
  message: string;
}

export type CustomQueryKey = [string, string, Record<string, any>?];

export type CustomQueryOptions<T, E = ApiError> = Omit<
  UseQueryOptions<T, E>,
  "queryKey"
>;

const config: Options = {
  prefixUrl: process.env.EXPO_PUBLIC_BASE_URL,
  timeout: 60 * 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  hooks: {
    beforeRequest: [
      (request) => {
        const token = useAuthStore.getState().token;

        if (token) {
          request.headers.set("Authorization", `Bearer ${token}`);
        } else {
          request.headers.delete("Authorization");
        }
      },
    ],
    afterResponse: [
      async (_request, _options, res) => {
        const contentType = res.headers.get("content-type");
        let newResponse = res.clone();
        if (contentType && contentType.includes("application/json")) {
          const json = await res.json();
          const { status, statusText, headers } = res;

          newResponse = new Response(JSON.stringify(json), {
            status,
            statusText,
            headers,
          });
        }

        return newResponse;
      },
    ],
    beforeRetry: [],
  },
};

export const client = ky.create(config);

export async function MutationFunction(
  props: MutationFunctionProps,
): Promise<any> {
  const { url, method, body } = props;

  const response = await client(url, {
    method,
    json: body,
  });

  return response.json();
}

export async function defaultQueryFn(queryParams: QueryFunctionContext) {
  const { queryKey } = queryParams as QueryFunctionContext<
    CustomQueryKey,
    number
  >;

  const [, url, params = {}] = queryKey;

  const response = await client.get(url, {
    searchParams: qs.stringify(params),
  });

  return response.json();
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 30,
      refetchOnReconnect: true,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      queryFn: defaultQueryFn,
    },
    mutations: {
      retry: 0,
    },
  },
});

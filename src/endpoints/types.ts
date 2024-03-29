import type { AxiosResponse, AxiosError } from "axios";

export interface ApiError {
  message: string;
  code: string;
}

export type State = {
  responses: Record<string, any>;
};

export interface ApiResponse<T> {
  data: T;
  message: string;
}

export interface ServiceCall<T, V = never> {
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  endpoint: string;
  url?: string;
  body?: V;
  key: string;
  mock?: T;
  apiUrl?: string;
  bodyType?: "json" | "form";
}

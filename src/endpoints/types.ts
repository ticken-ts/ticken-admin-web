import type { AxiosResponse, AxiosError } from "axios";

export interface ApiError {
  message: string;
  code: string;
}

export interface ServiceCall<T, V = never> {
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  endpoint: string;
  parseResponse?: (res: AxiosResponse) => T;
  parseError?: (e: AxiosError) => ApiError;
  body?: V;
  key?: string;
  mock?: T;
  apiUrl?: string;
}

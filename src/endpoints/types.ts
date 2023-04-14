import type { AxiosResponse, AxiosError } from "axios";

export interface ApiError {
  message: string;
  code: string;
}

export type State = {
  responses: Record<string, any>;
};

export interface ServiceCall<T, V = never> {
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  endpoint: string;
  parseResponse?: (res: AxiosResponse) => T;
  parseError?: (e: AxiosError) => ApiError;
  mergeResponse?: (state: State, res: T) => void;
  body?: V;
  key?: string;
  mock?: T;
  apiUrl?: string;
  bodyType?: "json" | "form";
}

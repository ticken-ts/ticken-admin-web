import { defineStore } from "pinia";
import type { ApiError, ServiceCall } from "@/endpoints/types";
import axios, { AxiosError } from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const useServiceStore = defineStore("services", {
  state: () => ({
    responses: {} as Record<string, any>,
  }),
  actions: {
    async call<V, T>(service: ServiceCall<T, V>): Promise<T> {
      if (service.mock) return service.mock;

      try {
        const res = await api.request({
          url: service.endpoint,
          method: service.method,
          data: service.body,
        });

        let parsed;
        if (service.parseResponse) {
          parsed = service.parseResponse(res);
        } else {
          parsed = res.data;
        }

        if (service.key) {
          this.responses[service.key] = parsed;
        }

        return parsed;
      } catch (e) {
        const error = e as AxiosError;
        if (service.parseError) {
          throw service.parseError(error);
        } else {
          throw {
            code: error.code,
            message: error.request.data,
          } as ApiError;
        }
      }
    },
    getResponse<V, T>(service: ServiceCall<T, V>): T | undefined {
      if (service.mock) return service.mock;
      if (service.key) {
        return this.responses[service.key];
      } else {
        throw new Error("Trying to get response of service call with no key.");
      }
    },
  },
  persist: {
    storage: localStorage,
  },
});

import { defineStore } from "pinia";
import type { ApiError, ServiceCall, State } from "@/endpoints/types";
import axios, { AxiosError } from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const useServiceStore = defineStore("services", {
  state: (): State => ({
    responses: {} as Record<string, any>,
  }),
  getters: {
    response:
      <T, V>(state: State) =>
      (service: ServiceCall<T, V>): T =>
        service.key ? state.responses[service.key] : undefined,
  },
  actions: {
    async call<V, T>(
      service: ServiceCall<T, V>,
      authorization?: string
    ): Promise<T> {
      let parsed: T;
      if (service.mock) {
        parsed = service.mock;
      } else {
        try {
          const res = await api.request({
            url: service.endpoint,
            method: service.method,
            data: service.body,
            headers: authorization
              ? {
                  Authorization: authorization,
                }
              : undefined,
          });
          if (service.parseResponse) {
            parsed = service.parseResponse(res);
          } else {
            parsed = res.data;
          }
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
      }

      if (service.mergeResponse) {
        service.mergeResponse(this.$state, parsed);
      }

      if (service.key) {
        this.responses[service.key] = parsed;
      }

      return parsed;
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

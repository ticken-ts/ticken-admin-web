import { defineStore } from "pinia";
import type { ApiError, ApiResponse, ServiceCall, State } from "@/endpoints/types";
import axios, { AxiosError } from "axios";
import { config } from "@/config/constants";
import { serialize } from "object-to-formdata";

const api = axios.create({
  baseURL: config.apiUrl,
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
    ): Promise<ApiResponse<T>> {
      let parsed: ApiResponse<T>;
      if (service.mock) {
        parsed = {
          data: service.mock,
          message: "Mocked response",
        };
      } else {
        try {
          let parsedBody: FormData | V | undefined = service.body;

          if (service.bodyType === "form") {
            parsedBody = serialize(parsedBody);
            console.log(parsedBody.get("poster"));
          }

          console.log("Calling service", service.method, service.endpoint);

          const res = await api.request({
            url: service.endpoint,
            method: service.method,
            data: parsedBody,
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
          console.log("Error making service call", e)
          const error = e as AxiosError;
          if (service.parseError) {
            console.log("Parsing error", error)
            throw service.parseError(error);
          } else {
            console.log("Throwing error", error)
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
        this.responses[service.key] = parsed.data;
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

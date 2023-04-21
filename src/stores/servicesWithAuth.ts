import { defineStore, storeToRefs } from "pinia";
import { useServiceStore } from "@/stores/services";
import { useSessionStore } from "@/stores/session";
import type { ApiResponse, ServiceCall } from "@/endpoints/types";
import type { Ref } from "vue";

export const useAuthorizedService = defineStore("authorizedService", () => {
  const services = useServiceStore();
  const auth = useSessionStore();

  const call = async <T, V>(
    service: ServiceCall<T, V>
  ): Promise<ApiResponse<T>> => {
    try {
      console.log("Making authenticated call with token", auth.token);
      const res = await services.call(service, auth.token);
      return res;
    } catch (e) {
      console.log("Error making authenticated call", e);
      const newToken = await auth.fetchNewToken();
      console.log("Trying again with new token", newToken);
      try {
        const res = await services.call(service, newToken);
        return res;
      } catch (e) {
        console.log("Error making authenticated call twice, logging out", e);
        throw {
          message: "Error making authenticated call twice, logging out",
        };
      }
    }
  };

  const response: Ref<<T, V>(service: ServiceCall<T, V>) => T | undefined> =
    storeToRefs(services).response as any;

  const getResponse = <V, T>(service: ServiceCall<T, V>): T | undefined => {
    return services.getResponse(service);
  };

  return {
    call,
    getResponse,
    response,
  };
});

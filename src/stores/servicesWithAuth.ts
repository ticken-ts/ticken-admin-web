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
    return services.call(service, auth.token);
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

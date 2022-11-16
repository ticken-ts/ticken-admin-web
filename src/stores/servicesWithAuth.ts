import { defineStore, storeToRefs } from 'pinia';
import { useServiceStore } from "@/stores/services";
import { useSessionStore } from "@/stores/session";
import type { ServiceCall } from "@/endpoints/types";

export const useAuthorizedService = defineStore("authorizedService", () => {
  const services = useServiceStore();
  const auth = useSessionStore();

  const call = async <T, V>(service: ServiceCall<T, V>): Promise<T> => {
    return services.call(service, auth.token);
  };

  const response = storeToRefs(services).response;

  const getResponse = <V, T>(service: ServiceCall<T, V>): T | undefined => {
    return services.getResponse(service);
  };

  return {
    call,
    getResponse,
    response,
  };
});

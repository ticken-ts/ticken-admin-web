import { defineStore, storeToRefs } from "pinia";
import { useServiceStore } from "@/stores/services";
import { useSessionStore } from "@/stores/session";
import type { ApiResponse, ServiceCall } from "@/endpoints/types";
import type { Ref } from "vue";
import { useQuery, useMutation, QueryClient } from "vue-query";

export const useAuthorizedService = defineStore("authorizedService", () => {
  const services = useServiceStore();
  const auth = useSessionStore();
  const queryClient = new QueryClient();

  const useAuthorizedQuery = <T, V>(service: Ref<ServiceCall<T, V>>) => {
    return useQuery<T, Error>(
      [auth, services, service],
      async ({ queryKey }) => {
        const authDep: typeof auth = queryKey[0] as any;
        const servicesDep: typeof services = queryKey[1] as any;
        const serviceDep: typeof service.value = queryKey[2] as any;
        try {
          return (await servicesDep.call(serviceDep, authDep.token)).data;
        } catch (e) {
          console.log("Error making authenticated call", e);
          const newToken = await authDep.fetchNewToken();
          console.log("Trying again with new token", newToken);
          try {
            const res = await servicesDep.call(serviceDep, newToken);
            return res.data;
          } catch (e) {
            console.log(
              "Error making authenticated call twice, logging out",
              e
            );
            throw {
              message: "Error making authenticated call twice, logging out",
            };
          }
        }
      },
      {
        refetchOnWindowFocus: false,
        retry: false,
      }
    );
  };

  const useAuthorizedMutation = <T, V>(service: Ref<ServiceCall<T, V>>) => {
    return useMutation(
      async (): Promise<T> => {
        try {
          return (await services.call(service.value, auth.token)).data;
        } catch (e) {
          console.log("Error making authenticated call", e);
          const newToken = await auth.fetchNewToken();
          console.log("Trying again with new token", newToken);
          try {
            const res = await services.call(service.value, newToken);
            return res.data;
          } catch (e) {
            console.log(
              "Error making authenticated call twice, logging out",
              e
            );
            throw {
              message: "Error making authenticated call twice, logging out",
            };
          }
        }
      },
      {
        onSuccess() {
          queryClient.invalidateQueries(service.value.key);
        },
      }
    );
  };

  return {
    useAuthorizedQuery,
    useAuthorizedMutation
  };
});

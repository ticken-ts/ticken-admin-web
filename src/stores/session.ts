import { defineStore } from "pinia";
import { useServiceStore } from "@/stores/services";
import { computed, ref } from "vue";
import { logIn } from "@/endpoints/auth";
import type { AppCredentials } from "@/endpoints/auth";

export const useSessionStore = defineStore(
  "session",
  () => {
    const service = useServiceStore();

    const token = ref("");
    const refreshToken = ref("");
    const loginError = ref("");
    const loading = ref(false);

    const isLoggedIn = computed(() => {
      return token.value.length > 0;
    });

    const login = async (credentials: AppCredentials) => {
      loading.value = true;
      service
        .call(logIn(credentials))
        .then((session) => {
          token.value = session.token;
          refreshToken.value = session.refreshToken;
        })
        .catch((e) => {
          loginError.value = e.message;
        })
        .finally(() => {
          loading.value = false;
        });
    };

    const logout = async () => {
      token.value = "";
      refreshToken.value = "";
    };

    return {
      token,
      refreshToken,
      isLoggedIn,
      loginError,
      login,
      logout,
      loading,
    };
  },
  {
    persist: {
      storage: localStorage,
      paths: ["token", "refreshToken"],
    },
  }
);

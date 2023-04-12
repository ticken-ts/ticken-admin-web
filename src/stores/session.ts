import { defineStore } from "pinia";
import { computed, ref } from "vue";
import Keycloak from "keycloak-js";
import { config } from "@/config/constants";

export const useSessionStore = defineStore(
  "session",
  () => {
    const token = ref("");
    const refreshToken = ref("");
    const loginError = ref("");
    const loading = ref(false);

    const keycloak = ref(
      new Keycloak({
        url: config.keycloakUrl,
        realm: "organizers",
        clientId: "client-organizer-app",
      })
    );

    const isLoggedIn = computed(() => {
      return token.value.length > 0;
    });

    const init = () => {
      keycloak.value
        .init({ onLoad: "login-required" })
        .then((authenticated) => {
          if (authenticated) {
            console.log("authenticated");
            token.value = keycloak.value.token || "";
          } else {
            window.location.reload();
          }
        });
    };

    const logout = async () => {
      await keycloak.value.logout();
      token.value = "";
      refreshToken.value = "";
    };

    return {
      token,
      refreshToken,
      isLoggedIn,
      loginError,
      logout,
      loading,
      init,
    };
  },
  {
    persist: {
      storage: localStorage,
      paths: ["token", "refreshToken"],
    },
  }
);

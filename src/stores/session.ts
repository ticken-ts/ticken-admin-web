import { defineStore } from "pinia";
import { computed, onMounted, ref } from "vue";
import Keycloak from "keycloak-js";
import { config } from "@/config/constants";

export const useSessionStore = defineStore(
  "session",
  () => {
    const token = ref("");
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
    };

    const fetchNewToken = async () => {
      console.log("Fetching new token")
      const newToken = await keycloak.value.updateToken(70);
      if (newToken && keycloak.value.token) {
        token.value = keycloak.value.token || "";
        return keycloak.value.token;
      }
    };

    const invalidateToken = () => {
      console.log("Invalidating token")
      token.value = "";
    };

    return {
      token,
      isLoggedIn,
      loginError,
      logout,
      loading,
      init,
      fetchNewToken,
      invalidateToken,
    };
  },
  {
    persist: {
      storage: localStorage,
      paths: ["token"],
    },
  }
);

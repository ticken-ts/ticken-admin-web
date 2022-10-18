import { defineStore } from "pinia";

export const useSessionStore = defineStore("session", {
  state: () => ({
    token: "",
    refreshToken: "",
  }),
  getters: {
    isLoggedIn: (state) => {
      return state.token.length > 0;
    },
  },
  actions: {
    async login() {
      this.token = "dummyToken";
    },
    async logout() {
      this.token = "";
    },
  },
  persist: {
    storage: localStorage,
  },
});

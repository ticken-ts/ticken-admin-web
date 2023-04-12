import { defineStore } from "pinia";
import type { ApiOrganizationReduced } from "@/endpoints/organization";

export const useSelectedOrganization = defineStore("organization", {
  state: (): ApiOrganizationReduced => ({
    name: "",
    id: "",
  }),
  actions: {
    selectOrganization(organization: ApiOrganizationReduced): void {
      this.id = organization.id;
      this.name = organization.name;
    },
  },
  persist: true,
});

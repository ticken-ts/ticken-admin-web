import { defineStore } from "pinia";
import type { ApiOrganizationReduced } from "@/endpoints/organization";

export const useSelectedOrganization = defineStore<
  string,
  Partial<ApiOrganizationReduced>
>("organization", {
  state: () => ({
    name: undefined,
    id: undefined,
  }),
  actions: {
    selectOrganization(organization: ApiOrganizationReduced) {
      this.id = organization.id;
      this.name = organization.name;
    },
  },
});

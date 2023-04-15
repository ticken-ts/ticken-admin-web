import { defineStore } from "pinia";
import type { ApiOrganization, Node, User } from "@/endpoints/organization";

type State = {
  name: string;
  id: string;
  channel: string;
  msp_id: string;
  nodes: Node[];
  users: User[];
}

type SelectOrganizationProps = {
  organization_id: string;
  name: string;
}

export const useSelectedOrganization = defineStore("organization", {
  state: (): State => ({
    name: "",
    id: "",
    channel: "",
    msp_id: "",
    nodes: [],
    users: [],
  }),
  actions: {
    selectOrganization(organization: SelectOrganizationProps): void {
      this.id = organization.organization_id;
      this.name = organization.name;
    },
  },
  persist: true,
});

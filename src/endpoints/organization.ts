import type { ServiceCall } from "@/endpoints/types";

export interface AppMember {
  email: string;
  role: string;
}

export interface ApiMember {
  email: string;
  id: string;
  role: string;
}

export interface AppPeer {
  name: string;
  url: string;
}

export interface ApiPeer {
  name: string;
  url: string;
  id: string;
}

export interface ApiOrganization {
  organization_id: string;
  name: string;
  msp_id: string;
  channel: string;
  users: User[];
  nodes: Node[];
}

export interface Node {
  node_name: string;
  address: string;
  org_cert: CERT;
  tls_cert: CERT;
}

export interface CERT {
  Content: string;
}

export interface User {
  organizer_id: string;
  username: string;
  role: string;
}

export const getMyOrganizations = (): ServiceCall<ApiOrganization[]> => ({
  method: "GET",
  endpoint: "/organizations",
  key: "my-organizations",
});

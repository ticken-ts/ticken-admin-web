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

export interface Organization {
  name: string;
  peers: AppPeer[];
  users: AppMember[];
}

export interface ApiOrganization {
  name: string;
  peers: ApiPeer[];
  users: ApiMember[];
  id: string;
}

export interface ApiOrganizationReduced {
  name: string;
  id: string;
}

export const getOrganization = (id: string): ServiceCall<ApiOrganization> => ({
  method: "GET",
  endpoint: `/organizations/${id}`,
  key: `organization-${id}`,
  mock:
    id === "123"
      ? {
          name: "My Org",
          peers: [
            {
              name: "peer-1",
              url: "https://peer-1.radicle.xyz",
              id: "567",
            },
            {
              name: "peer-2",
              url: "https://peer-2.radicle.xyz",
              id: "123",
            },
          ],
          id: id,
          users: [
            {
              email: "asd@asd.com",
              role: "admin",
              id: "123",
            },
          ],
        }
      : {
          name: "My Org 2",
          peers: [],
          users: [],
          id: id,
        },
});

export const getMyOrganizations = (): ServiceCall<
  ApiOrganizationReduced[]
> => ({
  method: "GET",
  endpoint: "/organizations",
  key: "my-organizations",
  mock: [
    {
      name: "My Org",
      id: "123",
    },
    {
      name: "My Org 2",
      id: "456",
    },
  ],
});

export const addMember = (
  organizationID: string,
  member: AppMember
): ServiceCall<ApiMember, AppMember> => {
  return {
    method: "POST",
    endpoint: `/organizations/${organizationID}/members`,
    body: member,
    mock: {
      email: member.email,
      role: member.role,
      id: "888",
    },
    mergeResponse: (state, res) => {
      state.responses[`organization-${organizationID}`].users.push(res);
    },
  };
};

export const deleteMember = (
  userID: string,
  organizationID: string
): ServiceCall<{}> => {
  return {
    method: "DELETE",
    endpoint: `/organizations/${organizationID}/members/${userID}`,
    mock: {},
    mergeResponse: (state) => {
      state.responses[`organization-${organizationID}`].users = state.responses[
        `organization-${organizationID}`
      ].users.filter((user: ApiMember) => user.id !== userID);
    },
  };
};

export const editMember = (
  userID: string,
  organizationID: string,
  member: AppMember
): ServiceCall<ApiMember, AppMember> => {
  return {
    method: "PUT",
    endpoint: `/organizations/${organizationID}/members/${userID}`,
    body: member,
    mock: {
      id: "888",
      email: member.email,
      role: member.role,
    },
    mergeResponse: (state, res) => {
      state.responses[`organization-${organizationID}`].users = state.responses[
        `organization-${organizationID}`
      ].users.map((user: ApiMember) => {
        if (user.id === userID) {
          return res;
        } else {
          return user;
        }
      });
    },
  };
};

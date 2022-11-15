import type { ServiceCall } from "@/endpoints/types";

export interface User {
  email: string;
  role: string;
}

export interface ApiUser {
  email: string;
  id: string;
  role: string;
}

export interface Peer {
  name: string;
  url: string;
}

export interface ApiPeer {
  name: string;
  url: string;
  id: string
}

export interface Organization {
  name: string;
  peers: Peer[];
  users: User[];
}

export interface ApiOrganization {
  name: string;
  peers: ApiPeer[];
  users: ApiUser[];
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

export interface AppMember {
  email: string;
  role: string;
}

export const addMember = (
  organizationID: string,
  member: AppMember
): ServiceCall<ApiOrganization, AppMember> => {
  const mock = getOrganization(organizationID).mock;

  return {
    method: "POST",
    endpoint: `/organizations/${organizationID}/members`,
    key: `organization-${organizationID}`,
    body: member,
    mock:
      mock != null
        ? {
            ...mock,
            users: [
              ...mock.users,
              {
                email: member.email,
                role: member.role,
                id: "888",
              },
            ],
          }
        : undefined,
  };
};

export const deleteMember = (userID: string, organizationID: string): ServiceCall<ApiOrganization> => {
  const mock = getOrganization(organizationID).mock;

  return {
    method: "DELETE",
    endpoint: `/organizations/${organizationID}/members/${userID}`,
    key: `organization-${organizationID}`,
    mock:
      mock != null
        ? {
            ...mock,
            users: mock.users.filter((user) => user.id !== userID),
          }
        : undefined,
  };
};

export const editMember = (
  userID: string,
  organizationID: string,
  member: AppMember
): ServiceCall<ApiOrganization, AppMember> => {
  const mock = getOrganization(organizationID).mock;

  return {
    method: "PUT",
    endpoint: `/organizations/${organizationID}/members/${userID}`,
    key: `organization-${organizationID}`,
    body: member,
    mock:
      mock != null
        ? {
            ...mock,
            users: mock.users.map((user) =>
              user.id === userID ? { ...user, role: member.role } : user
            ),
          }
        : undefined,
  };
};

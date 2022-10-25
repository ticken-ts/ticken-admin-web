import type { ServiceCall } from "@/endpoints/types";

type Session = {
  token: string;
  refreshToken: string;
};

type ApiCredentials = {
  email: string;
  password: string;
};

export type AppCredentials = {
  email: string;
  password: string;
};

export const logIn = (
  credentials: AppCredentials
): ServiceCall<Session, ApiCredentials> => ({
  method: "POST",
  endpoint: "/auth/login",
  key: "session",
  body: credentials,
  mock: {
    token: "123",
    refreshToken: "456",
  },
});

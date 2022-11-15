import type { ServiceCall } from "@/endpoints/types";

type Session = {
  token: string;
  refreshToken: string;
};

type ApiCredentials = {
  username: string;
  password: string;
  client_id: "postman-organizer-app";
  grant_type: "password";
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
  body: {
    client_id: "postman-organizer-app",
    grant_type: "password",
    username: credentials.email,
    password: credentials.password,
  },
  mock: {
    token: "eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAdGlja2VuLmNvbSIsInN1YiI6IjI5MGM2NDFhLTU1YTEtNDBmNS1hY2MzLWQ0ZWJlMzYyNmZkZCJ9",
    refreshToken: "456",
  },
});

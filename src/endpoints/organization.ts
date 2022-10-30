export interface User {
  email: string;
  role: string;
}

export interface Peer {
  name: string;
  url: string;
}

export interface Organization {
  name: string;
  peers: Peer[];
  users: User[];
}

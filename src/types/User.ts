export interface User {
  id: number;
  username: string;
  password: string;
}

export interface AuthenticatedUser {
  id: number;
  username: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}
export interface User {
  id: number;
  username: string;
  password: string;
  fullName: string;
}

export interface AuthenticatedUser {
  id: number;
  username: string;
  fullName: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}
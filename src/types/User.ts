export interface User {
  id: number;
  username: string;
  password: string;
  avatar: string;
  fullName: string;
}

export interface AuthenticatedUser {
  id: number;
  username: string;
  avatar: string;
  fullName: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}
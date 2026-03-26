import { User, AuthenticatedUser, LoginCredentials } from '../types';
import { apiClient } from '../api/apiClient';

export class AuthService {
  static async login(credentials: LoginCredentials): Promise<AuthenticatedUser> {
    const users = await apiClient.get<User[]>('/users');
    const user = users.find(u => u.username === credentials.username);
    
    // TODO: In production, passwords should be encryted and validated server-side
    // This is a mock implementation for demo purposes only
    if (!user || user.password !== credentials.password) {
      throw new Error('Invalid username or password!');
    }
    
    return {
      id: user.id,
      username: user.username,
      fullName: user.fullName
    };
  }
}
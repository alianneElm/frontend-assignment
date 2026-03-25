import { User, AuthenticatedUser, LoginCredentials } from '../types';
import { apiClient } from '../api/apiClient';

export class AuthService {
  static async login(credentials: LoginCredentials): Promise<AuthenticatedUser> {
    const users = await apiClient.get<User[]>('/users');
    
    const user = users.find(u => u.username === credentials.username);
    
    if (!user || user.password !== credentials.password) {
      throw new Error('Invalid username or password!');
    }
    
    return {
      id: user.id,
      username: user.username,
      avatar: user.avatar,
      fullName: user.fullName
    };
  }
}
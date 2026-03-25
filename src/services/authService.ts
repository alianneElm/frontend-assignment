import { User, AuthenticatedUser, LoginCredentials } from '../types';

const API_BASE_URL = 'http://localhost:3000';

export class AuthService {
  static async login(credentials: LoginCredentials): Promise<AuthenticatedUser> {
    try {
      const response = await fetch(`${API_BASE_URL}/users`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      
      const users: User[] = await response.json();
      
      const user = users.find(u => u.username === credentials.username);
      
      if (!user) {
        throw new Error('Invalid username or password!');
      }
      
      if (user.password !== credentials.password) {
        throw new Error('Invalid username or password!');
      }
      
      // Return user without password for security
      return {
        id: user.id,
        username: user.username
      };
      
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Authentication failed');
    }
  }
}
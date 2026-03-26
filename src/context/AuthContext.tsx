import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { AuthenticatedUser, LoginCredentials } from '../types';
import { AuthService } from '../services/authService';

export interface AuthContextType {
  user: AuthenticatedUser | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  error: string;
  clearError: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AuthenticatedUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadUserFromStorage = () => {
      try {
        const storedUser = localStorage.getItem('securityPlatform_user');
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          
          if (parsedUser?.id && parsedUser?.username && parsedUser?.fullName) {
            setUser(parsedUser);
          } else {
            localStorage.removeItem('securityPlatform_user');
          }
        }
      } catch (error) {
        console.error('Error loading user from storage:', error);
        localStorage.removeItem('securityPlatform_user');
      } finally {
        setIsLoading(false);
      }
    };

    loadUserFromStorage();
  }, []);

  const login = async (credentials: LoginCredentials): Promise<void> => {
    setIsLoading(true);
    setError(''); // Clear any previous error
    try {
      const authenticatedUser = await AuthService.login(credentials);
      setUser(authenticatedUser);
      localStorage.setItem('securityPlatform_user', JSON.stringify(authenticatedUser));
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unexpected error occurred');
      }
      throw error; // Still throw for the component to handle if needed
    } finally {
      setIsLoading(false);
    }
  };

  const logout = (): void => {
    setUser(null);
    setError(''); // Clear any error on logout
    localStorage.removeItem('securityPlatform_user');
  };

  const clearError = (): void => {
    setError('');
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    isLoading,
    error,
    clearError
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};


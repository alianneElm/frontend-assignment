import React from 'react';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './hooks';
import { Login } from './pages/Login';

const AppContent: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return <Login />;
  }

  return (
    <div>
      <h1>Welcome, {user.username}!</h1>
      <p>Dashboard here...</p>
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};
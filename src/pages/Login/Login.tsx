import React, { useState, FormEvent } from 'react';
import { useAuth } from '../../hooks';
import {
  LoginContainer,
  LoginCard,
  LoginTitle,
  LoginForm,
  FormGroup,
  Label,
  Input,
  Button,
  ErrorMessage,
  DemoCredentials
} from './Login.styles';

export const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, isLoading } = useAuth();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    try {
      await login({ username, password });
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
    }
  };

  return (
    <LoginContainer>
      <LoginCard>
        <LoginTitle>Log in</LoginTitle>
        
        {error && <ErrorMessage>{error}</ErrorMessage>}
        
        <LoginForm onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={isLoading}
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
            />
          </FormGroup>
          
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </Button>
        </LoginForm>
        
        <DemoCredentials>
          <h4>Demo Credentials:</h4>
          <p><strong>User 1:</strong> demouser1 / demo123</p>
          <p><strong>User 2:</strong> demouser2 / demo456</p>
        </DemoCredentials>
      </LoginCard>
    </LoginContainer>
  );
};
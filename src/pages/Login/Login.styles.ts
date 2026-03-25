import styled from 'styled-components';

export const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
`;

export const LoginCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`;

export const LoginTitle = styled.h1`
  text-align: center;
  margin-bottom: 2rem;
  color: #333;
  font-size: 1.5rem;
`;

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Label = styled.label`
  font-weight: 500;
  color: #555;
`;

export const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #131414;
    box-shadow: 0 0 0 2px rgba(34, 35, 36, 0.25);
  }
`;

export const Button = styled.button`
  padding: 0.75rem;
  background-color: #145f84;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 1rem;
  
  &:hover {
    background-color: #0560bb;
  }
  
  &:disabled {
    background-color: #6c757d;
    cursor: not-allowed;
  }
`;

export const ErrorMessage = styled.div`
  color: #dc3545;
  margin-bottom: 2rem;
`;

export const DemoCredentials = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  background-color: #e9ecef9f;
  border-radius: 4px;
  font-size: 0.875rem;
  
  h4 {
    margin: 0 0 0.5rem 0;
    color: #191c20;
  }
  
  p {
    margin: 0.25rem 0;
    color: #6c757d;
  }
`;
import styled from 'styled-components';

export const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
  background-color: #fef2f2;
  color: #dc2626;
  font-family: system-ui, sans-serif;
`;

export const ErrorTitle = styled.h1`
  color: #dc2626;
  margin: 0 0 1rem 0;
  font-size: 2rem;
  font-weight: 700;
`;

export const ErrorMessage = styled.p`
  color: #dc2626;
  margin: 0 0 1rem 0;
  font-size: 1.1rem;
  line-height: 1.5;
  text-align: center;
`;

export const ReloadButton = styled.button`
  margin-top: 1rem;
  padding: 0.75rem 1.5rem;
  background-color: #dc2626;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #b91c1c;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
  }
`;
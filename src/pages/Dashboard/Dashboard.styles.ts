import styled from 'styled-components';

export const DashboardContainer = styled.div`
  min-height: 100vh;
  background-color: #f8f9fa;
`;

export const Header = styled.header`
  background: white;
  padding: 1rem 2rem;
  border-bottom: 1px solid #dee2e6;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

export const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
`;

export const Title = styled.h1`
  margin: 0;
  color: #333;
  font-size: 1.5rem;
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const WelcomeText = styled.span`
  color: #666;
  font-size: 0.9rem;
`;

export const LogoutButton = styled.button`
  padding: 0.5rem 1rem;
  color: #8b0613fe;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.875rem;
  
  &:hover {
    background: #c82333;
    color: white;
  }
`;

export const MainContent = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

export const SectionTitle = styled.h2`
  margin: 0 0 1.5rem 0;
  color: #333;
  font-size: 1.25rem;
`;

export const SitesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`;

export const LoadingMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: #666;
  font-size: 1.1rem;
`;

export const ErrorMessage = styled.div`
  background: #f8d7da;
  color: #721c24;
  padding: 1rem;
  border-radius: 4px;
  border: 1px solid #f5c6cb;
  margin-bottom: 1rem;
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  color: #666;
  
  h3 {
    margin: 0 0 0.5rem 0;
    color: #333;
  }
  
  p {
    margin: 0;
    font-size: 0.9rem;
  }
`;
import styled from 'styled-components';

export const DashboardContainer = styled.div`
  min-height: 100vh;
  background-color: #f9fafb;
`;

export const Header = styled.header`
  background: #ffffff;
  padding: 16px 24px;
  border-bottom: 1px solid #e5e7eb;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
`;

export const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 24px;

  @media (max-width: 768px) {
    padding: 0 12px;
    flex-direction: column;
    gap: 16px;
    text-align: center;
  }
`;

export const BrandContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;


export const Title = styled.h1`
  margin: 0;
  color: #111827;
  font-size: 20px;
  font-weight: 600;
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;


export const UserDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const WelcomeText = styled.span`
  color: #6b7280;
  font-size: 14px;
  font-weight: 500;
`;

export const UserName = styled.span`
  color: #111827;
  font-size: 14px;
  font-weight: 600;
`;

export const LogoutButton = styled.button`
  padding: 8px 16px;
  color: #dc2626;
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;
  
  &:hover {
    background: #dc2626;
    color: white;
    border-color: #dc2626;
  }
`;

export const MainContent = styled.main`
  max-width: 1400px;
  margin: 0 auto;
  padding: 32px 24px;

  @media (max-width: 768px) {
    padding: 16px 12px;
  }
`;

export const SectionTitle = styled.h2`
  margin: 0 0 24px 0;
  color: #111827;
  font-size: 18px;
  font-weight: 600;
`;

export const SitesGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
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
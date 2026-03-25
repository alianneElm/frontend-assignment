import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks';
import { Site } from '../../types';
import { SitesService } from '../../services/sitesService';
import {
  DashboardContainer,
  Header,
  HeaderContent,
  Title,
  UserInfo,
  WelcomeText,
  LogoutButton,
  MainContent,
  SectionTitle,
  SitesGrid,
  LoadingMessage,
  ErrorMessage,
  EmptyState
} from './Dashboard.styles';

export const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [sites, setSites] = useState<Site[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadSites = async () => {
      if (!user) return;

      try {
        setLoading(true);
        setError('');
        const userSites = await SitesService.getSitesByUser(user.username);
        setSites(userSites);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Failed to load sites');
        }
      } finally {
        setLoading(false);
      }
    };

    loadSites();
  }, [user]);

  const handleLogout = () => {
    logout();
  };

  if (!user) {
    return null;
  }

  return (
    <DashboardContainer>
      <Header>
        <HeaderContent>
          <Title>Site Management System</Title>
          <UserInfo>
            <WelcomeText>Welcome, {user.username}!</WelcomeText>
            <LogoutButton onClick={handleLogout}>
              Log out
            </LogoutButton>
          </UserInfo>
        </HeaderContent>
      </Header>

      <MainContent>
        <SectionTitle>Your Sites</SectionTitle>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        {loading ? (
          <LoadingMessage>Loading your sites...</LoadingMessage>
        ) : sites.length === 0 ? (
          <EmptyState>
            <h3>No sites found</h3>
            <p>You don't have any sites assigned to your account.</p>
          </EmptyState>
        ) : (
          <SitesGrid>
            {sites.map(site => (
              <div key={site.id} style={{
                background: 'white',
                padding: '1.5rem',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                border: '1px solid #dee2e6'
              }}>
                <h3 style={{ margin: '0 0 0.5rem 0', color: '#333' }}>
                  {site.title}
                </h3>
                <p style={{ margin: '0', color: '#666', fontSize: '0.9rem' }}>
                  Owner: {site.owner}
                </p>
                <p style={{ margin: '0.5rem 0 0 0', color: '#666', fontSize: '0.9rem' }}>
                  Site ID: #{site.id}
                </p>
              </div>
            ))}
          </SitesGrid>
        )}
      </MainContent>
    </DashboardContainer>
  );
};
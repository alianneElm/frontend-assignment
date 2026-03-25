import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks';
import { Site } from '../../types';
import { SitesService } from '../../services/sitesService';
import { Modal } from '../../components/Modal';
import { DevicesList } from '../../components/DevicesList';
import { SiteCard } from '../../components/SiteCard';
import {
  DashboardContainer,
  Header,
  HeaderContent,
  BrandContainer,
  Logo,
  Title,
  UserInfo,
  UserAvatar,
  UserDetails,
  WelcomeText,
  UserName,
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
  const [selectedSite, setSelectedSite] = useState<Site | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleSiteClick = (site: Site) => {
    setSelectedSite(site);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedSite(null);
  };

  if (!user) {
    return null;
  }

  return (
    <DashboardContainer>
      <Header>
        <HeaderContent>
          <BrandContainer>
            <Logo 
              src="/images/logo.png" 
              alt="Security Platform Logo"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            <Title>Security Platform</Title>
          </BrandContainer>
          <UserInfo>
            <UserAvatar 
              src={user.avatar} 
              alt={user.fullName}
              onError={(e) => {
                e.currentTarget.src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(user.fullName) + '&size=40&background=e5e7eb&color=6b7280';
              }}
            />
            <UserDetails>
              <UserName>{user.fullName}</UserName>
              <WelcomeText>@{user.username}</WelcomeText>
            </UserDetails>
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
              <SiteCard 
                key={site.id}
                site={site}
                onClick={handleSiteClick}
              />
            ))}
          </SitesGrid>
        )}
      </MainContent>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={selectedSite ? `Devices in ${selectedSite.title}` : ''}
      >
        {selectedSite && (
          <DevicesList 
            siteId={selectedSite.id} 
            siteName={selectedSite.title}
          />
        )}
      </Modal>
    </DashboardContainer>
  );
};
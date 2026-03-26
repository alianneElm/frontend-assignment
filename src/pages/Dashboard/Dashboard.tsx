import React, { useState, useEffect } from 'react';
import { Shield, User } from 'lucide-react';
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
  const [logoVisible, setLogoVisible] = useState(true);

  useEffect(() => {
    if (!user) return;

    const abortController = new AbortController();

    const loadSites = async () => {
      try {
        setLoading(true);
        setError('');
        const userSites = await SitesService.getSitesByUser(user.username);
        
        // Only update state if request wasn't aborted
        if (!abortController.signal.aborted) {
          setSites(userSites);
        }
      } catch (err) {
        if (abortController.signal.aborted) return;
        
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Failed to load sites');
        }
      } finally {
        if (!abortController.signal.aborted) {
          setLoading(false);
        }
      }
    };

    loadSites();

    // Abort request just in case component unmounts or user changes
    return () => {
      abortController.abort();
    };
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
            <Shield size={32} color="#145f84" />
            <Title>Security Platform</Title>
          </BrandContainer>
          <UserInfo>
            <User size={40} color="#6b7280" />
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
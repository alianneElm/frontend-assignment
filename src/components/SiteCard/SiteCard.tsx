import React from 'react';
import { Site } from '../../types';
import {
  CardContainer,
  SiteImage,
  SiteInfo,
  SiteHeader,
  SiteTitle,
  StatusDot,
  SiteDetails,
  DetailChip,
  DetailLabel,
  DetailValue,
  ActionButton
} from './SiteCard.styles';

interface SiteCardProps {
  site: Site;
  onClick: (site: Site) => void;
}

export const SiteCard: React.FC<SiteCardProps> = ({ site, onClick }) => {
  return (
    <CardContainer>
      <SiteImage 
        src={site.image} 
        alt={site.title}
        onError={(e) => {
          e.currentTarget.src = 'https://via.placeholder.com/60x60/f3f4f6/9ca3af?text=Site';
        }}
      />
      
      <SiteInfo>
        <SiteHeader>
          <SiteTitle>{site.title}</SiteTitle>
          <StatusDot />
        </SiteHeader>
        
        <SiteDetails>
          <DetailChip>
            <DetailLabel>ID:</DetailLabel>
            <DetailValue>#{site.id}</DetailValue>
          </DetailChip>
          
          <DetailChip>
            <DetailLabel>Owner:</DetailLabel>
            <DetailValue>{site.owner}</DetailValue>
          </DetailChip>
          
          <DetailChip>
            <DetailLabel>Location:</DetailLabel>
            <DetailValue>{site.location}</DetailValue>
          </DetailChip>
        </SiteDetails>
      </SiteInfo>
      
      <ActionButton onClick={() => onClick(site)}>
        View Devices
      </ActionButton>
    </CardContainer>
  );
};
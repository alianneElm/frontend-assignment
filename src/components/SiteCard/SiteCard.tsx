import React from 'react';
import { Building2 } from 'lucide-react';
import { Site } from '../../types';
import {
  CardContainer,
  SiteIconContainer,
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
      <SiteIconContainer>
        <Building2 size={32} color="#145f84" />
      </SiteIconContainer>
      
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
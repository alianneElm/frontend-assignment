import React from 'react';
import { Building2 } from 'lucide-react';
import { Site } from '../../types';
import {
  CardContainer,
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
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '60px', height: '60px', backgroundColor: '#f3f4f6', borderRadius: '50%' }}>
        <Building2 size={32} color="#145f84" />
      </div>
      
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
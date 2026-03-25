import styled from 'styled-components';

export const CardContainer = styled.div`
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  display: flex;
  align-items: center;
  gap: 20px;
  height: auto;
  margin-bottom: 12px;
  
  &:hover {
    box-shadow: 0 4px 20px rgba(59, 130, 246, 0.12);
    transform: translateY(-1px);
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
    padding: 16px;
  }
`;

export const SiteImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #f1f5f9;
  flex-shrink: 0;
`;

export const SiteInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
`;

export const SiteHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const SiteTitle = styled.h3`
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #111827;
  line-height: 1.2;
`;

export const StatusDot = styled.div`
  width: 8px;
  height: 8px;
  background: #10b981;
  border-radius: 50%;
  flex-shrink: 0;
  box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.2);
`;

export const SiteDetails = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 12px;
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const DetailChip = styled.div`
  padding: 4px 10px;
  font-size: 12px;
  color: #475569;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const DetailLabel = styled.span`
  color: #94a3b8;
  font-weight: 400;
`;

export const DetailValue = styled.span`
  color: #334155;
  font-weight: 600;
`;

export const ActionButton = styled.button`
  color: rgb(20, 95, 132);
  border: none;
  padding: 12px 24px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(28, 68, 88, 0.35);
  flex-shrink: 0;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(117, 118, 123, 0.4);
    background: rgb(20, 95, 132);
    color: white;
  }
  
  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    width: 100%;
    margin-top: 8px;
  }
`;
import styled from 'styled-components';

export const DevicesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const LoadingMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: #666;
  font-size: 1rem;
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
  padding: 2rem;
  color: #666;
  
  h4 {
    margin: 0 0 0.5rem 0;
    color: #333;
    font-size: 1.1rem;
  }
  
  p {
    margin: 0;
    font-size: 0.9rem;
  }
`;

export const DeviceCard = styled.div`
  background: white;
  border: 1px solid #f0f0f0;
  border-radius: 12px;
  padding: 0;
  transition: all 0.2s ease;
  overflow: hidden;
  
  &:hover {
    border-color: #e0e0e0;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    transform: translateY(-1px);
  }
`;


export const DeviceContent = styled.div`
  padding: 1.5rem;
`;

export const DeviceHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
`;

export const DeviceTitle = styled.h4`
  margin: 0;
  color: #1a1a1a;
  font-size: 1.1rem;
  font-weight: 600;
`;

export const DeviceStatus = styled.div.withConfig({
  shouldForwardProp: (prop) => !['connected', 'enabled'].includes(prop),
})<{ connected: boolean; enabled: boolean }>`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

export const StatusBadge = styled.div<{ type: 'enabled' | 'disabled' | 'connected' | 'disconnected' }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
  font-weight: 500;
  color: #6b7280;
`;

export const StatusLight = styled.div<{ type: 'enabled' | 'disabled' | 'connected' | 'disconnected' }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  
  ${props => {
    switch (props.type) {
      case 'enabled':
        return 'background: #10b981; box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.2);';
      case 'disabled':
        return 'background: #9ca3af; box-shadow: 0 0 0 2px rgba(156, 163, 175, 0.2);';
      case 'connected':
        return 'background: #3b82f6; box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);';
      case 'disconnected':
        return 'background: #ef4444; box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.2);';
      default:
        return 'background: #9ca3af; box-shadow: 0 0 0 2px rgba(156, 163, 175, 0.2);';
    }
  }}
`;

export const DeviceDescription = styled.p`
  margin: 0 0 1rem 0;
  color: #6b7280;
  font-size: 0.875rem;
  line-height: 1.4;
  font-style: italic;
`;

export const DeviceDetails = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 1.5rem;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #f3f4f6;
`;

export const DetailItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const DetailLabel = styled.span`
  font-size: 0.7rem;
  color: #9ca3af;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

export const DetailValue = styled.span`
  color: #1f2937;
  font-size: 0.8rem;
  font-weight: 600;
  font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
`;

export const StorageSection = styled.div`
  margin-top: 0.75rem;
`;

export const StorageTitle = styled.h5`
  margin: 0 0 0.5rem 0;
  color: #6b7280;
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

export const StorageList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

export const StorageItem = styled.div<{ state: 'ok' | 'unavailable' }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8rem;
  font-weight: 500;
  color: #6b7280;
`;

export const StorageLight = styled.div<{ state: 'ok' | 'unavailable' }>`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  
  ${props => props.state === 'ok' 
    ? 'background: #10b981; box-shadow: 0 0 0 1.5px rgba(16, 185, 129, 0.2);'
    : 'background: #ef4444; box-shadow: 0 0 0 1.5px rgba(239, 68, 68, 0.2);'
  }
`;
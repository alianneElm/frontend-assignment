import React, { useState, useEffect } from 'react';
import { Video, Volume2 } from 'lucide-react';
import { Device } from '../../types';
import { DevicesService } from '../../services/devicesService';
import {
  DevicesContainer,
  LoadingMessage,
  ErrorMessage,
  EmptyState,
  DeviceCard,
  DeviceContent,
  DeviceHeader,
  DeviceTitle,
  DeviceStatus,
  StatusBadge,
  StatusLight,
  DeviceDescription,
  DeviceDetails,
  DetailItem,
  DetailLabel,
  DetailValue,
  StorageSection,
  StorageTitle,
  StorageList,
  StorageItem,
  StorageLight
} from './DevicesList.styles';

interface DevicesListProps {
  siteId: number;
  siteName: string;
}

export const DevicesList: React.FC<DevicesListProps> = ({ siteId, siteName }) => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const abortController = new AbortController();
    
    const loadDevices = async () => {
      try {
        setLoading(true);
        setError('');
        const siteDevices = await DevicesService.getDevicesBySite(siteId);
        
        // Update state in case request wasn't aborted
        if (!abortController.signal.aborted) {
          setDevices(siteDevices);
        }
      } catch (err) {
        // Don't show errors for aborted requests
        if (abortController.signal.aborted) return;
        
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Failed to load devices');
        }
      } finally {
        if (!abortController.signal.aborted) {
          setLoading(false);
        }
      }
    };

    loadDevices();
    
    // Abort request in case component unmounts or siteId changes
    return () => {
      abortController.abort();
    };
  }, [siteId]);

  if (loading) {
    return <LoadingMessage>Loading devices for {siteName}...</LoadingMessage>;
  }

  if (error) {
    return <ErrorMessage>Error: {error}</ErrorMessage>;
  }

  if (devices.length === 0) {
    return (
      <EmptyState>
        <h4>No devices found</h4>
        <p>There are no devices configured for {siteName}.</p>
      </EmptyState>
    );
  }

  return (
    <DevicesContainer>
      {devices.map(device => (
        <DeviceCard key={device.id}>
          <DeviceContent>
            <DeviceHeader>
              <DeviceTitle style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', backgroundColor: '#ffffff', borderRadius: '50%', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                  {device.title.toLowerCase().includes('hornspeaker') || device.title.toLowerCase().includes('speaker') ? (
                    <Volume2 size={20} color="#145f84" />
                  ) : (
                    <Video size={20} color="#145f84" />
                  )}
                </div>
                {device.title}
              </DeviceTitle>
              <DeviceStatus connected={device.connected} enabled={device.enabled}>
                <StatusBadge type={device.enabled ? 'enabled' : 'disabled'}>
                  <StatusLight type={device.enabled ? 'enabled' : 'disabled'} />
                  {device.enabled ? 'Active' : 'Inactive'}
                </StatusBadge>
                <StatusBadge type={device.connected ? 'connected' : 'disconnected'}>
                  <StatusLight type={device.connected ? 'connected' : 'disconnected'} />
                  {device.connected ? 'Online' : 'Offline'}
                </StatusBadge>
              </DeviceStatus>
            </DeviceHeader>

            <DeviceDescription>{device.description}</DeviceDescription>

            <DeviceDetails>
              <DetailItem>
                <DetailLabel>Model</DetailLabel>
                <DetailValue>{device.model}</DetailValue>
              </DetailItem>
              <DetailItem>
                <DetailLabel>Version</DetailLabel>
                <DetailValue>{device.version}</DetailValue>
              </DetailItem>
              <DetailItem>
                <DetailLabel>Device ID</DetailLabel>
                <DetailValue>#{device.id}</DetailValue>
              </DetailItem>
              <DetailItem>
                <DetailLabel>Timezone</DetailLabel>
                <DetailValue>{device.timezone}</DetailValue>
              </DetailItem>
            </DeviceDetails>

            {device.storages.length > 0 && (
              <StorageSection>
                <StorageTitle>Storage</StorageTitle>
                <StorageList>
                  {device.storages.map((storage, index) => (
                    <StorageItem key={index} state={storage.state}>
                      <StorageLight state={storage.state} />
                      {storage.id}
                    </StorageItem>
                  ))}
                </StorageList>
              </StorageSection>
            )}
          </DeviceContent>
        </DeviceCard>
      ))}
    </DevicesContainer>
  );
};
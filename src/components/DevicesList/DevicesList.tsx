import React, { useState, useEffect } from 'react';
import { Video, Volume2 } from 'lucide-react';
import { Device } from '../../types';
import { DevicesService } from '../../services/devicesService';
import { useWebSocket } from '../../hooks';
import {
  DevicesContainer,
  LoadingMessage,
  ErrorMessage,
  EmptyState,
  DeviceCard,
  DeviceContent,
  DeviceHeader,
  DeviceTitle,
  TitleWrapper,
  IconContainer,
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

  useWebSocket('ws://localhost:8080', (data) => {
    const event = data as {
      type: string;
      payload: { deviceId: number; connected: boolean; enabled: boolean };
    };

    if (event.type === 'DEVICE_STATUS_CHANGED') {
      setDevices(prev =>
        prev.map(device =>
          device.id === event.payload.deviceId
            ? { ...device, connected: event.payload.connected, enabled: event.payload.enabled }
            : device
        )
      );
    }
  });

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
              <TitleWrapper>
                <IconContainer>
                  {device.title.toLowerCase().includes('hornspeaker') || device.title.toLowerCase().includes('speaker') ? (
                    <Volume2 size={20} color="#145f84" />
                  ) : (
                    <Video size={20} color="#145f84" />
                  )}
                </IconContainer>
                <DeviceTitle>{device.title}</DeviceTitle>
              </TitleWrapper>
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
import React, { useState, useEffect } from 'react';
import { Device } from '../../types';
import { DevicesService } from '../../services/devicesService';
import {
  DevicesContainer,
  LoadingMessage,
  ErrorMessage,
  EmptyState,
  DeviceCard,
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
    const loadDevices = async () => {
      try {
        setLoading(true);
        setError('');
        const siteDevices = await DevicesService.getDevicesBySite(siteId);
        setDevices(siteDevices);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Failed to load devices');
        }
      } finally {
        setLoading(false);
      }
    };

    loadDevices();
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
          <DeviceHeader>
            <DeviceTitle>
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
        </DeviceCard>
      ))}
    </DevicesContainer>
  );
};
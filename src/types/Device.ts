export interface DeviceStorage {
  id: string;
  state: 'ok' | 'unavailable';
}

export interface Device {
  id: number;
  site_id: number;
  title: string;
  description: string;
  model: string;
  version: string;
  enabled: boolean;
  connected: boolean;
  timezone: string;
  image: string;
  thumbnail: string;
  storages: DeviceStorage[];
}
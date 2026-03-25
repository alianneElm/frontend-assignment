export enum StorageState {
  OK = 'ok',
  UNAVAILABLE = 'unavailable'
}

export enum DeviceStatus {
  ACTIVE = 'active',      // enabled and connected
  OFFLINE = 'offline',    // enabled but disconnected  
  DISABLED = 'disabled'   // not enabled
}

export interface DeviceStorage {
  id: string;
  state: StorageState;
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
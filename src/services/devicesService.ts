import { Device } from '../types';

const API_BASE_URL = 'http://localhost:3000';

export class DevicesService {
  static async getDevicesBySite(siteId: number): Promise<Device[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/devices`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch devices');
      }
      
      const devices: Device[] = await response.json();
      
      return devices.filter(device => device.site_id === siteId);
      
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Failed to load devices');
    }
  }

  static async getAllDevices(): Promise<Device[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/devices`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch devices');
      }
      
      return await response.json();
      
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Failed to load devices');
    }
  }

  static async getDeviceById(deviceId: number): Promise<Device | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/devices`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch devices');
      }
      
      const devices: Device[] = await response.json();
      return devices.find(device => device.id === deviceId) || null;
      
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Failed to load device');
    }
  }
}
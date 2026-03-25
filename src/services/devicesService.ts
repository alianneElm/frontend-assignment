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

}
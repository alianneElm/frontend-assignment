import { Device } from '../types';
import { apiClient } from '../api/apiClient';

export class DevicesService {
  static async getDevicesBySite(siteId: number): Promise<Device[]> {
    // Use json-server query params for server-side filtering
    return apiClient.get<Device[]>(`/devices?site_id=${siteId}`);
  }
}
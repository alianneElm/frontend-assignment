import { Site } from '../types';
import { apiClient } from '../api/apiClient';

export class SitesService {
  static async getSitesByUser(username: string): Promise<Site[]> {
    // Use json-server query params for server-side filtering
    return apiClient.get<Site[]>(`/sites?owner=${username}&_sort=title&_order=asc`);
  }
}
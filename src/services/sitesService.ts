import { Site } from '../types';
import { apiClient } from '../api/apiClient';

export class SitesService {
  static async getSitesByUser(userId: number): Promise<Site[]> {
    // Use json-server query params for server-side filtering
    return apiClient.get<Site[]>(`/sites?owner_id=${userId}&_sort=title&_order=asc`);
  }
}
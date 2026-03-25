import { Site } from '../types';

const API_BASE_URL = 'http://localhost:3000';

export class SitesService {
  static async getSitesByUser(username: string): Promise<Site[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/sites`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch sites');
      }
      
      const sites: Site[] = await response.json();
      
      return sites.filter(site => site.owner === username);
      
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Failed to load sites');
    }
  }

}
const API_BASE_URL = 'http://localhost:3000';

export class ApiError extends Error {
  constructor(message: string, public status?: number) {
    super(message);
    this.name = 'ApiError';
  }
}

export const apiClient = {
  async get<T>(endpoint: string, signal?: AbortSignal): Promise<T> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        signal: signal || controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new ApiError(`Failed to fetch ${endpoint}`, response.status);
      }
      
      return response.json();
    } catch (error) {
      clearTimeout(timeoutId);
      
      if (error instanceof Error && error.name === 'AbortError') {
        throw new ApiError('Request was cancelled');
      }
      
      if (error instanceof ApiError) {
        throw error;
      }
      
      throw new ApiError('Network error occurred');
    }
  }
};
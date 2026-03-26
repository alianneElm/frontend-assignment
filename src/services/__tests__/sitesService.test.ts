import { describe, it, expect, beforeEach, vi } from 'vitest'
import { SitesService } from '../sitesService'

vi.mock('../../api/apiClient', () => ({
  apiClient: {
    get: vi.fn()
  }
}))

import { apiClient } from '../../api/apiClient'

describe('SitesService', () => {
  const mockSites = [
    {
      id: 1,
      title: 'Stockholm Office',
      owner: 'demouser1',
      location: 'Stockholm, Sweden'
    },
    {
      id: 2,
      title: 'Warehouse District',
      owner: 'demouser1', 
      location: 'Industrial Zone'
    }
  ]

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('fetches sites for a specific user', async () => {
    apiClient.get = vi.fn().mockResolvedValue(mockSites)

    const result = await SitesService.getSitesByUser('demouser1')

    expect(apiClient.get).toHaveBeenCalledWith('/sites?owner=demouser1&_sort=title&_order=asc')
    expect(result).toEqual(mockSites)
  })

  it('handles empty results', async () => {
    apiClient.get = vi.fn().mockResolvedValue([])

    const result = await SitesService.getSitesByUser('nonexistentuser')

    expect(result).toEqual([])
  })

  it('handles API errors', async () => {
    apiClient.get = vi.fn().mockRejectedValue(new Error('Network error'))

    await expect(
      SitesService.getSitesByUser('demouser1')
    ).rejects.toThrow('Network error')
  })
})
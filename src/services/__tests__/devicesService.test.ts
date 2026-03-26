import { describe, it, expect, beforeEach, vi } from 'vitest'
import { DevicesService } from '../devicesService'

vi.mock('../../api/apiClient', () => ({
  apiClient: {
    get: vi.fn()
  }
}))

import { apiClient } from '../../api/apiClient'

describe('DevicesService', () => {
  const mockDevices = [
    {
      id: 1,
      title: 'Demo camera 1',
      description: 'Overview of main entrance',
      model: 'M2025-LE',
      version: '6.50.2',
      enabled: true,
      connected: true,
      timezone: 'CET-1',
      storages: [
        { id: 'NetworkShare', state: 'ok' },
        { id: 'SDCard', state: 'ok' }
      ]
    }
  ]

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('fetches devices for a specific site', async () => {
    apiClient.get = vi.fn().mockResolvedValue(mockDevices)

    const result = await DevicesService.getDevicesBySite(1)

    expect(apiClient.get).toHaveBeenCalledWith('/devices?site_id=1')
    expect(result).toEqual(mockDevices)
  })

  it('handles empty device list', async () => {
    apiClient.get = vi.fn().mockResolvedValue([])

    const result = await DevicesService.getDevicesBySite(999)

    expect(result).toEqual([])
  })

  it('handles API errors', async () => {
    apiClient.get = vi.fn().mockRejectedValue(new Error('API Error'))

    await expect(
      DevicesService.getDevicesBySite(1)
    ).rejects.toThrow('API Error')
  })
})
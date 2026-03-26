import { describe, it, expect, beforeEach, vi } from 'vitest'
import { apiClient } from '../apiClient'

describe('apiClient', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('fetches data successfully', async () => {
    const mockData = { id: 1 }
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockData)
    })
    globalThis.fetch = mockFetch

    const result = await apiClient.get('/test')
    expect(result).toEqual(mockData)
  })

  it('throws error on failed request', async () => {
    const mockFetch = vi.fn().mockResolvedValue({ ok: false })
    globalThis.fetch = mockFetch

    await expect(apiClient.get('/test')).rejects.toThrow()
  })
})
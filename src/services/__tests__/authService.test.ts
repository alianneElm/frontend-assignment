import { describe, it, expect, vi } from 'vitest'
import { AuthService } from '../authService'

vi.mock('../../api/apiClient', () => ({
  apiClient: {
    get: vi.fn()
  }
}))

import { apiClient } from '../../api/apiClient'

describe('AuthService', () => {
  it('logs in with valid credentials', async () => {
    apiClient.get = vi.fn().mockResolvedValue([
      { id: 1, username: 'test', password: '123', fullName: 'Test User' }
    ])

    const result = await AuthService.login({ username: 'test', password: '123' })
    
    expect(result.username).toBe('test')
    expect(result.fullName).toBe('Test User')
  })

  it('throws error with invalid credentials', async () => {
    apiClient.get = vi.fn().mockResolvedValue([])

    await expect(
      AuthService.login({ username: 'wrong', password: 'wrong' })
    ).rejects.toThrow('Invalid username or password!')
  })
})
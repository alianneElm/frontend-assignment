import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { DevicesList } from './DevicesList'

vi.mock('../../hooks', () => ({
  useWebSocket: vi.fn()
}))

vi.mock('../../services/devicesService', () => ({
  DevicesService: {
    getDevicesBySite: vi.fn()
  }
}))

import { DevicesService } from '../../services/devicesService'

describe('DevicesList', () => {
  it('shows loading initially', () => {
    DevicesService.getDevicesBySite = vi.fn().mockImplementation(() => new Promise(() => {}))
    
    render(<DevicesList siteId={1} siteName="Test Site" />)
    expect(screen.getByText('Loading devices for Test Site...')).toBeInTheDocument()
  })

  it('displays devices when loaded', async () => {
    const mockDevices = [{
      id: 1,
      title: 'Test Camera',
      description: 'Test description',
      model: 'TEST-001',
      version: '1.0',
      enabled: true,
      connected: true,
      timezone: 'UTC',
      storages: []
    }]
    
    DevicesService.getDevicesBySite = vi.fn().mockResolvedValue(mockDevices)
    
    render(<DevicesList siteId={1} siteName="Test Site" />)
    
    await waitFor(() => {
      expect(screen.getByText('Test Camera')).toBeInTheDocument()
    })
  })
})
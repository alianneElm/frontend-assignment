import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { Dashboard } from './Dashboard'

vi.mock('../../hooks', () => ({
  useAuth: vi.fn()
}))

vi.mock('../../services/sitesService', () => ({
  SitesService: {
    getSitesByUser: vi.fn()
  }
}))

import { useAuth } from '../../hooks'
import { SitesService } from '../../services/sitesService'

const mockUseAuth = useAuth as ReturnType<typeof vi.fn>

describe('Dashboard', () => {
  const mockUser = {
    id: 1,
    username: 'testuser',
    fullName: 'Test User'
  }

  const mockSites = [
    {
      id: 1,
      title: 'Test Site',
      owner: 'testuser',
      location: 'Test Location'
    }
  ]

  beforeEach(() => {
    vi.clearAllMocks()
    mockUseAuth.mockReturnValue({
      user: mockUser,
      logout: vi.fn(),
      isLoading: false
    })
  })

  it('returns null when no user', () => {
    mockUseAuth.mockReturnValue({
      user: null,
      logout: vi.fn(),
      isLoading: false
    })

    const { container } = render(<Dashboard />)
    expect(container.firstChild).toBeNull()
  })

  it('renders dashboard with user info and sites', async () => {
    SitesService.getSitesByUser = vi.fn().mockResolvedValue(mockSites)

    render(<Dashboard />)
    
    expect(screen.getByText('Security Platform')).toBeInTheDocument()
    expect(screen.getByText('Test User')).toBeInTheDocument()
    expect(screen.getByText('@testuser')).toBeInTheDocument()
    
    await waitFor(() => {
      expect(screen.getByText('Test Site')).toBeInTheDocument()
    })
  })

  it('shows empty state when no sites', async () => {
    SitesService.getSitesByUser = vi.fn().mockResolvedValue([])

    render(<Dashboard />)
    
    await waitFor(() => {
      expect(screen.getByText('No sites found')).toBeInTheDocument()
    })
  })

  it('calls logout when button clicked', () => {
    const mockLogout = vi.fn()
    SitesService.getSitesByUser = vi.fn().mockResolvedValue(mockSites)
    
    mockUseAuth.mockReturnValue({
      user: mockUser,
      logout: mockLogout,
      isLoading: false
    })

    render(<Dashboard />)
    
    const logoutButton = screen.getByText('Log out')
    logoutButton.click()
    
    expect(mockLogout).toHaveBeenCalled()
  })

  it('shows loading state initially', () => {
    SitesService.getSitesByUser = vi.fn().mockImplementation(() => new Promise(() => {}))
    
    render(<Dashboard />)
    
    expect(screen.getByText('Loading your sites...')).toBeInTheDocument()
    expect(screen.queryByText('No sites found')).not.toBeInTheDocument()
  })

  it('displays error message when SitesService throws Error object', async () => {
    SitesService.getSitesByUser = vi.fn().mockRejectedValue(new Error('Network error'))
    
    render(<Dashboard />)
    
    await waitFor(() => {
      expect(screen.getByText('Network error')).toBeInTheDocument()
      expect(screen.queryByText('Loading your sites...')).not.toBeInTheDocument()
    })
  })

  it('displays generic error message when SitesService throws non-Error object', async () => {
    SitesService.getSitesByUser = vi.fn().mockRejectedValue('String error')
    
    render(<Dashboard />)
    
    await waitFor(() => {
      expect(screen.getByText('Failed to load sites')).toBeInTheDocument()
      expect(screen.queryByText('Loading your sites...')).not.toBeInTheDocument()
    })
  })

  it('opens modal when site card is clicked', async () => {
    const user = userEvent.setup()
    SitesService.getSitesByUser = vi.fn().mockResolvedValue(mockSites)
    
    render(<Dashboard />)
    
    await waitFor(() => {
      expect(screen.getByText('Test Site')).toBeInTheDocument()
    })
    
    const siteCard = screen.getByText('View Devices')
    await user.click(siteCard)
    
    await waitFor(() => {
      expect(screen.getByText('Devices in Test Site')).toBeInTheDocument()
    })
  })

  it('closes modal when close button is clicked', async () => {
    const user = userEvent.setup()
    SitesService.getSitesByUser = vi.fn().mockResolvedValue(mockSites)
    
    render(<Dashboard />)
    
    // Open modal first
    await waitFor(() => {
      expect(screen.getByText('Test Site')).toBeInTheDocument()
    })
    
    const siteCard = screen.getByText('View Devices')
    await user.click(siteCard)
    
    await waitFor(() => {
      expect(screen.getByText('Devices in Test Site')).toBeInTheDocument()
    })
    
    const closeButton = screen.getByLabelText('Close modal')
    await user.click(closeButton)
    
    await waitFor(() => {
      expect(screen.queryByText('Devices in Test Site')).not.toBeInTheDocument()
    })
  })

  it('renders multiple sites correctly', async () => {
    const multipleSites = [
      { id: 1, title: 'Site One', owner: 'testuser', location: 'Location 1' },
      { id: 2, title: 'Site Two', owner: 'testuser', location: 'Location 2' },
      { id: 3, title: 'Site Three', owner: 'testuser', location: 'Location 3' }
    ]
    
    SitesService.getSitesByUser = vi.fn().mockResolvedValue(multipleSites)
    
    render(<Dashboard />)
    
    await waitFor(() => {
      expect(screen.getByText('Site One')).toBeInTheDocument()
      expect(screen.getByText('Site Two')).toBeInTheDocument()
      expect(screen.getByText('Site Three')).toBeInTheDocument()
    })
    
    const siteCards = screen.getAllByText('View Devices')
    expect(siteCards).toHaveLength(3)
  })

  it('handles user with special characters in username and name', async () => {
    const specialUser = {
      id: 1,
      username: 'user.name+test@domain.com',
      fullName: 'José María O\'Connor-Smith'
    }
    
    mockUseAuth.mockReturnValue({
      user: specialUser,
      logout: vi.fn(),
      isLoading: false
    })
    
    SitesService.getSitesByUser = vi.fn().mockResolvedValue(mockSites)
    
    render(<Dashboard />)
    
    expect(screen.getByText('José María O\'Connor-Smith')).toBeInTheDocument()
    expect(screen.getByText('@user.name+test@domain.com')).toBeInTheDocument()
  })

  it('handles user with very long username and name', async () => {
    const longUser = {
      id: 1,
      username: 'a'.repeat(100),
      fullName: 'Very Long Name That Could Overflow UI Components'.repeat(3)
    }
    
    mockUseAuth.mockReturnValue({
      user: longUser,
      logout: vi.fn(),
      isLoading: false
    })
    
    SitesService.getSitesByUser = vi.fn().mockResolvedValue(mockSites)
    
    render(<Dashboard />)
    
    expect(screen.getByText(longUser.fullName)).toBeInTheDocument()
    expect(screen.getByText(`@${longUser.username}`)).toBeInTheDocument()
  })

  it('handles empty username gracefully', async () => {
    const emptyUsernameUser = {
      id: 1,
      username: '',
      fullName: 'User With Empty Username'
    }
    
    mockUseAuth.mockReturnValue({
      user: emptyUsernameUser,
      logout: vi.fn(),
      isLoading: false
    })
    
    SitesService.getSitesByUser = vi.fn().mockResolvedValue([])
    
    render(<Dashboard />)
    
    expect(screen.getByText('User With Empty Username')).toBeInTheDocument()
    expect(screen.getByText('@')).toBeInTheDocument()
  })

  it('handles sites with special characters in titles and locations', async () => {
    const specialSites = [
      {
        id: 1,
        title: 'Café & Restaurant "Cuba Cafe"',
        owner: 'testuser',
        location: 'São Paulo, Brazil (GPS: -23.5505, -46.6333)'
      },
      {
        id: 2,
        title: 'משרד תל-אביב',
        owner: 'testuser',
        location: '北京市朝阳区'
      }
    ]
    
    SitesService.getSitesByUser = vi.fn().mockResolvedValue(specialSites)
    
    render(<Dashboard />)
    
    await waitFor(() => {
      expect(screen.getByText('Café & Restaurant "Cuba Cafe"')).toBeInTheDocument()
      expect(screen.getByText('משרד תל-אביב')).toBeInTheDocument()
      expect(screen.getByText('São Paulo, Brazil (GPS: -23.5505, -46.6333)')).toBeInTheDocument()
      expect(screen.getByText('北京市朝阳区')).toBeInTheDocument()
    })
  })

  it('renders empty state message correctly', async () => {
    SitesService.getSitesByUser = vi.fn().mockResolvedValue([])
    
    render(<Dashboard />)
    
    await waitFor(() => {
      expect(screen.getByText('No sites found')).toBeInTheDocument()
      expect(screen.getByText('You don\'t have any sites assigned to your account.')).toBeInTheDocument()
    })
  })

  it('calls SitesService with correct username', async () => {
    const testUser = { id: 1, username: 'specific-user', fullName: 'Specific User' }
    
    mockUseAuth.mockReturnValue({
      user: testUser,
      logout: vi.fn(),
      isLoading: false
    })
    
    const getSitesByUserSpy = vi.fn().mockResolvedValue(mockSites)
    SitesService.getSitesByUser = getSitesByUserSpy
    
    render(<Dashboard />)
    
    await waitFor(() => {
      expect(getSitesByUserSpy).toHaveBeenCalledWith('specific-user')
    })
  })

  it('handles rapid user changes without setting state on unmounted component', async () => {
    const firstUser = { id: 1, username: 'user1', fullName: 'First User' }
    const secondUser = { id: 2, username: 'user2', fullName: 'Second User' }
    
    SitesService.getSitesByUser = vi.fn().mockImplementation(() => 
      new Promise(resolve => setTimeout(() => resolve(mockSites), 100))
    )
    
    mockUseAuth.mockReturnValue({
      user: firstUser,
      logout: vi.fn(),
      isLoading: false
    })
    
    const { rerender } = render(<Dashboard />)
    
    mockUseAuth.mockReturnValue({
      user: secondUser,
      logout: vi.fn(),
      isLoading: false
    })
    
    rerender(<Dashboard />)
    
    await waitFor(() => {
      expect(SitesService.getSitesByUser).toHaveBeenCalledWith('user2')
    }, { timeout: 200 })
  })

  it('shows correct modal title with selected site', async () => {
    const user = userEvent.setup()
    const siteWithLongTitle = {
      id: 1,
      title: 'Very Long Site Name That Could Test Modal Title Handling',
      owner: 'testuser',
      location: 'Test Location'
    }
    
    SitesService.getSitesByUser = vi.fn().mockResolvedValue([siteWithLongTitle])
    
    render(<Dashboard />)
    
    await waitFor(() => {
      expect(screen.getByText(siteWithLongTitle.title)).toBeInTheDocument()
    })
    
    const siteCard = screen.getByText('View Devices')
    await user.click(siteCard)
    
    await waitFor(() => {
      expect(screen.getByText(`Devices in ${siteWithLongTitle.title}`)).toBeInTheDocument()
    })
  })
})
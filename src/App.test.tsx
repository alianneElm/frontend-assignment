import { render, screen } from '@testing-library/react'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { App } from './App'

vi.mock('./hooks', () => ({
  useAuth: vi.fn()
}))

vi.mock('./pages/Login', () => ({
  Login: () => <div>Login Component</div>
}))

vi.mock('./pages/Dashboard', () => ({
  Dashboard: () => <div>Dashboard Component</div>
}))

import { useAuth } from './hooks'

const mockUseAuth = useAuth as ReturnType<typeof vi.fn>

describe('App', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('shows loading state', () => {
    mockUseAuth.mockReturnValue({
      user: null,
      isLoading: true
    })

    render(<App />)
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('shows login when no user', () => {
    mockUseAuth.mockReturnValue({
      user: null,
      isLoading: false
    })

    render(<App />)
    expect(screen.getByText('Login Component')).toBeInTheDocument()
  })

  it('shows dashboard when user is logged in', () => {
    mockUseAuth.mockReturnValue({
      user: { id: 1, username: 'test' },
      isLoading: false
    })

    render(<App />)
    expect(screen.getByText('Dashboard Component')).toBeInTheDocument()
  })
})
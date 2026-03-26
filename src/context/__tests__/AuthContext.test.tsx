import { render, screen, act, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import React from 'react'
import { AuthProvider, AuthContext } from '../AuthContext'
import { useAuth } from '../../hooks'

vi.mock('../../services/authService', () => ({
  AuthService: {
    login: vi.fn().mockResolvedValue({})
  }
}))

import { AuthService } from '../../services/authService'

const mockAuthService = vi.mocked(AuthService)

const createLocalStorageMock = () => {
  let store: { [key: string]: string } = {}
  
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value
    },
    removeItem: (key: string) => {
      delete store[key]
    },
    clear: () => {
      store = {}
    }
  }
}

const TestComponent = () => {
  const auth = useAuth()
  
  return (
    <div>
      <div data-testid="user">{auth.user ? JSON.stringify(auth.user) : 'null'}</div>
      <div data-testid="isLoading">{auth.isLoading.toString()}</div>
      <button 
        data-testid="login"
        onClick={() => auth.login({ username: 'test', password: 'test123' })}
      >
        Login
      </button>
      <button data-testid="logout" onClick={auth.logout}>
        Logout
      </button>
    </div>
  )
}

describe('AuthContext', () => {
  const mockUser = {
    id: 1,
    username: 'testuser',
    fullName: 'Test User'
  }

  let localStorageMock: ReturnType<typeof createLocalStorageMock>

  beforeEach(() => {
    localStorageMock = createLocalStorageMock()
    
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
      writable: true
    })
    
    vi.clearAllMocks()
    mockAuthService.login.mockReset()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('provides initial state with no user and loading false after mount', async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )

    await waitFor(() => {
      expect(screen.getByTestId('user')).toHaveTextContent('null')
      expect(screen.getByTestId('isLoading')).toHaveTextContent('false')
    })
  })

  it('loads user from localStorage on mount', async () => {
    localStorageMock.setItem('securityPlatform_user', JSON.stringify(mockUser))

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )

    await waitFor(() => {
      expect(screen.getByTestId('user')).toHaveTextContent(JSON.stringify(mockUser))
      expect(screen.getByTestId('isLoading')).toHaveTextContent('false')
    })
  })

  it('ignores invalid JSON in localStorage', async () => {
    localStorageMock.setItem('securityPlatform_user', 'invalid-json')

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )

    await waitFor(() => {
      expect(screen.getByTestId('user')).toHaveTextContent('null')
      expect(screen.getByTestId('isLoading')).toHaveTextContent('false')
    })

    expect(localStorageMock.getItem('securityPlatform_user')).toBeNull()
  })

  it('ignores incomplete user data in localStorage', async () => {
    const incompleteUser = { id: 1, username: 'test' } // missing fullName
    localStorageMock.setItem('securityPlatform_user', JSON.stringify(incompleteUser))

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )

    await waitFor(() => {
      expect(screen.getByTestId('user')).toHaveTextContent('null')
      expect(screen.getByTestId('isLoading')).toHaveTextContent('false')
    })

    expect(localStorageMock.getItem('securityPlatform_user')).toBeNull()
  })

  it('handles successful login', async () => {
    mockAuthService.login.mockResolvedValue(mockUser)

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )

    await waitFor(() => {
      expect(screen.getByTestId('isLoading')).toHaveTextContent('false')
    })

    await act(async () => {
      screen.getByTestId('login').click()
    })

    await waitFor(() => {
      expect(screen.getByTestId('user')).toHaveTextContent(JSON.stringify(mockUser))
      expect(screen.getByTestId('isLoading')).toHaveTextContent('false')
    })

    expect(localStorageMock.getItem('securityPlatform_user')).toBe(JSON.stringify(mockUser))
  })

  it('handles login failure', async () => {
    const loginError = new Error('Invalid credentials')
    mockAuthService.login.mockRejectedValue(loginError)

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )

    await waitFor(() => {
      expect(screen.getByTestId('isLoading')).toHaveTextContent('false')
    })

    expect(screen.getByTestId('user')).toHaveTextContent('null')
    expect(localStorageMock.getItem('securityPlatform_user')).toBeNull()
  })

  it('shows loading state during login', async () => {
    let resolveLogin: (value: any) => void
    const loginPromise = new Promise((resolve) => {
      resolveLogin = resolve
    })
    mockAuthService.login.mockReturnValue(loginPromise)

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )

    await waitFor(() => {
      expect(screen.getByTestId('isLoading')).toHaveTextContent('false')
    })

    act(() => {
      screen.getByTestId('login').click()
    })

    await waitFor(() => {
      expect(screen.getByTestId('isLoading')).toHaveTextContent('true')
    })

    act(() => {
      resolveLogin!(mockUser)
    })

    await waitFor(() => {
      expect(screen.getByTestId('isLoading')).toHaveTextContent('false')
      expect(screen.getByTestId('user')).toHaveTextContent(JSON.stringify(mockUser))
    })
  })

  it('handles logout correctly', async () => {
    localStorageMock.setItem('securityPlatform_user', JSON.stringify(mockUser))

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )

    await waitFor(() => {
      expect(screen.getByTestId('user')).toHaveTextContent(JSON.stringify(mockUser))
    })

    act(() => {
      screen.getByTestId('logout').click()
    })

    await waitFor(() => {
      expect(screen.getByTestId('user')).toHaveTextContent('null')
    })
    expect(localStorageMock.getItem('securityPlatform_user')).toBeNull()
  })

  it('handles user with special characters', async () => {
    const specialUser = {
      id: 1,
      username: 'user@domain.com',
      fullName: 'José María O\'Connor-Smith'
    }

    localStorageMock.setItem('securityPlatform_user', JSON.stringify(specialUser))

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )

    await waitFor(() => {
      expect(screen.getByTestId('user')).toHaveTextContent(JSON.stringify(specialUser))
    })
  })

  it('handles empty localStorage gracefully', async () => {
    localStorageMock.clear()

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )

    await waitFor(() => {
      expect(screen.getByTestId('user')).toHaveTextContent('null')
      expect(screen.getByTestId('isLoading')).toHaveTextContent('false')
    })
  })

  it('handles localStorage with null value', async () => {
    localStorageMock.setItem('securityPlatform_user', 'null')

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )

    await waitFor(() => {
      expect(screen.getByTestId('user')).toHaveTextContent('null')
      expect(screen.getByTestId('isLoading')).toHaveTextContent('false')
    })
  })

  it('handles user data with extra properties', async () => {
    const userWithExtraProps = {
      id: 1,
      username: 'testuser',
      fullName: 'Test User',
      extra: 'property',
      nested: { data: 'value' }
    }

    localStorageMock.setItem('securityPlatform_user', JSON.stringify(userWithExtraProps))

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )

    await waitFor(() => {
      expect(screen.getByTestId('user')).toHaveTextContent(JSON.stringify(userWithExtraProps))
    })
  })

  it('validates required user properties', async () => {
    const invalidUser = { username: 'test', fullName: 'Test User' } // missing id
    localStorageMock.setItem('securityPlatform_user', JSON.stringify(invalidUser))

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )

    await waitFor(() => {
      expect(screen.getByTestId('user')).toHaveTextContent('null')
    })

    expect(localStorageMock.getItem('securityPlatform_user')).toBeNull()
  })

  it('provides context value correctly', async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )

    await waitFor(() => {
      expect(screen.getByTestId('isLoading')).toHaveTextContent('false')
    })

    expect(screen.getByTestId('login')).toBeInTheDocument()
    expect(screen.getByTestId('logout')).toBeInTheDocument()
  })

  it('handles multiple rapid login/logout operations', async () => {
    mockAuthService.login.mockResolvedValue(mockUser)

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )

    await waitFor(() => {
      expect(screen.getByTestId('isLoading')).toHaveTextContent('false')
    })

    await act(async () => {
      screen.getByTestId('login').click()
    })

    await waitFor(() => {
      expect(screen.getByTestId('user')).toHaveTextContent(JSON.stringify(mockUser))
    })

    act(() => {
      screen.getByTestId('logout').click()
    })

    await waitFor(() => {
      expect(screen.getByTestId('user')).toHaveTextContent('null')
    })

    await act(async () => {
      screen.getByTestId('login').click()
    })

    await waitFor(() => {
      expect(screen.getByTestId('user')).toHaveTextContent(JSON.stringify(mockUser))
    })
  })
})
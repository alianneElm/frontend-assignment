import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import userEvent from '@testing-library/user-event'
import { Login } from './Login'

const mockLogin = vi.fn()
const mockClearError = vi.fn()
const mockUseAuth = vi.fn()

vi.mock('../../hooks', () => ({
  useAuth: () => mockUseAuth()
}))

describe('Login', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockUseAuth.mockReturnValue({
      login: mockLogin,
      isLoading: false,
      error: '',
      clearError: mockClearError
    })
  })

  it('renders login form with all elements', () => {
    render(<Login />)
    
    expect(screen.getByText('Log in')).toBeInTheDocument()
    expect(screen.getByLabelText('Username')).toBeInTheDocument()
    expect(screen.getByLabelText('Password')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument()
    
    const usernameInput = screen.getByLabelText('Username')
    const passwordInput = screen.getByLabelText('Password')
    
    expect(usernameInput).toHaveAttribute('type', 'text')
    expect(usernameInput).toHaveAttribute('required')
    expect(passwordInput).toHaveAttribute('type', 'password')
    expect(passwordInput).toHaveAttribute('required')
  })

  it('allows user to type in username and password fields', async () => {
    const user = userEvent.setup()
    render(<Login />)
    
    const usernameInput = screen.getByLabelText('Username')
    const passwordInput = screen.getByLabelText('Password')
    
    await user.type(usernameInput, 'testuser')
    await user.type(passwordInput, 'testpass')
    
    expect(usernameInput).toHaveValue('testuser')
    expect(passwordInput).toHaveValue('testpass')
  })

  it('calls login function when form is submitted', async () => {
    const user = userEvent.setup()
    render(<Login />)
    
    const usernameInput = screen.getByLabelText('Username')
    const passwordInput = screen.getByLabelText('Password')
    const submitButton = screen.getByRole('button', { name: 'Login' })
    
    await user.type(usernameInput, 'testuser')
    await user.type(passwordInput, 'testpass')
    await user.click(submitButton)
    
    expect(mockLogin).toHaveBeenCalledWith({
      username: 'testuser',
      password: 'testpass'
    })
  })

  it('can submit form by pressing Enter', async () => {
    const user = userEvent.setup()
    render(<Login />)
    
    const usernameInput = screen.getByLabelText('Username')
    const passwordInput = screen.getByLabelText('Password')
    
    await user.type(usernameInput, 'testuser')
    await user.type(passwordInput, 'testpass')
    await user.keyboard('{Enter}')
    
    expect(mockLogin).toHaveBeenCalledWith({
      username: 'testuser',
      password: 'testpass'
    })
  })

  it('shows loading state when isLoading is true', () => {
    mockUseAuth.mockReturnValue({
      login: mockLogin,
      isLoading: true
    })
    
    render(<Login />)
    
    const submitButton = screen.getByRole('button')
    const usernameInput = screen.getByLabelText('Username')
    const passwordInput = screen.getByLabelText('Password')
    
    expect(submitButton).toHaveTextContent('Logging in...')
    expect(submitButton).toBeDisabled()
    expect(usernameInput).toBeDisabled()
    expect(passwordInput).toBeDisabled()
  })

  it('displays error message when login fails with Error object', async () => {
    const user = userEvent.setup()
    mockLogin.mockRejectedValue(new Error('Invalid credentials'))
    
    // Mock AuthContext with error
    mockUseAuth.mockReturnValue({
      login: mockLogin,
      isLoading: false,
      error: 'Invalid credentials',
      clearError: mockClearError
    })
    
    render(<Login />)
    
    expect(screen.getByText('Invalid credentials')).toBeInTheDocument()
  })

  it('displays generic error message when login fails with non-Error object', async () => {
    // Mock AuthContext with generic error
    mockUseAuth.mockReturnValue({
      login: mockLogin,
      isLoading: false,
      error: 'An unexpected error occurred',
      clearError: mockClearError
    })
    
    render(<Login />)
    
    expect(screen.getByText('An unexpected error occurred')).toBeInTheDocument()
  })

  it('calls clearError when form is submitted', async () => {
    const user = userEvent.setup()
    
    render(<Login />)
    
    const usernameInput = screen.getByLabelText('Username')
    const passwordInput = screen.getByLabelText('Password')
    const submitButton = screen.getByRole('button', { name: 'Login' })
    
    await user.type(usernameInput, 'user')
    await user.type(passwordInput, 'pass')
    await user.click(submitButton)
    
    expect(mockClearError).toHaveBeenCalled()
  })

  it('prevents form submission with empty fields due to required attribute', async () => {
    const user = userEvent.setup()
    render(<Login />)
    
    const submitButton = screen.getByRole('button', { name: 'Login' })
    
    await user.click(submitButton)
    
    expect(mockLogin).not.toHaveBeenCalled()
  })

  it('handles form submission with only username filled', async () => {
    const user = userEvent.setup()
    render(<Login />)
    
    const usernameInput = screen.getByLabelText('Username')
    const submitButton = screen.getByRole('button', { name: 'Login' })
    
    await user.type(usernameInput, 'onlyuser')
    await user.click(submitButton)
    
    expect(mockLogin).not.toHaveBeenCalled()
  })

  it('handles form submission with only password filled', async () => {
    const user = userEvent.setup()
    render(<Login />)
    
    const passwordInput = screen.getByLabelText('Password')
    const submitButton = screen.getByRole('button', { name: 'Login' })
    
    await user.type(passwordInput, 'onlypass')
    await user.click(submitButton)
    
    expect(mockLogin).not.toHaveBeenCalled()
  })

  it('handles special characters in username and password', async () => {
    const user = userEvent.setup()
    render(<Login />)
    
    const usernameInput = screen.getByLabelText('Username')
    const passwordInput = screen.getByLabelText('Password')
    const submitButton = screen.getByRole('button', { name: 'Login' })
    
    await user.type(usernameInput, 'user@domain.com')
    await user.type(passwordInput, 'p@ssw0rd!123')
    await user.click(submitButton)
    
    expect(mockLogin).toHaveBeenCalledWith({
      username: 'user@domain.com',
      password: 'p@ssw0rd!123'
    })
  })

  it('handles very long input values', async () => {
    const user = userEvent.setup()
    render(<Login />)
    
    const longUsername = 'a'.repeat(1000)
    const longPassword = 'b'.repeat(1000)
    
    const usernameInput = screen.getByLabelText('Username')
    const passwordInput = screen.getByLabelText('Password')
    const submitButton = screen.getByRole('button', { name: 'Login' })
    
    await user.type(usernameInput, longUsername)
    await user.type(passwordInput, longPassword)
    await user.click(submitButton)
    
    expect(mockLogin).toHaveBeenCalledWith({
      username: longUsername,
      password: longPassword
    })
  })
})
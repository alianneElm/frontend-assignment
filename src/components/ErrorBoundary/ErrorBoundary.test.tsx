import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { ErrorBoundary } from './ErrorBoundary'

const ThrowError = () => {
  throw new Error('Test error')
}

const GoodComponent = () => <div>Working component</div>

describe('ErrorBoundary', () => {
  it('renders children when no error', () => {
    render(
      <ErrorBoundary>
        <GoodComponent />
      </ErrorBoundary>
    )
    
    expect(screen.getByText('Working component')).toBeInTheDocument()
  })

  it('renders error UI when child throws', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {}) // Suppress console.error
    
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    )
    
    expect(screen.getByText('Security Platform Error')).toBeInTheDocument()
    expect(screen.getByText('Something went wrong. Please refresh the page.')).toBeInTheDocument()
  })
})
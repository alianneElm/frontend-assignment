import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { SiteCard } from './SiteCard'

describe('SiteCard', () => {
  const mockSite = {
    id: 1,
    title: 'Test Site',
    owner: 'testuser',
    location: 'Test Location'
  }

  it('renders site information', () => {
    render(<SiteCard site={mockSite} onClick={() => {}} />)
    
    expect(screen.getByText('Test Site')).toBeInTheDocument()
    expect(screen.getByText('#1')).toBeInTheDocument()
    expect(screen.getByText('testuser')).toBeInTheDocument()
    expect(screen.getByText('Test Location')).toBeInTheDocument()
  })

  it('calls onClick when button is clicked', async () => {
    const onClick = vi.fn()
    render(<SiteCard site={mockSite} onClick={onClick} />)
    
    const button = screen.getByText('View Devices')
    button.click()
    
    expect(onClick).toHaveBeenCalledWith(mockSite)
  })
})
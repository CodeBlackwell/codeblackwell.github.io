import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import HomePage from '../page'

describe('HomePage', () => {
  it('renders hero section with name', () => {
    render(<HomePage />)
    expect(screen.getByText('Christopher Blackwell')).toBeInTheDocument()
  })

  it('renders hero description', () => {
    render(<HomePage />)
    expect(
      screen.getByText(/full-stack developer crafting exceptional digital experiences/i)
    ).toBeInTheDocument()
  })

  it('renders call-to-action buttons', () => {
    render(<HomePage />)
    expect(screen.getByRole('link', { name: /view projects/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /get in touch/i })).toBeInTheDocument()
  })

  it('renders social links', () => {
    render(<HomePage />)

    const githubLinks = screen.getAllByRole('link').filter(link =>
      link.getAttribute('href')?.includes('github')
    )
    expect(githubLinks.length).toBeGreaterThan(0)

    const linkedinLinks = screen.getAllByRole('link').filter(link =>
      link.getAttribute('href')?.includes('linkedin')
    )
    expect(linkedinLinks.length).toBeGreaterThan(0)

    const emailLinks = screen.getAllByRole('link').filter(link =>
      link.getAttribute('href')?.includes('mailto')
    )
    expect(emailLinks.length).toBeGreaterThan(0)
  })

  it('renders skills section', () => {
    render(<HomePage />)
    expect(screen.getByText('Technical Skills')).toBeInTheDocument()
    // Use getAllByText since skills appear multiple times
    const typeScriptElements = screen.getAllByText('TypeScript')
    expect(typeScriptElements.length).toBeGreaterThan(0)

    const reactElements = screen.getAllByText('React')
    expect(reactElements.length).toBeGreaterThan(0)

    const nextElements = screen.getAllByText('Next.js')
    expect(nextElements.length).toBeGreaterThan(0)
  })

  it('renders projects section', () => {
    render(<HomePage />)
    expect(screen.getByText('Featured Projects')).toBeInTheDocument()
    expect(screen.getByText('AI-Powered Analytics Dashboard')).toBeInTheDocument()
    expect(screen.getByText('E-Commerce Platform')).toBeInTheDocument()
    expect(screen.getByText('Developer Tools CLI')).toBeInTheDocument()
  })

  it('renders contact section', () => {
    render(<HomePage />)
    expect(screen.getByText("Let's Connect")).toBeInTheDocument()
    expect(
      screen.getByText(/I'm always interested in hearing about new projects/i)
    ).toBeInTheDocument()
  })
})
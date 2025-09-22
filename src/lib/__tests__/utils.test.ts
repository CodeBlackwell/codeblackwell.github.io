import { describe, it, expect } from 'vitest'
import { cn } from '../utils'

describe('cn utility', () => {
  it('merges class names', () => {
    expect(cn('foo', 'bar')).toBe('foo bar')
  })

  it('handles conditional classes', () => {
    expect(cn('foo', false && 'bar', 'baz')).toBe('foo baz')
    expect(cn('foo', true && 'bar', 'baz')).toBe('foo bar baz')
  })

  it('merges Tailwind classes correctly', () => {
    expect(cn('p-4', 'p-2')).toBe('p-2')
    expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500')
  })

  it('handles arrays', () => {
    expect(cn(['foo', 'bar'], 'baz')).toBe('foo bar baz')
  })

  it('handles objects', () => {
    expect(cn({ foo: true, bar: false, baz: true })).toBe('foo baz')
  })

  it('handles undefined and null values', () => {
    expect(cn('foo', undefined, null, 'bar')).toBe('foo bar')
  })

  it('handles duplicate classes from tailwind-merge', () => {
    // tailwind-merge doesn't deduplicate non-tailwind classes
    // but it does merge conflicting tailwind classes
    expect(cn('p-4', 'p-4')).toBe('p-4')
  })
})
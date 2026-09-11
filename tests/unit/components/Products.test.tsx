// @vitest-environment jsdom

import '../setup-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import Products from '@/components/Products'

const product = {
  id: 'product-1',
  name: 'Personal alarm',
  description: 'An easy-to-use personal alarm for peace of mind.',
  price: 12.5,
  billing_frequency: 'monthly' as const,
  image_url: '/images/alarm.png',
}

describe('Products', () => {
  it('shows the empty catalog message', () => {
    render(<Products products={[]} />)

    expect(screen.getByText('No products available at the moment.')).toBeInTheDocument()
    expect(screen.queryByText('Click for details →')).not.toBeInTheDocument()
  })

  it.each([
    { frequency: 'monthly' as const, price: '£12.50 /month', billing: 'Billed monthly' },
    { frequency: 'yearly' as const, price: '£12.50 /year', billing: 'Billed yearly' },
    { frequency: 'one-off' as const, price: '£12.50', billing: 'One-off payment' },
  ])('formats $frequency pricing in the card and modal', async ({ frequency, price, billing }) => {
    const user = userEvent.setup()
    render(<Products products={[{ ...product, billing_frequency: frequency }]} />)

    expect(screen.getByText(price, { exact: true })).toBeInTheDocument()
    await user.click(screen.getByRole('heading', { name: product.name, level: 3 }))

    expect(screen.getAllByText(price, { exact: true })).toHaveLength(2)
    expect(screen.getByText(billing)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Contact Us' })).toHaveAttribute('href', '/contact')
  })

  it('hides zero-price and billing details in both the card and modal', async () => {
    const user = userEvent.setup()
    render(<Products products={[{ ...product, price: 0 }]} />)

    expect(screen.queryByText(/£/)).not.toBeInTheDocument()
    await user.click(screen.getByRole('heading', { name: product.name, level: 3 }))

    expect(screen.getByRole('heading', { name: product.name, level: 2 })).toBeInTheDocument()
    expect(screen.queryByText(/£/)).not.toBeInTheDocument()
    expect(screen.queryByText(/Billed monthly|Billed yearly|One-off payment/)).not.toBeInTheDocument()
  })

  it('expands a truncated description, keeps interior clicks open, and closes the modal', async () => {
    const user = userEvent.setup()
    const description = 'A personal alarm with easy-to-use controls and reliable support. '.repeat(3)
    render(<Products products={[{ ...product, description }]} />)

    expect(screen.getByText(`${description.slice(0, 100)}...`)).toBeInTheDocument()
    expect(screen.queryByText(description.trim())).not.toBeInTheDocument()
    await user.click(screen.getByRole('heading', { name: product.name, level: 3 }))

    const fullDescription = screen.getByText(description.trim())
    await user.click(fullDescription)
    expect(fullDescription).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Close' }))
    expect(screen.queryByRole('heading', { name: product.name, level: 2 })).not.toBeInTheDocument()
    expect(screen.queryByText(description.trim())).not.toBeInTheDocument()
  })
})

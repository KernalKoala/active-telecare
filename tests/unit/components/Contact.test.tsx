// @vitest-environment jsdom

import '../setup-dom'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import Contact from '@/components/Contact'

const fetchMock = vi.fn<typeof fetch>()
const submission = {
  name: 'Alex Example',
  email: 'alex@example.com',
  phone: '01234567890',
  message: 'Please tell me more about your personal alarms.',
}

async function fillForm(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByPlaceholderText('Name'), submission.name)
  await user.type(screen.getByPlaceholderText('Email'), submission.email)
  await user.type(screen.getByPlaceholderText('Phone Number'), submission.phone)
  await user.type(screen.getByPlaceholderText('Message'), submission.message)
}

describe('Contact', () => {
  beforeEach(() => {
    fetchMock.mockReset()
    vi.stubGlobal('fetch', fetchMock)
    vi.spyOn(console, 'log').mockImplementation(() => {})
    vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  it('disables submission while sending, posts the fields, and resets on success', async () => {
    let resolveResponse!: (response: Response) => void
    fetchMock.mockReturnValue(new Promise<Response>((resolve) => {
      resolveResponse = resolve
    }))
    const user = userEvent.setup()
    render(<Contact />)
    await fillForm(user)
    await user.click(screen.getByRole('button', { name: 'Send Message' }))

    expect(screen.getByRole('button', { name: 'Sending...' })).toBeDisabled()
    expect(screen.getByPlaceholderText('Name')).toHaveValue(submission.name)
    expect(fetchMock).toHaveBeenCalledExactlyOnceWith('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(submission),
    })

    resolveResponse(new Response(JSON.stringify({ success: true }), { status: 200 }))

    expect(await screen.findByText('Message sent successfully!')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Send Message' })).toBeEnabled()
    for (const placeholder of ['Name', 'Email', 'Phone Number', 'Message']) {
      expect(screen.getByPlaceholderText(placeholder)).toHaveValue('')
    }
  })

  it.each(['http', 'network'] as const)('preserves the form and allows retry after a %s failure', async (failure) => {
    if (failure === 'http') {
      fetchMock.mockResolvedValue(new Response(JSON.stringify({ error: 'Failed to send email' }), { status: 500 }))
    } else {
      fetchMock.mockRejectedValue(new Error('Network unavailable'))
    }
    const user = userEvent.setup()
    render(<Contact />)
    await fillForm(user)
    await user.click(screen.getByRole('button', { name: 'Send Message' }))

    expect(await screen.findByText('Failed to send message. Please try again.')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Send Message' })).toBeEnabled()
    expect(screen.queryByText('Message sent successfully!')).not.toBeInTheDocument()
    expect(screen.getByPlaceholderText('Name')).toHaveValue(submission.name)
    expect(screen.getByPlaceholderText('Email')).toHaveValue(submission.email)
    expect(screen.getByPlaceholderText('Phone Number')).toHaveValue(submission.phone)
    expect(screen.getByPlaceholderText('Message')).toHaveValue(submission.message)

    fetchMock.mockResolvedValue(new Response(JSON.stringify({ success: true }), { status: 200 }))
    await user.click(screen.getByRole('button', { name: 'Send Message' }))
    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(2))
    expect(await screen.findByText('Message sent successfully!')).toBeInTheDocument()
    expect(screen.queryByText('Failed to send message. Please try again.')).not.toBeInTheDocument()
  })
})

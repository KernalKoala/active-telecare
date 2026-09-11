import { beforeEach, describe, expect, it, vi } from 'vitest'

const sdk = vi.hoisted(() => ({ send: vi.fn(), constructor: vi.fn() }))

vi.mock('resend', () => ({
  Resend: class {
    emails = { send: sdk.send }

    constructor(apiKey: string) {
      sdk.constructor(apiKey)
    }
  },
}))

const submission = {
  name: 'Alex Example',
  email: 'alex@example.com',
  phone: '01234567890',
  message: 'Please tell me more about your personal alarms.',
}

function request() {
  return new Request('http://localhost/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(submission),
  })
}

describe('POST /api/contact', () => {
  let POST: typeof import('@/app/api/contact/route').POST

  beforeEach(async () => {
    vi.resetModules()
    sdk.send.mockReset()
    sdk.constructor.mockReset()
    vi.stubEnv('RESEND_API_KEY', 'test-resend-key')
    vi.stubEnv('CONTACT_EMAIL', 'contact@example.test')
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('Unexpected network request')))
    vi.spyOn(console, 'error').mockImplementation(() => {})
    // The route constructs Resend at import time, after test env and mocks are ready.
    ;({ POST } = await import('@/app/api/contact/route'))
  })

  it('sends the submitted details to the configured recipient and returns success', async () => {
    const result = { data: { id: 'email-1' }, error: null }
    sdk.send.mockResolvedValue(result)

    const response = await POST(request())

    expect(sdk.constructor).toHaveBeenCalledExactlyOnceWith('test-resend-key')
    expect(sdk.send).toHaveBeenCalledExactlyOnceWith({
      from: 'Active Telecare <website@activetelecare.im>',
      to: 'contact@example.test',
      subject: `New Contact Form Submission from ${submission.name}`,
      html: expect.any(String),
    })
    const [{ html }] = sdk.send.mock.calls[0]
    for (const value of Object.values(submission)) expect(html).toContain(value)
    expect(response.status).toBe(200)
    expect(await response.json()).toEqual({ success: true, data: result })
  })

  it('returns a generic failure when Resend throws', async () => {
    sdk.send.mockRejectedValue(new Error('Resend unavailable'))

    const response = await POST(request())

    expect(sdk.send).toHaveBeenCalledOnce()
    expect(response.status).toBe(500)
    expect(await response.json()).toEqual({ error: 'Failed to send email' })
  })
})

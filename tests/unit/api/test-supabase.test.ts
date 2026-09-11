import { beforeEach, describe, expect, it, vi } from 'vitest'
import { GET } from '@/app/api/test-supabase/route'

const sdk = vi.hoisted(() => ({ from: vi.fn(), select: vi.fn() }))

vi.mock('@/lib/supabase', () => ({ supabase: { from: sdk.from } }))

describe('GET /api/test-supabase error handling', () => {
  beforeEach(() => {
    sdk.from.mockReset().mockReturnValue({ select: sdk.select })
    sdk.select.mockReset()
    vi.stubEnv('NEXT_PUBLIC_SUPABASE_URL', 'https://supabase.example.test')
    vi.stubEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY', 'test-anon-key')
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('Unexpected network request')))
    vi.spyOn(console, 'log').mockImplementation(() => {})
    vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  it('preserves the message and stack for an Error', async () => {
    const error = new Error('Test connection failure')
    sdk.select.mockRejectedValue(error)

    const response = await GET()

    expect(await response.json()).toEqual({
      success: false,
      error: error.message,
      stack: error.stack,
    })
  })

  it.each([null, 'Test failure'])('handles a non-Error rejection (%j) without throwing again', async (error) => {
    sdk.select.mockRejectedValue(error)

    const response = await GET()

    expect(await response.json()).toEqual({ success: false, error: 'Unknown error' })
  })
})

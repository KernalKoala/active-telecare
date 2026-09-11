import { beforeEach, describe, expect, it, vi } from 'vitest'
import { POST } from '@/app/api/products/create/route'

const sdk = vi.hoisted(() => ({
  createClient: vi.fn(),
  getUser: vi.fn(),
  from: vi.fn(),
  insert: vi.fn(),
  select: vi.fn(),
}))

vi.mock('@supabase/supabase-js', () => ({ createClient: sdk.createClient }))

const product = {
  name: 'Personal alarm',
  description: 'A simple personal alarm.',
  price: 12.5,
  billing_frequency: 'monthly',
  image_url: '/images/alarm.png',
}
const savedProduct = { id: 'product-1', ...product }

function request(authorization?: string) {
  const headers = new Headers({ 'Content-Type': 'application/json' })
  if (authorization) headers.set('Authorization', authorization)
  return new Request('http://localhost/api/products/create', {
    method: 'POST',
    headers,
    body: JSON.stringify(product),
  })
}

describe('POST /api/products/create', () => {
  beforeEach(() => {
    for (const mock of Object.values(sdk)) mock.mockReset()
    vi.stubEnv('NEXT_PUBLIC_SUPABASE_URL', 'https://supabase.example.test')
    vi.stubEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY', 'test-anon-key')
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('Unexpected network request')))
    vi.spyOn(console, 'error').mockImplementation(() => {})
    sdk.createClient.mockReturnValue({ auth: { getUser: sdk.getUser }, from: sdk.from })
    sdk.getUser.mockResolvedValue({ data: { user: { id: 'user-1' } }, error: null })
    sdk.from.mockReturnValue({ insert: sdk.insert })
    sdk.insert.mockReturnValue({ select: sdk.select })
    sdk.select.mockResolvedValue({ data: [savedProduct], error: null })
  })

  it('rejects missing authorization before creating a client or writing', async () => {
    const response = await POST(request())

    expect(response.status).toBe(401)
    expect(await response.json()).toEqual({ error: 'Unauthorized' })
    expect(sdk.createClient).not.toHaveBeenCalled()
    expect(sdk.insert).not.toHaveBeenCalled()
  })

  it.each([
    { label: 'an SDK authentication error', data: { user: { id: 'user-1' } }, error: { message: 'Invalid token' } },
    { label: 'no authenticated user', data: { user: null }, error: null },
  ])('rejects invalid authorization with $label without writing', async ({ data, error }) => {
    sdk.getUser.mockResolvedValue({ data, error })

    const response = await POST(request('Bearer invalid-token'))

    expect(response.status).toBe(401)
    expect(await response.json()).toEqual({ error: 'Unauthorized' })
    expect(sdk.getUser).toHaveBeenCalledOnce()
    expect(sdk.from).not.toHaveBeenCalled()
    expect(sdk.insert).not.toHaveBeenCalled()
  })

  it('forwards authorization and inserts the product for an authenticated user', async () => {
    const response = await POST(request('Bearer test-token'))

    expect(sdk.createClient).toHaveBeenCalledExactlyOnceWith(
      'https://supabase.example.test',
      'test-anon-key',
      { global: { headers: { Authorization: 'Bearer test-token' } } },
    )
    expect(sdk.getUser).toHaveBeenCalledOnce()
    expect(sdk.from).toHaveBeenCalledExactlyOnceWith('products')
    expect(sdk.insert).toHaveBeenCalledExactlyOnceWith([product])
    expect(sdk.select).toHaveBeenCalledExactlyOnceWith()
    expect(response.status).toBe(201)
    expect(await response.json()).toEqual({ product: savedProduct })
  })

  it('returns a generic failure when the database reports an error', async () => {
    sdk.select.mockResolvedValue({ data: null, error: { message: 'Database unavailable' } })

    const response = await POST(request('Bearer test-token'))

    expect(sdk.insert).toHaveBeenCalledExactlyOnceWith([product])
    expect(response.status).toBe(500)
    expect(await response.json()).toEqual({ error: 'Failed to create product' })
  })
})

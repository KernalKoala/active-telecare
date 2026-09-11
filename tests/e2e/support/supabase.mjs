import { createServer } from 'node:http'

const products = [{
  id: '00000000-0000-4000-8000-000000000001',
  name: 'Test Care Alarm',
  description: 'A fixture alarm for checking the catalogue and product details.',
  price: 12.5,
  billing_frequency: 'monthly',
  image_url: '/images/device.jpg',
  created_at: '2026-01-01T00:00:00.000Z',
}]

// Only the public read used by the catalogue is supported: no real auth or writes.
const server = createServer((request, response) => {
  const path = new URL(request.url, 'http://127.0.0.1:3101').pathname
  response.setHeader('Content-Type', 'application/json')
  response.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:3100')

  if (request.method === 'GET' && path === '/health') {
    response.end(JSON.stringify({ ok: true }))
  } else if (request.method === 'GET' && path === '/rest/v1/products') {
    response.end(JSON.stringify(products))
  } else {
    response.writeHead(403)
    response.end(JSON.stringify({ message: 'Not supported by the read-only test fixture' }))
  }
})

server.listen(3101, '127.0.0.1')
for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, () => server.close(() => process.exit(0)))
}

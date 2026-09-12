import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  // Keep browser requests local, including analytics. Server-side catalogue reads
  // go to the separate read-only fixture configured in playwright.config.ts.
  await page.route('**/*', async (route) => {
    const { origin, pathname } = new URL(route.request().url())
    if (origin === 'http://127.0.0.1:3100' && pathname !== '/api/contact') {
      await route.continue()
    } else {
      await route.abort()
    }
  })
})

test('home page navigation reaches the contact form', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { name: 'Professional Telecare Services' })).toBeVisible()
  await expect.poll(() => page.getByRole('img', { name: 'Active Telecare', exact: true })
    .evaluate((image: HTMLImageElement) => image.naturalWidth)).toBeGreaterThan(0)
  await page.getByRole('navigation').getByRole('link', { name: 'Contact Us', exact: true }).click()
  await expect(page).toHaveURL('/contact')
  await expect(page.getByRole('heading', { name: 'Send us a message!' })).toBeVisible()
})

test('mobile navigation opens and follows a link', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')
  // The current header has a single mobile navigation button.
  await page.getByRole('navigation').getByRole('button').click()
  await page.locator('header').getByRole('link', { name: 'About Us', exact: true }).click()
  await expect(page).toHaveURL('/about')
  await expect(page.locator('header').getByRole('link', { name: 'About Us', exact: true })).not.toBeVisible()
})

test('products page presents the product range and enquiry links', async ({ page }) => {
  await page.goto('/products')
  await expect(page.getByRole('heading', { name: 'Our Products', level: 1 })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Careline System', level: 2 })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Key Safe', level: 2 })).toBeVisible()
  await expect(page.getByRole('link', { name: 'Send enquiry' })).toHaveCount(6)
  await expect(page.getByRole('img', { name: 'Careline System hub and personal pendant' })).toBeVisible()
})

test('catalogue renders server-side fixture data and opens product details', async ({ page }) => {
  await page.goto('/catalogue')
  await expect(page.getByRole('heading', { name: 'Catalogue', level: 1 })).toBeVisible()
  await page.getByRole('heading', { name: 'Test Care Alarm', level: 3 }).click()
  await expect(page.getByRole('heading', { name: 'Test Care Alarm', level: 2 })).toBeVisible()
  await expect(page.getByText('Billed monthly', { exact: true })).toBeVisible()
  const images = page.getByRole('img', { name: 'Test Care Alarm', exact: true })
  await expect(images).toHaveCount(2)
  await expect.poll(() => images.evaluateAll((elements) => elements.every(
    (image) => image instanceof HTMLImageElement && image.complete && image.naturalWidth > 0,
  ))).toBe(true)

  await page.getByRole('button', { name: 'Close', exact: true }).click()
  await expect(page.getByRole('heading', { name: 'Test Care Alarm', level: 2 })).not.toBeVisible()
})

for (const succeeds of [true, false]) {
  test(`contact submission displays ${succeeds ? 'success and resets' : 'failure and preserves input'}`, async ({ page }) => {
    await page.route('**/api/contact', async (route) => {
      expect(route.request().method()).toBe('POST')
      expect(route.request().postDataJSON()).toEqual({
        name: 'Test Visitor',
        email: 'visitor@example.invalid',
        phone: '',
        message: 'Please tell me about your services.',
      })
      await route.fulfill({
        status: succeeds ? 200 : 500,
        json: succeeds ? { success: true } : { error: 'Test failure' },
      })
    })
    await page.goto('/contact')
    await page.getByPlaceholder('Name', { exact: true }).fill('Test Visitor')
    await page.getByPlaceholder('Email', { exact: true }).fill('visitor@example.invalid')
    await page.getByPlaceholder('Message', { exact: true }).fill('Please tell me about your services.')
    await page.getByRole('button', { name: 'Send Message', exact: true }).click()
    await expect(page.getByText(succeeds
      ? 'Message sent successfully!'
      : 'Failed to send message. Please try again.', { exact: true })).toBeVisible()
    await expect(page.getByPlaceholder('Name', { exact: true })).toHaveValue(succeeds ? '' : 'Test Visitor')
  })
}

test('unauthenticated admin visitors see login rather than product management', async ({ page }) => {
  await page.goto('/admin')
  await expect(page.getByRole('heading', { name: 'Admin Login' })).toBeVisible()
  await expect(page.getByLabel('Email', { exact: true })).toBeVisible()
  await expect(page.getByLabel('Password', { exact: true })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Sign In' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Admin Dashboard' })).not.toBeVisible()
  await expect.poll(() => page.getByRole('img', { name: 'Active Telecare', exact: true })
    .evaluate((image: HTMLImageElement) => image.naturalWidth)).toBeGreaterThan(0)
  await page.getByRole('link', { name: 'Active Telecare home' }).click()
  await expect(page).toHaveURL('/')
  await expect(page.getByRole('heading', { name: 'Professional Telecare Services' })).toBeVisible()
})

import { defineConfig, devices } from '@playwright/test'

// Override local/CI credentials for both the build and the running test app.
const testEnv = {
  NEXT_PUBLIC_SUPABASE_URL: 'http://127.0.0.1:3101',
  NEXT_PUBLIC_SUPABASE_ANON_KEY: 'test-anon-key',
  SUPABASE_SERVICE_ROLE_KEY: 'test-service-role-key',
  RESEND_API_KEY: 're_test_not_a_real_key',
  CONTACT_EMAIL: 'test@example.invalid',
  NEXT_TELEMETRY_DISABLED: '1',
}

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: 'http://127.0.0.1:3100',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: [
    {
      command: 'node tests/e2e/support/supabase.mjs',
      url: 'http://127.0.0.1:3101/health',
      reuseExistingServer: false,
      timeout: 10_000,
    },
    {
      command: 'npm run build && npm start -- --hostname 127.0.0.1 --port 3100',
      url: 'http://127.0.0.1:3100',
      env: testEnv,
      reuseExistingServer: false,
      timeout: 180_000,
    },
  ],
})

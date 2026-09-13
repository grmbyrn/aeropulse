import { defineConfig, devices } from '@playwright/test';

const isCI = !!process.env.CI;

export default defineConfig({
  testDir: './e2e',
  // Serial locally: 2 physical cores at 1.6 GHz thrash under parallelism.
  // CI runners have the headroom to parallelise.
  fullyParallel: isCI,
  workers: isCI ? undefined : 1,
  timeout: 60_000,
  expect: { timeout: 10_000 },
  retries: isCI ? 2 : 0,
  reporter: isCI ? [['list'], ['html', { open: 'never' }]] : [['list']],
  use: {
    baseURL: 'http://localhost:3000',
    actionTimeout: 15_000,
    trace: 'on-first-retry',
    video: 'off',              // videos are the largest artifact; disk is tight
    screenshot: 'only-on-failure',
  },
  // Locally: system Chrome only — Playwright ships no macOS 12 browser builds.
  // In CI (Linux): full cross-browser, including the WebKit this machine cannot run.
  projects: isCI
    ? [
        { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
        { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
        { name: 'webkit', use: { ...devices['Desktop Safari'] } },
      ]
    : [
        {
          name: 'chromium',
          use: { ...devices['Desktop Chrome'], channel: 'chrome' },
        },
      ],
  webServer: {
    // Dev server locally (a production build costs minutes of CPU and disk headroom).
    // CI tests the production build, as the Next.js docs recommend.
    command: isCI ? 'npm run build && npm run start' : 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !isCI,
    timeout: 180_000,
  },
});

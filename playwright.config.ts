import { defineConfig } from '@playwright/test'; 
 
export default defineConfig({ 
  testDir: './e2e', 
  timeout: 30000, 
  use: { 
    baseURL: 'http://localhost:5173', 
    headless: true, 
    viewport: { width: 1280, height: 720 }, 
    screenshot: 'only-on-failure', 
    trace: 'retain-on-failure' 
  }, 
  webServer: { 
    command: 'npm run dev', 
    port: 5173, 
    reuseExistingServer: !process.env.CI, 
    timeout: 120000 
  } 
}); 

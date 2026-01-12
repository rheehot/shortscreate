import { test, expect } from '@playwright/test';

/**
 * E2E Test for Full Generation Flow
 *
 * Test the complete flow from topic input to backend integration.
 */

test.describe('Video Generation Flow', () => {
  test('backend API is available', async ({ request }) => {
    const response = await request.get('http://localhost:8000/api/health');
    expect(response.ok()).toBeTruthy();
    const data = await response.json();
    expect(data.status).toBe('healthy');
  });

  test('can start video generation', async ({ page }) => {
    await page.goto('http://localhost:3000');

    // Fill in topic
    const textarea = page.locator('#topic');
    await textarea.fill('테스트 주제');

    // Click generate button
    const generateButton = page.getByText('쇼츠 생성하기');
    await generateButton.click();

    // Check if button shows loading state
    await expect(page.locator('#topic')).toBeDisabled();
  });

  test('API endpoint responds correctly', async ({ request }) => {
    const response = await request.post('http://localhost:8000/api/generate', {
      data: {
        topic: '테스트 주제',
        voice: 'alloy',
      },
    });

    expect(response.ok()).toBeTruthy();
    const data = await response.json();
    expect(data.job_id).toBeTruthy();
    expect(data.status).toBe('started');
  });
});

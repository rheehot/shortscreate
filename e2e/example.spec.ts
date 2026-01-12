import { test, expect } from '@playwright/test';

/**
 * E2E Test Example for YouTube Shorts Generator
 *
 * This is a placeholder test to verify Playwright is properly configured.
 * Replace this with actual E2E tests as needed.
 */

test('homepage loads correctly', async ({ page }) => {
  await page.goto('/');

  // Check if the main heading is visible
  await expect(page.getByText('YouTube Shorts Generator')).toBeVisible();
});

test('topic input is present', async ({ page }) => {
  await page.goto('/');

  // Check if the topic input textarea exists
  const textarea = page.locator('textarea[placeholder*="주제"]');
  await expect(textarea).toBeVisible();
});

test('options panel is present', async ({ page }) => {
  await page.goto('/');

  // Check if the voice selection is present
  await expect(page.getByText('음성 목소리')).toBeVisible();
  await expect(page.getByText('영상 속도')).toBeVisible();
  await expect(page.getByText('화면 비율')).toBeVisible();
  await expect(page.getByText('자막 추가')).toBeVisible();
});

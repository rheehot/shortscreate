import { test, expect } from '@playwright/test';

/**
 * E2E Test for Deployed Site
 *
 * Test the deployed Vercel site to ensure it's working correctly.
 */

const deployedURL = 'https://frontend-mu-eight-80.vercel.app';

test('deployed site loads correctly', async ({ page }) => {
  await page.goto(deployedURL);

  // Check if the main heading is visible
  await expect(page.getByRole('heading', { name: 'YouTube Shorts Generator' })).toBeVisible();
});

test('deployed site has topic input', async ({ page }) => {
  await page.goto(deployedURL);

  // Check if the topic input textarea exists
  const textarea = page.locator('#topic');
  await expect(textarea).toBeVisible();
});

test('deployed site has options panel', async ({ page }) => {
  await page.goto(deployedURL);

  // Check if the voice selection is present
  await expect(page.getByText('음성 목소리')).toBeVisible();
  await expect(page.getByText('영상 속도')).toBeVisible();
  await expect(page.getByText('화면 비율')).toBeVisible();
  await expect(page.getByText('자막 추가')).toBeVisible();
});

import { expect, test } from '@playwright/test';

test('synthetic catalogue is functional without private metadata requests', async ({ page }) => {
  const remoteRequests: string[] = [];
  page.on('request', request => {
    if (!request.url().startsWith('http://127.0.0.1:4173/')) remoteRequests.push(request.url());
  });
  await page.goto('/');
  await expect(page.getByText('Synthetic demo')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Browse your catalogue' })).toBeVisible();
  await expect(page.getByText('The Azure Archive').first()).toBeVisible();
  await page.getByRole('searchbox', { name: 'Search titles or aliases' }).fill('Garden of Hours');
  await expect(page.getByRole('button', { name: /The Clockwork Garden/ })).toBeVisible();
  await expect(page.getByRole('button', { name: /The Azure Archive/ })).toHaveCount(0);
  expect(remoteRequests).toEqual([]);
});

test('keyboard selection and single-episode progress never backfills the series', async ({ page }) => {
  await page.goto('/');
  const series = page.getByRole('button', { name: /The Clockwork Garden/ });
  await series.focus();
  await series.press('Enter');
  await expect(page.getByRole('heading', { name: 'The Clockwork Garden' })).toBeVisible();
  const first = page.getByRole('checkbox', { name: /Seeds of Time/ });
  const second = page.getByRole('checkbox', { name: /The Last Hour/ });
  await expect(first).not.toBeChecked();
  await expect(second).not.toBeChecked();
  await first.check();
  await expect(first).toBeChecked();
  await expect(second).not.toBeChecked();
  await expect(page.getByLabel('Watching status')).toHaveValue('watching');
  await first.uncheck();
  await expect(second).not.toBeChecked();
  await page.reload();
  await page.getByRole('button', { name: /The Clockwork Garden/ }).click();
  await expect(page.getByRole('checkbox', { name: /Seeds of Time/ })).not.toBeChecked();
});

test('specials can be toggled independently of regular episodes', async ({ page }) => {
  await page.goto('/');
  await page.getByText('Specials & OVAs').click();
  const ova = page.getByRole('checkbox', { name: /Night at the Lantern Festival/ });
  const regular = page.getByRole('checkbox', { name: /A Map in the Sky/ });
  await expect(ova).toBeChecked();
  await expect(regular).toBeChecked();
  await ova.uncheck();
  await expect(regular).toBeChecked();
  await expect(ova).not.toBeChecked();
});

test('status filter, ratings and tags work with local-only demo state', async ({ page }) => {
  await page.goto('/');
  await page.getByLabel('My rating').selectOption('10');
  await expect(page.getByLabel('My rating')).toHaveValue('10');
  await page.getByLabel('Personal tags (comma-separated)').fill('Rewatch, Favourite');
  await page.getByRole('button', { name: 'Save tags' }).click();
  await page.getByLabel('Watching status').selectOption('paused');
  await page.getByLabel('Watch status').selectOption('paused');
  await expect(page.getByRole('button', { name: /The Azure Archive/ })).toBeVisible();
  await expect(page.getByRole('button', { name: /The Clockwork Garden/ })).toHaveCount(0);
});

for (const width of [320, 375, 390, 768, 1280]) {
  test('no horizontal overflow at ' + width + 'px', async ({ page }) => {
    await page.setViewportSize({ width, height: 850 });
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'Browse your catalogue' })).toBeVisible();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
    expect(overflow).toBe(false);
  });
}

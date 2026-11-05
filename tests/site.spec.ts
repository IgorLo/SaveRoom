import { expect, test } from '@playwright/test';

test('catalog exposes four real projects and only available destinations', async ({ page }) => {
	await page.goto('/');
	await expect(page.getByRole('heading', { name: 'Save Room', exact: true })).toBeVisible();
	await expect(page.locator('article.project-card')).toHaveCount(4);
	await expect(page.getByRole('navigation', { name: 'Мои ссылки' }).getByRole('link')).toHaveCount(
		5
	);
	await expect(page.locator('a[href="https://t.me/vsefree_vda/12985"]')).toHaveAttribute(
		'target',
		'_blank'
	);
	await expect(page.locator('a[href="https://dogs-go-to-heaven.vercel.app/"]')).toBeVisible();
	for (const slug of ['dog-day-afternoon', 'glyph-lab']) {
		await expect(page.locator(`article[data-project="${slug}"] a[target="_blank"]`)).toHaveCount(0);
	}
	expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
	await page.screenshot({ path: `artifacts/home-${test.info().project.name}.png`, fullPage: true });
});

test('article opens in same tab, supports image viewing and keyboard return', async ({ page }) => {
	await page.goto('/');
	await page
		.locator('article[data-project="dog-day-afternoon"]')
		.getByRole('link', { name: /Подробнее/ })
		.click();
	await expect(page).toHaveURL(/\/projects\/dog-day-afternoon\//);
	await expect(page.getByRole('heading', { name: 'Dog Day Afternoon', exact: true })).toBeVisible();
	await expect(page.locator('time')).toHaveAttribute('datetime', '2026-11-05');
	const trigger = page.getByRole('button', { name: /Увеличить: Обзор/ });
	await expect(trigger).toBeEnabled();
	await trigger.focus();
	await page.keyboard.press('Enter');
	const dialog = page.getByRole('dialog');
	await expect(dialog).toBeVisible();
	await expect(dialog.getByRole('button', { name: /Закрыть/ })).toBeFocused();
	await page.keyboard.press('Tab');
	// Native dialogs may move focus to browser chrome; background controls stay inert.
	await expect(trigger).not.toBeFocused();
	await page.keyboard.press('Tab');
	await expect(dialog.getByRole('button', { name: /Закрыть/ })).toBeFocused();
	await page.keyboard.press('Escape');
	await expect(dialog).not.toBeVisible();
	await expect(trigger).toBeFocused();
	await page.screenshot({
		path: `artifacts/article-${test.info().project.name}.png`,
		fullPage: true
	});
	await page
		.getByRole('link', { name: /Все проекты/ })
		.first()
		.click();
	await expect(page).toHaveURL(/\/$/);
});

test('direct routes, metadata, 404 and long text remain usable', async ({ page }) => {
	const errors: string[] = [];
	page.on('pageerror', (error) => errors.push(error.message));
	for (const slug of ['vda-everyday', 'dog-day-afternoon', 'dogs-go-to-heaven', 'glyph-lab']) {
		const response = await page.goto(`/projects/${slug}/`);
		expect(response?.status()).toBe(200);
		await expect(page.locator('h1')).toBeVisible();
		await expect(page.locator('main img').first()).toBeVisible();
	}
	await page.goto('/projects/glyph-lab/');
	await expect(page).toHaveTitle(/GLYPH\/LAB/);
	await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', /GLYPH\/LAB/);
	await page.locator('h1').evaluate((el) => {
		el.textContent = 'Оченьдлинноеназваниепроекта'.repeat(8);
	});
	await page.addStyleTag({ content: 'html { font-size: 200%; }' });
	expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
	const response = await page.goto('/projects/not-a-project/');
	expect(response?.status()).toBe(404);
	await expect(page.getByRole('link', { name: /Все проекты/ }).first()).toBeVisible();
	expect(errors).toEqual([]);
});

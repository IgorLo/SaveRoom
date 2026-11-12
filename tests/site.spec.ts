import { expect, test, type Page } from '@playwright/test';

async function expectDocumentScrollbar(page: Page) {
	const documentScrollbar = await page.evaluate(() => {
		const scroller = document.documentElement;
		return {
			width: getComputedStyle(scroller, '::-webkit-scrollbar').width,
			color: getComputedStyle(scroller, '::-webkit-scrollbar-thumb').backgroundColor
		};
	});
	expect(documentScrollbar.width).toBe('6px');
	expect(['rgb(188, 171, 146)', 'rgb(219, 183, 131)']).toContain(documentScrollbar.color);
}

test('catalog exposes five real projects and only available destinations', async ({ page }) => {
	await page.goto('/');
	expect(
		await page.evaluate(async () => (await document.fonts.load('400 16px Monocraft')).length)
	).toBeGreaterThan(0);
	await expect(page.locator('body .ascii-theme')).toHaveCSS('background-color', 'rgb(23, 18, 15)');
	await expect(page.getByRole('heading', { name: 'Hello, world!', exact: true })).toBeVisible();
	const introText = await page.locator('.intro p').textContent();
	await expect(page.locator('meta[name="description"]')).toHaveAttribute(
		'content',
		introText ?? ''
	);
	await expect(page.locator('meta[property="og:description"]')).toHaveAttribute(
		'content',
		introText ?? ''
	);
	await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
		'content',
		'Hello, world! — Save Room'
	);
	await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
		'content',
		/^https:\/\/[^/]+\/images\/profile\/igor\.png$/
	);
	await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
		'href',
		/^https:\/\/[^/]+\/$/
	);
	const canonicalUrl = await page.locator('link[rel="canonical"]').getAttribute('href');
	const previewImageUrl = await page.locator('meta[property="og:image"]').getAttribute('content');
	expect(new URL(previewImageUrl!).origin).toBe(new URL(canonicalUrl!).origin);
	await expect(page.getByRole('link', { name: 'Save Room — главная' })).toBeVisible();
	await expect(page.locator('body .ascii-theme')).toHaveAttribute('data-palette', 'phosphor');
	const background = page.locator('.room-background canvas');
	await expect(background).toHaveAttribute('aria-hidden', 'true');
	await expect
		.poll(() =>
			background.evaluate((canvas) => (canvas instanceof HTMLCanvasElement ? canvas.width : 0))
		)
		.toBeGreaterThan(0);
	await expectDocumentScrollbar(page);
	await page.evaluate(() => window.scrollTo(0, 500));
	await expect.poll(() => page.evaluate(() => scrollY)).toBeGreaterThan(0);
	expect(
		await background.evaluate((canvas) => Math.round(canvas.getBoundingClientRect().top))
	).toBe(0);
	await page.evaluate(() => window.scrollTo(0, 0));
	await page.getByRole('button', { name: 'Остановить фон' }).click();
	await expect(page.getByRole('button', { name: 'Включить фон' })).toBeVisible();
	await page.getByRole('button', { name: 'Включить фон' }).click();
	await expect(page.locator('article.project-card .aui-frame')).toHaveCount(5);
	await expect(page.locator('article.project-card .aui-button')).toHaveCount(5);
	await expect(page.getByText('МОИ ПРОЕКТЫ', { exact: true })).toBeVisible();
	for (const removed of [
		'Личное хранилище хороших затей',
		'Место для того, что я делаю.',
		'От идеи до «оно работает»'
	]) {
		await expect(page.getByText(removed, { exact: true })).toHaveCount(0);
	}
	await expect(page.locator('article.project-card')).toHaveCount(5);
	const dogDayCover = page.locator('article[data-project="dog-day-afternoon"] .cover-link img');
	await expect(dogDayCover).toHaveAttribute('src', '/images/projects/dog-day-afternoon/cover.png');
	await dogDayCover.scrollIntoViewIfNeeded();
	await expect
		.poll(() =>
			dogDayCover.evaluate((image) => (image instanceof HTMLImageElement ? image.naturalWidth : 0))
		)
		.toBeGreaterThan(0);
	await expect(page.locator('article.project-card .file-label')).toHaveCount(0);
	await expect(page.locator('article.project-card').first()).toHaveAttribute(
		'data-project',
		'hascii'
	);
	expect(
		await page
			.locator('article.project-card')
			.evaluateAll((cards) => cards.map((card) => card.getAttribute('data-project')))
	).toEqual([
		'hascii',
		'svelte-ascii-ui',
		'dogs-go-to-heaven',
		'vda-everyday',
		'dog-day-afternoon'
	]);
	await expect(page.getByLabel('Сортировка').getByRole('option')).toHaveText([
		'По прикольности',
		'По дате'
	]);
	await page.getByLabel('Сортировка').selectOption('date');
	expect(
		await page
			.locator('article.project-card')
			.evaluateAll((cards) => cards.map((card) => card.getAttribute('data-project')))
	).toEqual([
		'hascii',
		'svelte-ascii-ui',
		'vda-everyday',
		'dogs-go-to-heaven',
		'dog-day-afternoon'
	]);
	await expect(page.locator('article[data-project="dog-day-afternoon"] time')).toHaveCount(0);
	for (const [slug, date] of [
		['dogs-go-to-heaven', '2026-09-27'],
		['hascii', '2026-11-09'],
		['svelte-ascii-ui', '2026-11-08'],
		['vda-everyday', '2026-10-24']
	] as const) {
		await expect(page.locator(`article[data-project="${slug}"] time`)).toHaveAttribute(
			'datetime',
			date
		);
	}
	await page.getByLabel('Сортировка').selectOption('author');
	await expect(page.getByRole('navigation', { name: 'Мои ссылки' }).getByRole('link')).toHaveCount(
		5
	);
	await expect(page.locator('a[href="https://t.me/vsefree_vda/12985"]')).toHaveAttribute(
		'target',
		'_blank'
	);
	await expect(page.locator('a[href="https://dogs-go-to-heaven.vercel.app/"]')).toBeVisible();
	await expect(
		page.locator('a[href="https://www.npmjs.com/package/svelte-ascii-ui"]')
	).toHaveAttribute('target', '_blank');
	for (const slug of ['dog-day-afternoon', 'vda-everyday']) {
		await expect(
			page.locator(`article[data-project="${slug}"] a[href^="https://github.com/"]`)
		).toHaveCount(0);
	}
	for (const slug of ['dogs-go-to-heaven', 'hascii', 'svelte-ascii-ui']) {
		await expect(
			page.locator(`article[data-project="${slug}"] a[href^="https://github.com/"]`)
		).toHaveCount(1);
	}
	await expect(page.getByRole('heading', { name: 'HASCII' })).toBeVisible();
	expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
	await page.screenshot({ path: `artifacts/home-${test.info().project.name}.png`, fullPage: true });
});

test('article text precedes screenshots and previews keep images compact', async ({ page }) => {
	for (const slug of [
		'vda-everyday',
		'dog-day-afternoon',
		'dogs-go-to-heaven',
		'hascii',
		'svelte-ascii-ui'
	]) {
		await page.goto(`/projects/${slug}/`);
		const paragraphs = page.locator('article .body > article > p');
		const images = page
			.locator('article .body')
			.getByRole('button', { name: /Увеличить:/ })
			.locator('img');
		await expect(paragraphs.first()).toBeVisible();
		for (const image of await images.all()) {
			await image.scrollIntoViewIfNeeded();
			const textBox = await paragraphs.last().boundingBox();
			const imageBox = await image.boundingBox();
			expect(imageBox).not.toBeNull();
			expect(textBox).not.toBeNull();
			expect(imageBox!.y).toBeGreaterThan(textBox!.y + textBox!.height);
			expect(imageBox!.height).toBeLessThanOrEqual(600);
		}
		if (slug === 'svelte-ascii-ui') {
			await page.screenshot({
				path: `artifacts/svelte-ascii-ui-${test.info().project.name}.png`,
				fullPage: true
			});
		}
	}
});

test('article opens in same tab, supports image viewing and keyboard return', async ({ page }) => {
	await page.goto('/');
	await page
		.locator('article[data-project="dog-day-afternoon"]')
		.getByRole('link', { name: /Подробнее/ })
		.click();
	await expect(page).toHaveURL(/\/projects\/dog-day-afternoon\//);
	await expect(page.getByRole('heading', { name: 'Dog Day Afternoon', exact: true })).toBeVisible();
	await expect(page.locator('time')).toHaveCount(0);
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
	for (const slug of [
		'vda-everyday',
		'dog-day-afternoon',
		'dogs-go-to-heaven',
		'hascii',
		'svelte-ascii-ui'
	]) {
		const response = await page.goto(`/projects/${slug}/`);
		expect(response?.status()).toBe(200);
		await expect(page.locator('h1')).toBeVisible();
		await expect(page.locator('main img').first()).toBeVisible();
	}
	await page.goto('/projects/hascii/');
	await expect(page).toHaveTitle(/HASCII/);
	await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', /HASCII/);
	await expect(page.locator('time')).toHaveAttribute('datetime', '2026-11-09');
	await expect(page.locator('.outlinks a[href="https://hascii.vercel.app/"]')).toHaveAttribute(
		'target',
		'_blank'
	);
	await expect(
		page.locator('.outlinks a[href="https://github.com/IgorLo/hascii"]')
	).toHaveAttribute('target', '_blank');
	await page.goto('/projects/svelte-ascii-ui/');
	await expect(page.locator('time')).toHaveAttribute('datetime', '2026-11-08');
	await expect(page.getByRole('button', { name: /Увеличить:/ })).toHaveCount(4);
	await expect(
		page.locator('.outlinks a[href="https://www.npmjs.com/package/svelte-ascii-ui"]')
	).toHaveAttribute('target', '_blank');
	await expect(
		page.locator('.outlinks a[href="https://github.com/IgorLo/svelte-ascii-ui"]')
	).toHaveAttribute('target', '_blank');
	await page.goto('/projects/hascii/');
	await page.locator('h1').evaluate((el) => {
		el.textContent = 'Оченьдлинноеназваниепроекта'.repeat(8);
	});
	await page.addStyleTag({ content: 'html { font-size: 200%; }' });
	expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
	const response = await page.goto('/projects/not-a-project/');
	expect(response?.status()).toBe(404);
	await expectDocumentScrollbar(page);
	const oldAddress = await page.goto('/projects/glyph-lab/');
	expect(oldAddress?.status()).toBe(404);
	await expect(page.getByRole('link', { name: /Все проекты/ }).first()).toBeVisible();
	expect(errors).toEqual([]);
});

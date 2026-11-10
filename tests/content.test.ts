import { describe, expect, it } from 'vitest';
import { parseCatalog, sortProjects } from '../src/entities/project/model/catalog';
import { readCatalog } from '../src/entities/project/api/catalog.server';
import { mkdtemp, mkdir, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

function record(
	slug = 'sample',
	createdAt: string | null = '2026-11-05',
	pinned = false,
	order = 0
) {
	return {
		id: slug,
		slug,
		title: 'Проект',
		summary: 'Описание проекта',
		...(createdAt ? { createdAt } : {}),
		pinned,
		order,
		cover: { src: '/images/projects/sample/cover.webp', alt: 'Обложка проекта' },
		links: [],
		body: [{ type: 'paragraph', text: 'Текст публикации' }]
	};
}

describe('publication catalog', () => {
	it('keeps projects without external links and validates all block types', () => {
		const input = record();
		const blocks = [
			...input.body,
			{ type: 'heading', text: 'О проекте' },
			{ type: 'list', items: ['Первый пункт'] },
			{ type: 'image', src: input.cover.src, alt: 'Скриншот', caption: 'Подпись' }
		];
		expect(parseCatalog([{ ...input, body: blocks }])[0]?.links).toEqual([]);
	});
	it('sorts by editorial order or newest creation date and keeps undated projects last', () => {
		const items = parseCatalog([
			record('new', '2026-10-01', false, 2),
			record('undated', null, false, 0),
			record('old', '2020-01-01', false, 1)
		]);
		expect(sortProjects(items, 'author').map((p) => p.slug)).toEqual(['old', 'new', 'undated']);
		expect(sortProjects(items, 'date').map((p) => p.slug)).toEqual(['new', 'old', 'undated']);
		expect(items.map((p) => p.slug)).toEqual(['new', 'undated', 'old']);
	});
	it('keeps pinned dated projects at the front of both orders', () => {
		const items = parseCatalog([
			record('new', '2026-10-01', false, 1),
			record('pinned', '2020-01-01', true, 2)
		]);
		expect(sortProjects(items, 'author')[0]?.slug).toBe('pinned');
		expect(sortProjects(items, 'date')[0]?.slug).toBe('pinned');
	});
	it.each(['2026-02-30', '2026-13-01', 'not-a-date'])('rejects invalid date %s', (createdAt) => {
		expect(() => parseCatalog([{ ...record(), createdAt }])).toThrow(/createdAt/);
	});
	it('rejects duplicate slugs and ids', () => {
		expect(() => parseCatalog([record(), record()])).toThrow(/Duplicate/);
		expect(() => parseCatalog([record(), { ...record('another'), id: 'sample' }])).toThrow(
			/Duplicate/
		);
	});
	it('rejects unknown blocks and empty alt text', () => {
		expect(() =>
			parseCatalog([{ ...record(), body: [{ type: 'html', text: '<script>' }] }])
		).toThrow(/body/);
		expect(() => parseCatalog([{ ...record(), cover: { ...record().cover, alt: '' } }])).toThrow(
			/alt/
		);
	});
	it.each([
		'javascript:alert(1)',
		'data:text/html,test',
		'/local',
		'https://user:pass@example.com'
	])('rejects unsafe external URL %s', (href) => {
		expect(() =>
			parseCatalog([{ ...record(), links: [{ kind: 'project', label: 'Открыть', href }] }])
		).toThrow(/href/);
	});
	it.each([
		'/images/projects/../secret.png',
		'//example.com/a.png',
		'/images/projects/%2e%2e/file.png',
		'/images/projects/a.svg'
	])('rejects unsafe image path %s', (src) => {
		expect(() => parseCatalog([{ ...record(), cover: { src, alt: 'Картинка' } }])).toThrow(/src/);
	});
	it('reports file names for malformed JSON and missing images', async () => {
		const root = await mkdtemp(join(tmpdir(), 'save-room-test-'));
		try {
			const content = join(root, 'content');
			const assets = join(root, 'static');
			await mkdir(content);
			await mkdir(assets);
			await writeFile(join(content, 'broken.json'), '{');
			await expect(readCatalog(content, assets)).rejects.toThrow(/broken.json/);
			await writeFile(join(content, 'broken.json'), JSON.stringify(record()));
			await expect(readCatalog(content, assets)).rejects.toThrow(/broken.json.*cover/);
			await mkdir(join(assets, 'images/projects/sample'), { recursive: true });
			await writeFile(join(assets, 'images/projects/sample/cover.webp'), 'fixture');
			expect(await readCatalog(content, assets)).toHaveLength(1);
		} finally {
			await rm(root, { recursive: true, force: true });
		}
	});
});

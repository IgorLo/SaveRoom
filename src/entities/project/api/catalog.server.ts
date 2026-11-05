import { readFile, readdir, realpath, stat } from 'node:fs/promises';
import { isAbsolute, relative, resolve } from 'node:path';
import { parseCatalog, sortProjects } from '../model/catalog';
import type { Project } from '../model/project';

export async function readCatalog(
	contentDirectory: string,
	staticDirectory: string
): Promise<Project[]> {
	const files = (await readdir(contentDirectory)).filter((file) => file.endsWith('.json')).sort();
	const staticRoot = await realpath(staticDirectory);
	const entries = await Promise.all(
		files.map(async (file) => {
			try {
				const raw: unknown = JSON.parse(await readFile(resolve(contentDirectory, file), 'utf8'));
				const project = parseCatalog([raw])[0];
				if (!project) throw new Error('Missing publication');
				const images = [
					{ field: 'cover', image: project.cover },
					...project.body.flatMap((block, index) =>
						block.type === 'image' ? [{ field: `body.${index}`, image: block }] : []
					)
				];
				for (const { field, image } of images) {
					try {
						const target = await realpath(resolve(staticRoot, image.src.slice(1)));
						const local = relative(staticRoot, target);
						if (local.startsWith('..') || isAbsolute(local) || !(await stat(target)).isFile())
							throw new Error('Invalid file');
					} catch {
						throw new Error(`${field}.src: missing or invalid image ${image.src}`);
					}
				}
				return project;
			} catch (error) {
				throw new Error(`${file}: ${error instanceof Error ? error.message : String(error)}`, {
					cause: error
				});
			}
		})
	);
	return sortProjects(parseCatalog(entries));
}

// Read afresh in development so editing JSON never requires a server restart.
// Build-time callers share their own result; no client module imports this entry.
export function getProjects(): Promise<Project[]> {
	return readCatalog(resolve('content/projects'), resolve('static'));
}

export async function getProject(slug: string): Promise<Project | undefined> {
	return (await getProjects()).find((project) => project.slug === slug);
}

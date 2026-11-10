import { projectSchema, type Project, type ProjectSummary } from './project';

export type ProjectSort = 'author' | 'date';

export function parseCatalog(input: unknown[]): Project[] {
	const projects = input.map((value) => projectSchema.parse(value));
	for (const key of ['id', 'slug'] as const) {
		const seen = new Set<string>();
		for (const project of projects) {
			if (seen.has(project[key])) throw new Error(`Duplicate ${key}: ${project[key]}`);
			seen.add(project[key]);
		}
	}
	return projects;
}

export function sortProjects<T extends ProjectSummary>(
	projects: readonly T[],
	mode: ProjectSort = 'author'
): T[] {
	return [...projects].sort(
		(a, b) =>
			Number(Boolean(b.createdAt)) - Number(Boolean(a.createdAt)) ||
			Number(b.pinned) - Number(a.pinned) ||
			(mode === 'date'
				? (b.createdAt ?? '').localeCompare(a.createdAt ?? '')
				: a.order - b.order) ||
			a.order - b.order ||
			a.slug.localeCompare(b.slug)
	);
}

import { projectSchema, type Project } from './project';

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

export function sortProjects(projects: readonly Project[]): Project[] {
	return [...projects].sort(
		(a, b) =>
			Number(b.pinned) - Number(a.pinned) ||
			b.publishedAt.localeCompare(a.publishedAt) ||
			a.order - b.order ||
			a.slug.localeCompare(b.slug)
	);
}

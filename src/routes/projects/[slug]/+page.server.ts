import { error } from '@sveltejs/kit';
import { getProject, getProjects } from '@/entities/project/server';
import { getSiteOrigin } from '@/shared/lib/site-origin.server';
import type { EntryGenerator, PageServerLoad } from './$types';

export const entries: EntryGenerator = async () =>
	(await getProjects()).map((project) => ({ slug: project.slug }));
export const load: PageServerLoad = async ({ params, url }) => {
	const project = await getProject(params.slug);
	if (!project) error(404, 'Такого проекта здесь пока нет');
	return {
		project,
		origin: getSiteOrigin(url)
	};
};

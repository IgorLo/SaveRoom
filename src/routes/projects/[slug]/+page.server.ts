import { error } from '@sveltejs/kit';
import { getProject, getProjects } from '@/entities/project/server';
import type { EntryGenerator, PageServerLoad } from './$types';

export const entries: EntryGenerator = async () =>
	(await getProjects()).map((project) => ({ slug: project.slug }));
export const load: PageServerLoad = async ({ params, url }) => {
	const project = await getProject(params.slug);
	if (!project) error(404, 'Такого проекта здесь пока нет');
	return {
		project,
		origin:
			process.env.PUBLIC_SITE_URL ||
			(process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : url.origin)
	};
};

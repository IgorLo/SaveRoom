import { getProjects } from '@/entities/project/server';
import { getSiteOrigin } from '@/shared/lib/site-origin.server';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => ({
	projects: (await getProjects()).map(
		({ id, slug, title, summary, createdAt, order, pinned, cover, links }) => ({
			id,
			slug,
			title,
			summary,
			createdAt,
			order,
			pinned,
			cover,
			links
		})
	),
	origin: getSiteOrigin(url)
});

import { getProjects } from '@/entities/project/server';
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
	origin:
		process.env.PUBLIC_SITE_URL ||
		(process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : url.origin)
});

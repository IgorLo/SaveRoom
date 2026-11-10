import { z } from 'zod';

const text = z.string().trim().min(1);
const slug = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
const imagePath = z
	.string()
	.regex(/^\/images\/projects\/(?:[a-z0-9-]+\/)+[a-z0-9-]+\.(?:webp|png|jpe?g)$/);
export const imageSchema = z.strictObject({
	src: imagePath,
	alt: text,
	caption: text.optional(),
	width: z.number().int().positive().optional(),
	height: z.number().int().positive().optional()
});
const linkSchema = z.strictObject({
	kind: z.enum(['project', 'source']),
	label: text,
	href: z
		.string()
		.url()
		.refine((value) => {
			if (!URL.canParse(value)) return false;
			const url = new URL(value);
			return ['https:', 'http:'].includes(url.protocol) && !url.username && !url.password;
		}, 'Expected a public HTTP(S) URL without credentials')
});
const blockSchema = z.discriminatedUnion('type', [
	z.strictObject({ type: z.literal('paragraph'), text }),
	z.strictObject({ type: z.literal('heading'), text }),
	z.strictObject({ type: z.literal('list'), items: z.array(text).min(1) }),
	imageSchema.extend({ type: z.literal('image') })
]);
export const projectSchema = z.strictObject({
	id: slug,
	slug,
	title: text,
	summary: text,
	createdAt: z
		.string()
		.regex(/^\d{4}-\d{2}-\d{2}$/)
		.refine((value) => {
			const date = new Date(`${value}T00:00:00Z`);
			return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value;
		}, 'Expected a real calendar date')
		.optional(),
	order: z.number().int().nonnegative(),
	pinned: z.boolean(),
	cover: imageSchema,
	links: z
		.array(linkSchema)
		.refine(
			(links) => new Set(links.map((link) => link.kind)).size === links.length,
			'Duplicate link kind'
		),
	body: z.array(blockSchema).min(1)
});

export type Project = z.infer<typeof projectSchema>;
export type ProjectImage = z.infer<typeof imageSchema>;
export type ContentBlock = Project['body'][number];
export type ProjectLink = Project['links'][number];
export type ProjectSummary = Omit<Project, 'body'>;

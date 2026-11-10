<script lang="ts">
	import { resolve } from '$app/paths';
	import { AsciiLink } from '@/shared/ui';
	import { formatDate } from '@/shared/lib';
	import ProjectCover from './ProjectCover.svelte';
	import type { ProjectSummary } from '../model/project';
	import { Link, Panel } from 'svelte-ascii-ui';
	let { project, reverse, number }: { project: ProjectSummary; reverse: boolean; number: number } =
		$props();
	let projectLink = $derived(project.links.find((link) => link.kind === 'project'));
	let sourceLink = $derived(project.links.find((link) => link.kind === 'source'));
</script>

<article class={['project-card', { reverse }]} data-project={project.slug}>
	<Panel class="project-surface">
		<a
			class="cover-link"
			href={resolve('/projects/[slug]', { slug: project.slug })}
			aria-label={`О проекте: ${project.title}`}
			><ProjectCover image={project.cover} eager={number === 1} /></a
		>
		<div class="copy">
			<div class="meta">
				<span class="index">/{String(number).padStart(2, '0')}</span>
				{#if project.createdAt}<time datetime={project.createdAt} title="Дата первого коммита"
						>создан {formatDate(project.createdAt)}</time
					>{/if}
				{#if project.pinned}<span>↑ закреплено</span>{/if}
			</div>
			<h3>
				<Link href={resolve('/projects/[slug]', { slug: project.slug })} style="font-size: inherit"
					>{project.title}</Link
				>
			</h3>
			<p>{project.summary}</p>
			<div class="links">
				<AsciiLink
					href={`/projects/${project.slug}/`}
					label="Подробнее"
				/>{#if projectLink}<AsciiLink
						href={projectLink.href}
						label={projectLink.label}
						external
						subtle
					/>{/if}
				{#if sourceLink}<AsciiLink href={sourceLink.href} label="GitHub" external subtle />{/if}
			</div>
			<div class="file-label" aria-hidden="true">└─ {project.id}</div>
		</div>
	</Panel>
</article>

<style>
	article {
		padding-block: 24px;
	}
	:global(.project-surface) {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: clamp(36px, 6vw, 86px);
		align-items: center;
		padding: clamp(18px, 3vw, 32px);
	}
	.cover-link {
		display: block;
		text-decoration: none;
	}
	.reverse .cover-link {
		grid-column: 2;
		grid-row: 1;
	}
	.reverse .copy {
		grid-column: 1;
		grid-row: 1;
	}
	.copy {
		min-width: 0;
	}
	.meta {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 16px;
		font-size: 0.66rem;
		color: var(--muted);
	}
	.index {
		color: var(--accent);
		font-size: 0.8rem;
	}
	h3 {
		font-size: clamp(1.45rem, 2.5vw, 2rem);
		font-weight: 600;
		line-height: 1.35;
		letter-spacing: -0.05em;
		margin: 26px 0 19px;
	}
	h3 :global(a) {
		text-decoration: none;
	}
	h3 :global(a:hover) {
		color: var(--accent);
	}
	p {
		font-size: 0.85rem;
		line-height: 1.95;
		color: var(--muted);
		margin: 0;
	}
	.links {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 14px 24px;
		margin-top: 28px;
	}
	.file-label {
		font-size: 0.62rem;
		color: #929380;
		margin-top: 36px;
	}
	@media (max-width: 700px) {
		:global(.project-surface) {
			grid-template-columns: 1fr;
			gap: 28px;
		}
		.reverse .cover-link,
		.reverse .copy {
			grid-column: auto;
			grid-row: auto;
		}
		h3 {
			margin-top: 18px;
			font-size: 1.65rem;
		}
		.file-label {
			margin-top: 24px;
		}
	}
</style>

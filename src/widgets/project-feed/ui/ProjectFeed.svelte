<script lang="ts">
	import { ProjectCard, type ProjectSummary } from '@/entities/project';
	import { AsciiDivider } from '@/shared/ui';
	let { projects }: { projects: ProjectSummary[] } = $props();
</script>

<section id="projects" aria-labelledby="projects-heading">
	<AsciiDivider label="КОЛЛЕКЦИЯ" />
	<div class="section-heading">
		<h2 id="projects-heading">Проекты<span> /{String(projects.length).padStart(2, '0')}</span></h2>
		<p>От идеи до «оно работает»</p>
	</div>
	{#each projects as project, index (project.id)}
		<ProjectCard {project} reverse={index % 2 === 1} number={index + 1} />
		<AsciiDivider />
	{/each}
	<p class="end-note"><span aria-hidden="true">[ ... ]</span> Здесь ещё будет продолжение.</p>
</section>

<style>
	.section-heading {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		flex-wrap: wrap;
		gap: 12px;
		padding-top: 28px;
	}
	h2 {
		font-size: 1.2rem;
		font-weight: 500;
		margin: 0;
		letter-spacing: -0.04em;
	}
	h2 span {
		color: var(--warm);
		font-size: 0.8rem;
		margin-left: 12px;
	}
	.section-heading p {
		font-size: 0.68rem;
		color: var(--muted);
		margin: 0;
	}
	.end-note {
		padding-top: 44px;
		margin: 0;
		text-align: center;
		font-size: 0.75rem;
		color: var(--muted);
	}
	.end-note span {
		display: block;
		margin-bottom: 16px;
		font-size: 1.2rem;
		color: var(--accent);
	}
</style>

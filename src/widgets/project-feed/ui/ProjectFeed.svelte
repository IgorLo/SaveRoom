<script lang="ts">
	import { ProjectCard, type ProjectSummary } from '@/entities/project';
	import { AsciiDivider } from '@/shared/ui';
	let { projects }: { projects: ProjectSummary[] } = $props();
</script>

<section id="projects" aria-labelledby="projects-heading">
	<AsciiDivider label="МОИ ПРОЕКТЫ" />
	<div class="section-heading">
		<h2 id="projects-heading">
			Проекты <span>/{String(projects.length).padStart(2, '0')}</span>
		</h2>
	</div>
	{#each projects as project, index (project.id)}
		<ProjectCard {project} reverse={index % 2 === 1} number={index + 1} />
		<AsciiDivider />
	{/each}
	<p class="end-note"><span aria-hidden="true">[ ... ]</span> Здесь ещё будет продолжение.</p>
</section>

<style>
	.section-heading {
		padding-top: 26px;
	}
	h2 {
		font-size: 1.25rem;
		margin: 0;
	}
	h2 span {
		color: var(--accent);
		font-size: 0.8rem;
		margin-left: 12px;
	}
	.end-note {
		padding-top: 44px;
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

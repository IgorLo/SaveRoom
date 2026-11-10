<script lang="ts">
	import { ProjectCard, sortProjects, type ProjectSummary } from '@/entities/project';
	import { AsciiDivider } from '@/shared/ui';
	import { Select } from 'svelte-ascii-ui';
	let { projects }: { projects: ProjectSummary[] } = $props();
	let sortBy = $state('author');
	let sortedProjects = $derived(sortProjects(projects, sortBy === 'date' ? 'date' : 'author'));
	const sortOptions = [
		{ value: 'author', label: 'По прикольности' },
		{ value: 'date', label: 'По дате' }
	];
</script>

<section id="projects" aria-labelledby="projects-heading">
	<AsciiDivider label="МОИ ПРОЕКТЫ" />
	<div class="section-heading">
		<h2 id="projects-heading">
			Проекты <span>/{String(projects.length).padStart(2, '0')}</span>
		</h2>
		<div class="sort-control">
			<label for="project-sort">Сортировка</label>
			<div class="sort-select">
				<Select id="project-sort" options={sortOptions} size="s" bind:value={sortBy} />
			</div>
		</div>
	</div>
	{#each sortedProjects as project, index (project.id)}
		<ProjectCard {project} reverse={index % 2 === 1} number={index + 1} />
		<AsciiDivider />
	{/each}
	<p class="end-note"><span aria-hidden="true">[ ... ]</span> Здесь ещё будет продолжение.</p>
</section>

<style>
	.section-heading {
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
		gap: 18px 24px;
		padding-top: 26px;
	}
	.sort-control {
		display: flex;
		align-items: center;
		gap: 12px;
		margin-left: auto;
		color: var(--muted);
		font-size: 0.7rem;
	}
	.sort-select {
		width: 190px;
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
	@media (max-width: 500px) {
		.sort-control {
			width: 100%;
			justify-content: space-between;
		}
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

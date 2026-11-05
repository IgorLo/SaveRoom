<script lang="ts">
	import { resolve } from '$app/paths';
	import { ProjectBody, ProjectCover } from '@/entities/project';
	import { AsciiDivider, AsciiLink } from '@/shared/ui';
	import { formatDate } from '@/shared/lib';
	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>{data.project.title} — Save Room</title>
	<meta name="description" content={data.project.summary} />
	<meta property="og:title" content={`${data.project.title} — Save Room`} />
	<meta property="og:description" content={data.project.summary} />
	<meta property="og:type" content="article" />
	<meta property="og:locale" content="ru_RU" />
	<meta property="og:image" content={`${data.origin}${data.project.cover.src}`} />
	<meta property="og:url" content={`${data.origin}/projects/${data.project.slug}/`} />
</svelte:head>

<div class="article-page">
	<a href={resolve('/')} class="back">[ ← Все проекты ]</a>
	<article>
		<header class="article-heading">
			<p class="eyebrow">ЗАПИСЬ ИЗ КОМНАТЫ СОХРАНЕНИЯ</p>
			<h1>{data.project.title}</h1>
			<div class="meta">
				<span>Игорь</span><span aria-hidden="true">/</span><time datetime={data.project.publishedAt}
					>{formatDate(data.project.publishedAt)}</time
				>
			</div>
		</header>
		<div class="article-cover"><ProjectCover image={data.project.cover} eager /></div>
		<div class="reading">
			<ProjectBody blocks={data.project.body} />
			{#if data.project.links.length}<div class="outlinks">
					{#each data.project.links as link (link.kind)}<AsciiLink
							href={link.href}
							label={link.label}
							external
						/>{/each}
				</div>{/if}
			<AsciiDivider label="СОХРАНЕНО" />
			<a href={resolve('/')} class="back bottom">[ ← Все проекты ]</a>
		</div>
	</article>
</div>

<style>
	.article-page {
		padding-top: 36px;
	}
	.back {
		display: inline-block;
		padding-block: 12px;
		color: var(--muted);
		font-size: 0.75rem;
		text-decoration: none;
	}
	.back:hover {
		color: var(--warm);
	}
	.article-heading {
		text-align: center;
		max-width: 800px;
		margin: 48px auto 40px;
	}
	h1 {
		font-size: clamp(2rem, 5vw, 3.7rem);
		line-height: 1.2;
		letter-spacing: -0.065em;
		font-weight: 500;
		margin: 24px 0;
	}
	.meta {
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		gap: 15px;
		font-size: 0.72rem;
		color: var(--muted);
	}
	.article-cover {
		max-width: 640px;
		margin: 0 auto 56px;
	}
	.reading {
		max-width: 760px;
		margin-inline: auto;
	}
	.outlinks {
		display: flex;
		flex-wrap: wrap;
		gap: 20px;
		margin: 40px 0;
	}
	.bottom {
		margin-top: 24px;
	}
	@media (max-width: 700px) {
		.article-heading {
			margin-top: 30px;
		}
		.eyebrow {
			font-size: 0.6rem;
		}
		.article-cover {
			margin-bottom: 36px;
		}
	}
</style>

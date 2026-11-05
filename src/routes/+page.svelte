<script lang="ts">
	import { Intro } from '@/widgets/intro';
	import { ProjectFeed } from '@/widgets/project-feed';
	import { profile } from '@/shared/config';
	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Save Room — проекты Игоря</title>
	<meta
		name="description"
		content="Личное хранилище проектов Игоря. Веб-приложения, боты, эксперименты с ASCII и другие хорошие затеи."
	/>
	<meta property="og:title" content="Save Room — проекты Игоря" />
	<meta
		property="og:description"
		content="Место для того, что я делаю. Проекты, эксперименты и маленькие поводы для гордости."
	/>
	<meta property="og:type" content="website" />
	<meta property="og:locale" content="ru_RU" />
	<meta property="og:image" content={`${data.origin}${profile.avatar}`} />
	<meta property="og:url" content={`${data.origin}/`} />
</svelte:head>
<Intro {profile} />
<ProjectFeed projects={data.projects} />

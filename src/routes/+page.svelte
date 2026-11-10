<script lang="ts">
	import { Intro } from '@/widgets/intro';
	import { ProjectFeed } from '@/widgets/project-feed';
	import { profile } from '@/shared/config';
	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>{profile.greeting} — Save Room</title>
	<meta name="description" content={profile.description} />
	<link rel="canonical" href={`${data.origin}/`} />
	<meta property="og:title" content={`${profile.greeting} — Save Room`} />
	<meta property="og:description" content={profile.description} />
	<meta property="og:type" content="website" />
	<meta property="og:locale" content="ru_RU" />
	<meta property="og:site_name" content="Save Room" />
	<meta property="og:image" content={`${data.origin}${profile.avatar}`} />
	<meta property="og:image:width" content="450" />
	<meta property="og:image:height" content="600" />
	<meta property="og:image:alt" content="Фотография Игоря" />
	<meta property="og:url" content={`${data.origin}/`} />
</svelte:head>
<Intro {profile} />
<ProjectFeed projects={data.projects} />

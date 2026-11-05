<script lang="ts">
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
</script>

<svelte:head><title>{page.status} — Save Room</title></svelte:head>
<section>
	<p aria-hidden="true">[ {page.status} ]</p>
	<h1>Кажется, эта комната пуста.</h1>
	<p>Здесь пока ничего не сохранено. Вернёмся к проектам?</p>
	<a href={resolve('/')}>[ ← Все проекты ]</a>
</section>

<style>
	section {
		padding-block: 90px;
		max-width: 680px;
	}
	h1 {
		font-size: clamp(1.8rem, 4vw, 3rem);
		font-weight: 500;
	}
	p {
		color: var(--muted);
		line-height: 1.8;
	}
	a {
		display: inline-block;
		margin-top: 24px;
		padding-block: 12px;
	}
</style>

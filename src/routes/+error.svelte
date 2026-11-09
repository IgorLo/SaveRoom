<script lang="ts">
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
	import { EmptyState, Link } from 'svelte-ascii-ui';
</script>

<svelte:head><title>{page.status} — Save Room</title></svelte:head>
<section>
	<h1>{page.status} — {page.status === 404 ? 'страница не найдена' : 'что-то пошло не так'}</h1>
	<EmptyState
		title={page.status === 404 ? 'Кажется, эта комната пуста.' : 'Не удалось открыть страницу.'}
		description={page.status === 404
			? 'Здесь пока ничего не сохранено. Вернёмся к проектам?'
			: 'Попробуйте вернуться к проектам.'}
		symbol={`[ ${page.status} ]`}
	>
		{#snippet actions()}<Link href={resolve('/')} button label="← Все проекты" />{/snippet}
	</EmptyState>
</section>

<style>
	section {
		padding-block: 90px;
		max-width: 680px;
	}
	h1 {
		font-size: clamp(1.8rem, 4vw, 3rem);
		font-weight: 600;
	}
</style>

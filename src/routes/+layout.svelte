<script lang="ts">
	import '@/shared/styles';
	import { resolve } from '$app/paths';
	import type { Snippet } from 'svelte';
	let { children }: { children: Snippet } = $props();
</script>

<a href="#main" class="skip-link">К содержимому</a>
<div class="shell">
	<header class="site-header">
		<a class="wordmark" href={resolve('/')} aria-label="Save Room — главная"
			><span aria-hidden="true">[ s/r ]</span> save room</a
		><span class="header-note"
			><span class="status-dot" aria-hidden="true">●</span>место, где можно сохраниться</span
		>
	</header>
	<main id="main">{@render children()}</main>
	<footer class="site-footer">
		<span>© Игорь · Save Room · {new Date().getUTCFullYear()}</span><a href={resolve('/')}
			>[ домой ↑ ]</a
		><span>Побочные проекты. Настоящий интерес.</span>
	</footer>
</div>

<script lang="ts">
	import { resolve } from '$app/paths';
	import type { Pathname } from '$app/types';
	import { Link } from 'svelte-ascii-ui';
	let {
		href,
		label,
		external = false,
		subtle = false
	}: { href: string; label: string; external?: boolean; subtle?: boolean } = $props();
</script>

{#if external}
	<Link
		{href}
		{label}
		button={!subtle}
		target="_blank"
		rel="external noopener noreferrer"
		aria-label={`${label} (новая вкладка)`}
	/>
{:else}
	<Link href={resolve(href as Pathname)} {label} button={!subtle} />
{/if}

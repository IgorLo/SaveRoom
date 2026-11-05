<script lang="ts">
	import { resolve } from '$app/paths';
	import type { Pathname } from '$app/types';
	let {
		href,
		label,
		external = false,
		subtle = false
	}: { href: string; label: string; external?: boolean; subtle?: boolean } = $props();
</script>

{#snippet contents()}
	<span>{label}</span><span aria-hidden="true" class="arrow">{external ? '↗' : '→'}</span>
	{#if external}<span class="sr-only"> (новая вкладка)</span>{/if}
{/snippet}
{#if external}
	<a {href} class={['ascii-link', { subtle }]} target="_blank" rel="external noopener noreferrer"
		>{@render contents()}</a
	>
{:else}
	<a href={resolve(href as Pathname)} class={['ascii-link', { subtle }]}>{@render contents()}</a>
{/if}

<style>
	.ascii-link {
		position: relative;
		display: inline-flex;
		align-items: center;
		justify-content: space-between;
		gap: 18px;
		min-height: 44px;
		padding: 11px 15px;
		border: 1px dashed var(--line);
		text-decoration: none;
		font-size: 0.72rem;
		line-height: 1.5;
		color: var(--ink);
		transition:
			color 140ms,
			background-color 140ms,
			border-color 140ms;
		max-width: 100%;
	}
	.ascii-link::before,
	.ascii-link::after {
		content: '+';
		position: absolute;
		color: var(--muted);
		font-size: 12px;
		line-height: 10px;
		background: var(--bg);
	}
	.ascii-link::before {
		top: -5px;
		left: -4px;
	}
	.ascii-link::after {
		bottom: -5px;
		right: -4px;
	}
	.ascii-link:hover {
		background: var(--accent);
		border-color: var(--accent);
		color: var(--bg);
	}
	.ascii-link:hover .arrow {
		color: var(--bg);
	}
	.arrow {
		color: var(--warm);
	}
	.subtle {
		border-color: transparent;
		padding-inline: 2px;
		color: var(--muted);
	}
	.subtle::before,
	.subtle::after {
		display: none;
	}
	.subtle:hover {
		background: transparent;
		color: var(--ink);
		border-color: transparent;
	}
	.subtle:hover .arrow {
		color: var(--warm);
	}
	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		overflow: hidden;
		clip-path: inset(50%);
		white-space: nowrap;
	}
</style>

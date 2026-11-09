<script lang="ts">
	import { Separator } from 'svelte-ascii-ui';
	let { label = '' }: { label?: string } = $props();
</script>

<div class="divider">
	<div class="line"><Separator label={label || undefined} /></div>
	{#if label}<span aria-hidden="true">{label}</span>{/if}
</div>

<style>
	.divider {
		display: flex;
		align-items: center;
		gap: 16px;
		color: var(--muted);
		font-size: 0.72rem;
		letter-spacing: 0.08em;
	}
	.divider span {
		flex: none;
	}
	.line {
		flex: 1;
	}
</style>

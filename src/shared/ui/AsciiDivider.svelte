<script lang="ts">
	let { label = '' }: { label?: string } = $props();
</script>

<div class="divider" aria-hidden="true">
	<span>+</span><i></i>{#if label}<span class="label">{label}</span><i class="short"></i>{/if}<span
		>+</span
	>
</div>

<style>
	.divider {
		display: flex;
		align-items: center;
		gap: 0;
		color: var(--line);
		height: 14px;
	}
	i {
		flex: 1;
		border-top: 1px dashed var(--line);
	}
	.short {
		flex: 0 0 30px;
	}
	.label {
		margin-inline: 14px;
		color: var(--muted);
		font-size: 0.62rem;
		letter-spacing: 0.1em;
	}
</style>

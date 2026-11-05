<script lang="ts">
	import { onMount } from 'svelte';
	let ready = $state(false);
	onMount(() => {
		ready = true;
	});
	let {
		image
	}: { image: { src: string; alt: string; caption?: string; width?: number; height?: number } } =
		$props();
	let dialog: HTMLDialogElement;
	let trigger: HTMLButtonElement;
	function open() {
		dialog.showModal();
	}
	function close() {
		dialog.close();
	}
</script>

<figure>
	<button
		class="image-trigger"
		bind:this={trigger}
		disabled={!ready}
		onclick={open}
		aria-label={`Увеличить: ${image.alt}`}
	>
		<img src={image.src} alt={image.alt} width={image.width} height={image.height} loading="lazy" />
		<span class="expand" aria-hidden="true">[ + увеличить ]</span>
	</button>
	{#if image.caption}<figcaption>{image.caption}</figcaption>{/if}
</figure>
<dialog bind:this={dialog} onclose={() => trigger.focus()} aria-label={image.alt}>
	<div class="dialog-bar">
		<span>ПРОСМОТР ИЗОБРАЖЕНИЯ</span><button onclick={close} aria-label="Закрыть изображение"
			>[ × Закрыть ]</button
		>
	</div>
	<img src={image.src} alt={image.alt} />
	{#if image.caption}<p>{image.caption}</p>{/if}
</dialog>

<style>
	figure {
		margin: 36px 0;
	}
	.image-trigger {
		display: block;
		position: relative;
		padding: 0;
		width: 100%;
		border: 1px solid var(--line);
		background: var(--panel);
		cursor: zoom-in;
		color: var(--ink);
	}
	.image-trigger img {
		width: 100%;
		height: auto;
	}
	.expand {
		position: absolute;
		right: 10px;
		bottom: 10px;
		padding: 8px 10px;
		background: var(--bg);
		font-size: 0.65rem;
		border: 1px solid var(--line);
	}
	.image-trigger:hover .expand {
		color: var(--warm);
	}
	figcaption {
		font-size: 0.72rem;
		color: var(--muted);
		margin-top: 14px;
		line-height: 1.8;
	}
	dialog {
		border: 1px solid var(--line);
		padding: 16px;
		background: var(--bg);
		color: var(--ink);
		max-width: min(1500px, 96vw);
		max-height: 95dvh;
	}
	dialog::backdrop {
		background: #12130ff0;
	}
	dialog img {
		max-height: 75dvh;
		max-width: 100%;
		width: auto;
		height: auto;
		object-fit: contain;
		margin-inline: auto;
	}
	.dialog-bar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 16px;
		margin-bottom: 16px;
		font-size: 0.65rem;
		color: var(--muted);
	}
	.dialog-bar button {
		border: 1px dashed var(--line);
		padding: 12px;
		color: var(--ink);
		background: none;
		cursor: pointer;
		min-height: 44px;
	}
	.dialog-bar button:hover {
		color: var(--warm);
	}
	dialog p {
		font-size: 0.75rem;
		margin-bottom: 0;
	}
	@media (max-width: 600px) {
		.dialog-bar > span {
			display: none;
		}
		.dialog-bar {
			justify-content: flex-end;
		}
		dialog {
			padding: 10px;
		}
	}
</style>

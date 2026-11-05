<script lang="ts">
	import type { ProjectImage } from '../model/project';
	let { image, eager = false }: { image: ProjectImage; eager?: boolean } = $props();
</script>

<div class="cover">
	<img
		src={image.src}
		alt={image.alt}
		width="1000"
		height="1000"
		loading={eager ? 'eager' : 'lazy'}
	/>
</div>

<style>
	.cover {
		background: #ded0b6;
		padding: 8px;
		border: 1px solid #e5d6be55;
	}
	img {
		width: 100%;
		aspect-ratio: 1;
		object-fit: contain;
		height: auto;
	}
</style>

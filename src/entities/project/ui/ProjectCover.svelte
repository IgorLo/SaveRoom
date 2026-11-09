<script lang="ts">
	import { Figure } from 'svelte-ascii-ui';
	import type { ProjectImage } from '../model/project';
	let { image, eager = false }: { image: ProjectImage; eager?: boolean } = $props();
</script>

<Figure
	src={image.src}
	alt={image.alt}
	width={image.width ?? 1000}
	height={image.height ?? 1000}
	loading={eager ? 'eager' : 'lazy'}
/>

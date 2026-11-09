<script lang="ts">
	import { Figure } from 'svelte-ascii-ui';
	let {
		image
	}: { image: { src: string; alt: string; caption?: string; width?: number; height?: number } } =
		$props();
</script>

<Figure
	src={image.src}
	alt={image.alt}
	caption={image.caption}
	width={image.width}
	height={image.height}
	loading="lazy"
	expandable
	expandLabel={`Увеличить: ${image.alt}`}
/>

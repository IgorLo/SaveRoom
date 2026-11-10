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
	style="width: auto; max-width: 100%; max-height: 600px; margin-inline: auto;"
	expandable
	expandLabel={`Увеличить: ${image.alt}`}
/>

<script lang="ts">
	import { Background, createSineWaves } from 'svelte-ascii-ui';
	import { roomBackgroundColor } from '@/shared/config/theme';

	let { paused }: { paused: boolean } = $props();

	// Keep the pattern stable across SSR and hydration; the waves vary across the canvas.
	const pattern = createSineWaves({
		seed: 37,
		angle: -18,
		amplitude: 72,
		wavelength: 540,
		spacing: 430,
		wavelengthVariability: 0.48,
		waveRandomness: 0.68,
		characters: ' .:-=+*'
	});
</script>

<div class="room-background" aria-hidden="true">
	<Background
		{pattern}
		{paused}
		color={roomBackgroundColor}
		opacity={0.2}
		cellWidth={18}
		cellHeight={22}
		speed={0.12}
		fps={8}
	/>
</div>

<style>
	.room-background {
		position: fixed;
		inset: 0;
		z-index: 0;
		pointer-events: none;
	}
</style>

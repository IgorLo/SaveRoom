<script lang="ts">
	import '@/shared/styles';
	import { resolve } from '$app/paths';
	import type { Snippet } from 'svelte';
	import { Button, Link, MusicPlayer, Theme } from 'svelte-ascii-ui';
	import { roomPlayerLabels, roomTracks } from '@/shared/config/music';
	import { roomColors } from '@/shared/config/theme';
	import { RoomBackground } from '@/shared/ui';
	let { children }: { children: Snippet } = $props();
	let backgroundPaused = $state(false);
</script>

<Theme colors={roomColors}>
	<RoomBackground paused={backgroundPaused} />
	<a href="#main" class="skip-link">К содержимому</a>
	<div class="shell">
		<header class="site-header">
			<Link class="wordmark" href={resolve('/')} aria-label="Save Room — главная"
				><span aria-hidden="true">[ SR ]</span> Save Room</Link
			>
			<div class="header-player">
				<MusicPlayer tracks={roomTracks} labels={roomPlayerLabels} clickSound="/audio/press.wav" />
			</div>
		</header>
		<main id="main">{@render children()}</main>
		<footer class="site-footer">
			<span>© Игорь · Save Room · {new Date().getUTCFullYear()}</span><Link href={resolve('/')}
				>[ домой ↑ ]</Link
			>
			<div class="footer-background">
				<Button
					label={backgroundPaused ? 'Включить фон' : 'Остановить фон'}
					size="s"
					aria-pressed={backgroundPaused}
					onclick={() => (backgroundPaused = !backgroundPaused)}
				/>
			</div>
		</footer>
	</div>
</Theme>

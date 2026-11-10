<script lang="ts">
	import { AsciiLink } from '@/shared/ui';
	import type { Profile } from '@/shared/config';
	let { profile }: { profile: Profile } = $props();
</script>

<section class="intro" aria-label="Обо мне">
	<div class="about">
		<img class="avatar" src={profile.avatar} alt="Фотография Игоря" width="450" height="600" />
		<div class="about-copy">
			<h1>{profile.greeting}</h1>
			<p>{profile.description}</p>
			<nav aria-label="Мои ссылки">
				{#each profile.links as link (link.href)}
					<AsciiLink href={link.href} label={link.label} external />
				{/each}
			</nav>
		</div>
	</div>
</section>

<style>
	.intro {
		margin-block: 24px;
		padding: 40px 32px;
		background: color-mix(in srgb, var(--bg) 68%, transparent);
	}
	.about {
		display: grid;
		grid-template-columns: minmax(0, 320px) minmax(0, 1fr);
		align-items: center;
		gap: clamp(28px, 4vw, 56px);
	}
	.avatar {
		display: block;
		width: 100%;
		height: auto;
	}
	.about-copy {
		max-width: 710px;
		min-width: 0;
	}
	h1 {
		font-size: clamp(1.55rem, 3vw, 2.4rem);
		line-height: 1.35;
		margin: 0 0 12px;
	}
	p {
		margin: 0;
		color: var(--muted);
		line-height: 1.8;
	}
	nav {
		display: flex;
		flex-wrap: wrap;
		gap: 12px;
		margin-top: 32px;
	}
	@media (max-width: 850px) {
		.intro {
			margin-block: 18px;
			padding: 24px 18px;
		}
		.about {
			grid-template-columns: minmax(0, 1fr);
			gap: 24px;
		}
		.avatar {
			max-width: 320px;
		}
		h1 {
			font-size: 1.3rem;
		}
		p {
			font-size: 0.85rem;
		}
	}
</style>

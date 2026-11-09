<script lang="ts">
	import { AsciiLink } from '@/shared/ui';
	import type { Profile } from '@/shared/config';
	let { profile }: { profile: Profile } = $props();
</script>

<section class="intro" aria-label="Обо мне">
	<div class="about">
		<img
			class="avatar"
			src={profile.avatar}
			alt="Временный аватар Игоря — робот с книгой"
			width="88"
			height="88"
		/>
		<div class="about-copy">
			<h1>{profile.greeting}</h1>
			<p>{profile.description}</p>
		</div>
	</div>
	<nav aria-label="Мои ссылки">
		{#each profile.links as link (link.href)}
			<AsciiLink href={link.href} label={link.label} external />
		{/each}
	</nav>
</section>

<style>
	.intro {
		padding: 64px 0 56px;
	}
	.about {
		display: flex;
		align-items: center;
		gap: 28px;
	}
	.avatar {
		width: 88px;
		height: 88px;
		flex: none;
		object-fit: cover;
	}
	.about-copy {
		max-width: 710px;
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
	@media (max-width: 700px) {
		.intro {
			padding: 40px 0;
		}
		.about {
			align-items: flex-start;
			gap: 16px;
		}
		.avatar {
			width: 64px;
			height: 64px;
		}
		h1 {
			font-size: 1.3rem;
		}
		p {
			font-size: 0.85rem;
		}
	}
</style>

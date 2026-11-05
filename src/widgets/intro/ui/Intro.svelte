<script lang="ts">
	import { AsciiLink } from '@/shared/ui';
	import type { Profile } from '@/shared/config';
	let { profile }: { profile: Profile } = $props();
	const room = `       ._________________.
      /                 /|
     /_________________/ |
     |                 | |
     |   .----.        | |
     |   | [] |   .-.  | |
     |   '----'  (   ) | |
     |            | |  | |
     |    ____   _|_|_ | /
     |   /___/|        |/
     '---|___|'--------'
           [ сохранено ]`;
</script>

<section class="intro" aria-label="Обо мне">
	<div class="hero">
		<div class="title-block">
			<p class="eyebrow"><span aria-hidden="true">*</span> Личное хранилище хороших затей</p>
			<h1>Save Room<span aria-hidden="true">_</span></h1>
			<p class="tagline">Место для того, что я делаю.</p>
		</div>
		<pre class="room" aria-hidden="true">{room}</pre>
	</div>
	<div class="about">
		<img
			class="avatar"
			src={profile.avatar}
			alt="Временный аватар Игоря — робот с книгой"
			width="88"
			height="88"
		/>
		<div class="about-copy">
			<h2>{profile.greeting}</h2>
			<p>{profile.description}</p>
		</div>
		<div class="note" aria-hidden="true">// сделано с интересом<br />// сохранено на память</div>
	</div>
	<nav aria-label="Мои ссылки">
		{#each profile.links as link (link.href)}<AsciiLink
				href={link.href}
				label={link.label}
				external
			/>{/each}
	</nav>
</section>

<style>
	.intro {
		padding: 72px 0 64px;
	}
	.hero {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 26px;
	}
	.title-block {
		min-width: 0;
	}
	.eyebrow {
		margin: 0 0 24px;
	}
	.eyebrow span {
		color: var(--warm);
		margin-right: 9px;
	}
	h1 {
		font-size: clamp(3.3rem, 7.4vw, 6.3rem);
		font-weight: 500;
		letter-spacing: -0.085em;
		line-height: 1.05;
		margin: 0;
	}
	h1 span {
		color: var(--warm);
	}
	.tagline {
		font-size: 0.9rem;
		color: var(--muted);
		margin-top: 24px;
	}
	.room {
		color: #aaad82;
		font-family: inherit;
		font-size: 0.73rem;
		line-height: 1.35;
		margin: 0 20px 0 0;
		flex-shrink: 0;
		user-select: none;
	}
	.about {
		display: flex;
		align-items: center;
		gap: 24px;
		margin-top: 52px;
	}
	.avatar {
		width: 78px;
		height: 78px;
		border: 5px solid #45463b;
		outline: 1px dashed #777963;
		outline-offset: 4px;
		flex-shrink: 0;
		object-fit: cover;
	}
	.about-copy {
		max-width: 580px;
	}
	h2 {
		font-size: 0.93rem;
		font-weight: 500;
		margin: 0 0 10px;
	}
	.about-copy p {
		color: var(--muted);
		font-size: 0.8rem;
		line-height: 1.9;
		margin: 0;
	}
	.note {
		margin-left: auto;
		font-size: 0.63rem;
		color: #999a88;
		line-height: 1.9;
		white-space: nowrap;
	}
	nav {
		display: flex;
		flex-wrap: wrap;
		gap: 14px;
		margin-top: 32px;
	}
	@media (max-width: 940px) {
		.note {
			display: none;
		}
		.room {
			font-size: 0.57rem;
			margin-right: 0;
		}
	}
	@media (max-width: 700px) {
		.intro {
			padding: 44px 0 40px;
		}
		.room {
			display: none;
		}
		h1 {
			font-size: clamp(2.8rem, 12vw, 5rem);
		}
		.eyebrow {
			font-size: 0.57rem;
			letter-spacing: 0.08em;
		}
		.tagline {
			font-size: 0.75rem;
		}
		.about {
			align-items: flex-start;
			margin-top: 36px;
			gap: 18px;
		}
		.avatar {
			width: 54px;
			height: 54px;
			border-width: 3px;
		}
		.about-copy p {
			font-size: 0.75rem;
		}
		nav {
			gap: 12px;
		}
	}
</style>

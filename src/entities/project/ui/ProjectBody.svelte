<script lang="ts">
	import { ImageViewer } from '@/shared/ui';
	import type { ContentBlock } from '../model/project';
	let { blocks }: { blocks: ContentBlock[] } = $props();
</script>

<div class="body">
	{#each blocks as block (block)}
		{#if block.type === 'paragraph'}<p>{block.text}</p>
		{:else if block.type === 'heading'}<h2>{block.text}</h2>
		{:else if block.type === 'list'}<ul>
				{#each block.items as item, index (`${index}-${item}`)}<li>{item}</li>{/each}
			</ul>
		{:else if block.type === 'image'}<ImageViewer image={block} />{/if}
	{/each}
</div>

<style>
	.body {
		font-size: 0.94rem;
		line-height: 2;
	}
	p {
		margin: 0 0 25px;
		color: #c4c0ae;
	}
	h2 {
		font-size: 1.3rem;
		font-weight: 500;
		line-height: 1.5;
		margin: 48px 0 24px;
		letter-spacing: -0.035em;
	}
	ul {
		padding-left: 24px;
		color: #c4c0ae;
		margin-block: 24px 32px;
	}
	li {
		padding-left: 8px;
		margin-block: 10px;
	}
	li::marker {
		content: '+ ';
		color: var(--warm);
	}
	@media (max-width: 700px) {
		.body {
			font-size: 0.84rem;
		}
	}
</style>

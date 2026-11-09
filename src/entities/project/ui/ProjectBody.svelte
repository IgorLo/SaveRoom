<script lang="ts">
	import { ImageViewer } from '@/shared/ui';
	import { Article } from 'svelte-ascii-ui';
	import type { ContentBlock } from '../model/project';
	let { blocks }: { blocks: ContentBlock[] } = $props();
</script>

<div class="body">
	<Article>
		{#each blocks as block (block)}
			{#if block.type === 'paragraph'}<p>{block.text}</p>
			{:else if block.type === 'heading'}<h2>{block.text}</h2>
			{:else if block.type === 'list'}<ul>
					{#each block.items as item, index (`${index}-${item}`)}<li>{item}</li>{/each}
				</ul>
			{:else if block.type === 'image'}<ImageViewer image={block} />{/if}
		{/each}
	</Article>
</div>

<style>
	ul {
		padding-left: 24px;
		margin-block: 24px 32px;
	}
	li {
		padding-left: 8px;
		margin-block: 10px;
	}
	li::marker {
		content: '+ ';
		color: var(--warning);
	}
</style>

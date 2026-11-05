import fsd from '@feature-sliced/steiger-plugin';
import { defineConfig } from 'steiger';

export default defineConfig([
	...fsd.configs.recommended,
	{
		// SvelteKit routes are the composition root, outside FSD's recognized layers.
		// This heuristic misses their consumers; all dependency/public-API checks remain on.
		rules: { 'fsd/insignificant-slice': 'off' }
	}
]);

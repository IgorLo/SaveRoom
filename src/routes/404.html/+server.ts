import { text } from '@sveltejs/kit';
import kitStylesheet from 'svelte-ascii-ui/styles.css?url';
import fallback from './page.html?raw';
import { roomScrollbarColors } from '@/shared/config/theme';

export const prerender = true;
export const trailingSlash = 'never';

export function GET() {
	const html = fallback
		.replace('%room.scrollbar-colors%', roomScrollbarColors)
		.replace('%room.theme-stylesheet%', kitStylesheet);

	return text(html, { headers: { 'content-type': 'text/html; charset=utf-8' } });
}

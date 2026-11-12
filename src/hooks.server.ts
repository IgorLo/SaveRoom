import type { Handle } from '@sveltejs/kit';
import { roomScrollbarColors } from '@/shared/config/theme';

export const handle: Handle = ({ event, resolve }) =>
	resolve(event, {
		transformPageChunk: ({ html }) => html.replace('%room.scrollbar-colors%', roomScrollbarColors)
	});

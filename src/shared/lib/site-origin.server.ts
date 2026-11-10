const defaultSiteOrigin = 'https://save-room-psi.vercel.app';

export function getSiteOrigin(url: URL): string {
	const configuredOrigin = process.env.PUBLIC_SITE_URL?.trim().replace(/\/$/, '');
	if (configuredOrigin) return configuredOrigin;
	if (process.env.VERCEL_ENV === 'preview' && process.env.VERCEL_URL) {
		return `https://${process.env.VERCEL_URL}`;
	}
	return url.hostname === 'sveltekit-prerender' ? defaultSiteOrigin : url.origin;
}

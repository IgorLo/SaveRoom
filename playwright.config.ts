import { defineConfig } from '@playwright/test';

// Local readiness probes must not be sent through a machine-wide HTTP proxy.
process.env.NO_PROXY = [process.env.NO_PROXY, '127.0.0.1', 'localhost'].filter(Boolean).join(',');

export default defineConfig({
	testDir: './tests',
	testMatch: '**/*.spec.ts',
	fullyParallel: true,
	workers: 2,
	use: { baseURL: 'http://127.0.0.1:4174', trace: 'retain-on-failure' },
	webServer: {
		command: 'node scripts/serve-static.mjs',
		url: 'http://127.0.0.1:4174',
		reuseExistingServer: false
	},
	projects: [
		{ name: 'desktop', use: { viewport: { width: 1440, height: 1000 } } },
		{
			name: 'mobile',
			use: { viewport: { width: 360, height: 780 }, isMobile: true, hasTouch: true }
		}
	]
});

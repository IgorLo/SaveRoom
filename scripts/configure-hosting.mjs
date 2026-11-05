import { readFile, writeFile } from 'node:fs/promises';

// adapter-static generates the Build Output API config before this hook runs.
if (process.env.VERCEL) {
	const path = '.vercel/output/config.json';
	const config = JSON.parse(await readFile(path, 'utf8'));
	config.routes.push({ src: '/.*', dest: '/404.html', status: 404 });
	await writeFile(path, JSON.stringify(config, null, 2));
}

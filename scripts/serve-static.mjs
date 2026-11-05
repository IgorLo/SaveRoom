import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, relative, extname, isAbsolute } from 'node:path';

// Test server for generated artifacts only: no Svelte SSR or SPA fallback.
const root = resolve('build');
const mime = {
	'.html': 'text/html; charset=utf-8',
	'.js': 'text/javascript',
	'.css': 'text/css',
	'.json': 'application/json',
	'.webp': 'image/webp',
	'.svg': 'image/svg+xml',
	'.woff2': 'font/woff2'
};
createServer(async (request, response) => {
	try {
		const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
		let file = resolve(root, `.${pathname}`);
		const local = relative(root, file);
		if (local.startsWith('..') || isAbsolute(local)) throw new Error('Outside build');
		if ((await stat(file)).isDirectory()) {
			if (!pathname.endsWith('/')) {
				response.writeHead(308, { Location: `${pathname}/` });
				response.end();
				return;
			}
			file = resolve(file, 'index.html');
		}
		const body = await readFile(file);
		response.writeHead(200, { 'Content-Type': mime[extname(file)] ?? 'application/octet-stream' });
		response.end(body);
	} catch {
		response.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
		response.end(await readFile(resolve(root, '404.html')));
	}
}).listen(4174, '127.0.0.1');

import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		preprocess({
			postcss: true
		})
	],
	kit: {
		adapter: adapter({
			pages: `dist${process.env['BETA'] ? '/beta' : ''}`
		}),
		paths: process.env['DEPLOY']
			? {
					base: `/puml${process.env['BETA'] ? '/beta' : ''}`
			  }
			: {},
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
		trailingSlash: 'ignore',
		vite: {
			envPrefix: 'MERMAID_',
			optimizeDeps: { include: ['mermaid'] }
		}
	}
};

export default config;

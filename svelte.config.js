/** @type {import('@sveltejs/kit').Config} */

import netlify from '@sveltejs/adapter-netlify'
import vercel from '@sveltejs/adapter-vercel'
import node from '@sveltejs/adapter-node'

const config = {
	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
		adapter: netlify(),
	}
};

export default config;

import { defineConfig } from 'astro/config'

// https://astro.build/config
export default defineConfig({
	site: 'https://peterkaku.com',
	trailingSlash: 'always',
	build: {
		format: 'directory',
	},
})

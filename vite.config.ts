import { fileURLToPath, URL } from 'node:url'

import vue from '@vitejs/plugin-vue'
import { visualizer } from 'rollup-plugin-visualizer'
import { defineConfig } from 'vite'
import vueDevTools from 'vite-plugin-vue-devtools'
// https://vite.dev/config/
export default defineConfig({
	build: {
		rollupOptions: {
			output: {
				manualChunks: {
					vue: ['vue']
				}
			}
		}
	},
	plugins: [
		vue(),
		vueDevTools(),
		visualizer({
			filename: 'stats.html',
			open: true,
			gzipSize: true,
			brotliSize: true
		})
	],
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url))
		}
	}
})

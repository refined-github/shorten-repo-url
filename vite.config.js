import {resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {defineConfig} from 'vite';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
	base: '',
	root: resolve(__dirname, 'demo'),
	build: {
		outDir: resolve(__dirname, 'demo/dist'),
		emptyOutDir: true,
		rollupOptions: {
			input: {
				main: resolve(__dirname, 'demo/index.html'),
			},
		},
	},
});

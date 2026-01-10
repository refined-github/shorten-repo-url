import {defineConfig} from 'vite';

export default defineConfig(({command}) => {
	if (command === 'build') {
		return {
			base: '',
			build: {
				outDir: 'dist',
				emptyOutDir: true,
			},
		};
	}

	// Default config for test/serve
	return {
		test: {
			exclude: ['**/node_modules/**', '**/dist/**'],
		},
	};
});

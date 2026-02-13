import { defineConfig } from 'vite';

export default defineConfig({
    base: './',
    target: 'node18',
    rollupOptions: {
      external: ['fs', 'fs/promises', 'path', 'os']
    },
    logLevel: 'warning',
    build: {
        minify: 'terser',
        terserOptions: {
            compress: {
                passes: 2
            },
            mangle: true,
            format: {
                comments: false
            }
        }
    },
});

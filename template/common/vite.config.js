import { defineConfig } from 'vite';

export default defineConfig(({ command }) => ({
  base: './',
  target: 'node18',
  logLevel: 'warning',
  build: {
    outdir: 'dist',
    minify: 'terser',
    terserOptions: {
      compress: {
        passes: 2,
      },
      mangle: true,
      format: {
        comments: false,
      },
    },
  },
  server: {
    port: 8080,
  },
  ...(command === 'build'
    ? {
        rollupOptions: {
          external: ['fs', 'fs/promises', 'path', 'os'],
        },
      }
    : {}),
}));

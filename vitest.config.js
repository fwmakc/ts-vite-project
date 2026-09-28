import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    exclude: ['**/node_modules/**', '**/dist/**', 'template/**'],
    coverage: {
      provider: 'v8',
      reporter: ['text-summary', 'html'],
    },
  },
});

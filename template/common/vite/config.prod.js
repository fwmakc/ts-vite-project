import { defineConfig } from 'vite';

export default defineConfig({
    base: './',

    // исключить Node.js модули из сборки
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
    // server: {
    //     port: 8080
    // },
});

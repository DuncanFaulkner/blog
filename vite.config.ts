/// <reference types="vitest" />
import analog from '@analogjs/platform';
import { defineConfig } from 'vite';
import { extractRoutesToPrerender } from 'vite-prerender.utils';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  publicDir: 'src/assets',
  build: {
    target: ['es2020'],
  },
  resolve: {
    mainFields: ['module'],
  },
  plugins: [
    analog({
      static: true,
      prerender: {
        routes: extractRoutesToPrerender(),
        // routes: ['/', '/blog', '/talks', '/portfolio'],
        sitemap: {
          host: 'https://anglebrackets.dev',
        },
      },
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/test.ts'],
    include: ['**/*.spec.ts'],
    reporters: ['default'],
  },
  define: {
    'import.meta.vitest': mode !== 'production',
  },
}));

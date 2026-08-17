import { defineConfig } from 'vitest/config';
import path from 'node:path';

const rootDir = path.dirname(new URL(import.meta.url).pathname);

export default defineConfig({
  resolve: {
    alias: {
      '@/src': path.resolve(rootDir, './src'),
    },
  },
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
  },
});

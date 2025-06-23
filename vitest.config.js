import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true, // ← Esto es lo que falta
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
  },
});
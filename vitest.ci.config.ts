/// <reference types="vitest" />
import { defineConfig } from 'vite';

// Minimal config for CI environment
export default defineConfig({
  test: {
    globals: true,
    environment: 'node', // Use node instead of jsdom for CI
    include: ['src/**/*.{test,spec}.{ts,js}'],
    exclude: [
      'node_modules',
      'dist',
      'dist-electron',
      'dist_electron',
      'src/**/*.tsx' // Skip React tests in CI for now
    ],
  }
});
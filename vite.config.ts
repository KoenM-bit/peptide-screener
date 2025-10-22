import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import electron from 'vite-plugin-electron';
import renderer from 'vite-plugin-electron-renderer';

export default defineConfig({
  plugins: [
    react(),
    electron({
      entry: 'src/electron/main.js',
      vite: {
        build: {
          outDir: 'dist-electron',
          rollupOptions: {
            external: ['electron']
          }
        }
      }
    }),
    renderer()
  ],
  base: './',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  },
  server: {
    port: 5173
  }
});
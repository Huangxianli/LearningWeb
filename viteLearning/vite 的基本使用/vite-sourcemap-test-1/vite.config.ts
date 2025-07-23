import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    sourcemapIgnoreList: () => {
      return true;
    },
  },
  build: {
    sourcemap: 'hidden',
    outDir: 'dist-sourcemap-hidden',
  },

  base: './',
});

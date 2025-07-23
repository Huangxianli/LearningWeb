import { defineConfig } from 'vite';
import Vue2 from '@vitejs/plugin-vue2';
export default defineConfig({
  plugins: [
    Vue2({
      jsx: true, // 开启 JSX 支持
    }),
  ],
});

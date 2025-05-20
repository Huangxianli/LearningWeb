import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue2';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      vue: 'vue/dist/vue.esm.js', // 使用包含编译器的版本，不适用这个，就不能使用  template 语法
    },
  },
});

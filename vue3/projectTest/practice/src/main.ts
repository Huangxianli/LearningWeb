import { createApp } from 'vue';
import ElementPlus from 'element-plus';

import 'element-plus/dist/index.css';

import router from './router/index';

import './style.css';
import { outClick } from './directives/outClick';
import { outClickExcludes } from './directives/outClickExcludes';
import App from './App.vue';

createApp(App)
  .directive('outClick', outClick)
  .directive('outClickExcludes', outClickExcludes)
  .use(router)
  .use(ElementPlus)
  .mount('#app');

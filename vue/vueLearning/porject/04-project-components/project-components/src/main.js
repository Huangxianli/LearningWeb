import Vue from 'vue'
import VueRouter from 'vue-router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import ajax from '@/ajax/index.js'
import App from './App.vue';
import router from './router';

Vue.use(VueRouter);
Vue.use(ElementUI);
Vue.config.productionTip = false;

Vue.prototype.$ajax = ajax;

new Vue({
  router,
  render: h => h(App),
})
  .$mount('#app');


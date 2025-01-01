import Vue from 'vue'
import VueRouter from 'vue-router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import App from './App.vue';
import router from './router';

import ajax from '@/ajax/index.js'
import ajax1 from '@/components1/ajax';

Vue.use(VueRouter);
Vue.use(ElementUI);
Vue.config.productionTip = false;

Vue.prototype.$ajax = ajax;
Vue.prototype.$ajax1 = ajax1;

new Vue({
  router,
  render: h => h(App),
})
  .$mount('#app');


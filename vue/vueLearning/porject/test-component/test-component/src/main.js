import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/css/index.css'

import Ajax from './utils/ajax';

import App from './App.vue';

Vue.config.productionTip = false;
Vue.prototype.$ajax = Ajax;

Vue.use(ElementUI);

new Vue({
  render: h => h(App),
}).$mount('#app');

import VueRouter from 'vue-router';

import MyHome from '@/views/MyHome.vue';

const routes = [
  {
    name: 'home',
    path: '/',
    component: MyHome
  }
];
const router = new VueRouter({ routes });

export default router;
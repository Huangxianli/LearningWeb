import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/home/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/piniaTest',
      name: 'piniaTest',
      component: () => import('@/views/piniaTest/PiniaTest.vue'),
    },
    {
      path: '/piniaTestDetail/:id',
      name: 'piniaTestDetail',
      component: () => import('@/views/piniaTest/TestDetail.vue'),
    },
  ],
});

export default router;

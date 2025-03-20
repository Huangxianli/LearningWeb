import { createRouter, createWebHistory } from 'vue-router';
import type { Router, RouteRecordRaw } from 'vue-router';

const  HomeView = import('@/views/home/HomeView.vue');


const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  }
];
const router: Router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
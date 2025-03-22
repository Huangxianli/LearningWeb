import { createRouter, createWebHistory } from 'vue-router';
import type { Router, RouteRecordRaw } from 'vue-router';

const LoginView = import('@/views/login/LoginView.vue');
const SignUpView = import('@/views/login/SignUpView.vue');
const HomeView = import('@/views/home/HomeView.vue');

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/signUp',
    name: 'signUp',
    component: SignUpView,
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView,
  }
];
const router: Router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
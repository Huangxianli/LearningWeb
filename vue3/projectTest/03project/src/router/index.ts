import { createRouter, createWebHistory } from 'vue-router';
import type { Router, RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: { name: 'testList' },
  },
  {
    path: '/testList',
    name: 'testList',
    component: () => import('@/views/eleTest/TestList.vue'),
  },
  {
    path: '/testDetail',
    name: 'testDetail',
    component: () => import('@/views/eleTest/TestDetail.vue'),
    children: [
      {
        path: 'checkboxTest',
        name: 'checkboxTest',
        component: () => import('@/views/eleTest/formTest/CheckboxTest.vue'),
      },
    ],
  },
];
const router: Router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

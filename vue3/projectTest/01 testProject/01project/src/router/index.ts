import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';

import HomeView from '@/views/home/HomeView.vue';
import TestView from '@/views/test/TestView.vue';
import TableTest from '@/views/test/TableTest.vue';



const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/test',
    name: 'test',
    component: TestView,
    children: [
      {
        path: 'tableTest',
        name: 'tableTest',
        component: TableTest,
        meta: {
          titleName: '表格练习'
        }
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*', // vue-router 4 的写法和 3 的写法不一样，3 只要 "*" 就可以了
    redirect: { name: 'home' }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes
});
export default router;
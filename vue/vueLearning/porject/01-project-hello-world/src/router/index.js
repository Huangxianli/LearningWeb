import Vue from 'vue';
import VueRouter from 'vue-router';

import HomeView from '../views/HomeView.vue';
import AboutView from '../views/AboutView.vue';
import GoodsView from '../views/GoodsView.vue';
import NotFindView from '../views/404View.vue';
import ExampleVuex from '@/views/exampleVuex/ExampleVuex.vue';
import TestTable from '@/views/TestTable.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/home',
    component: HomeView
  },
  {
    path: '/about',
    component: AboutView
  },
  {
    path: '/exampleVuex',
    component: ExampleVuex,
  },
  {
    name: 'goods',
    path: "/goods/:id",
    component: GoodsView
  },
  {
    name: "testTable",
    path: "/testTable",
    component: TestTable
  },
  {
    path: '*',
    component: NotFindView
  },

];

const router = new VueRouter({
  base: 'http://localhost:8080',
  routes,
});
export default router;
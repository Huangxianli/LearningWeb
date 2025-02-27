import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeView from '@/views/home/HomeView.vue';
import ListView from '@/views/list/ListView.vue'

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: HomeView,
  },
  {
    path: '/list',
    component: ListView
  }
];
const router = new VueRouter({
  routes,
});

Vue.use(VueRouter);
export default router;

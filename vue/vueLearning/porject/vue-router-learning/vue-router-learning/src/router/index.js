import VueRouter from 'vue-router';

import HomeView from '@/views/home/HomeView.vue';
import GoodsInfoView from '@/views/goodsInfo/GoodsInfoView.vue';
import OrderView from '@/views/orders/OrderView.vue';
import OrderListView from '@/views/orders/orderList/OrderListView.vue';
import OrderDetailView from '@/views/orders/orderDetail/OrderDetailView.vue';
import NotFindView from '@/views/notFind/NotFindView.vue';


const routes = [
  {
    path: '/',
    // 路由重定向
    redirect: '/home',
  },
  {
    path: '/home',
    component: HomeView,
  },
  {
    // 动态路由
    path: '/goodsInfo/:goodsId',
    component: GoodsInfoView,
  },
  {
    path: '/order',
    component: OrderView,
    children: [
      {
        // 嵌套路由，使用 / 会被当成根路径
        path: 'orderList',
        component: OrderListView,
      },
      {
        name: 'orderDetail',
        path: ':id/orderDetail',
        component: OrderDetailView,
      }
    ],
  },
  {
    path: '*',
    component: NotFindView,
  }
];

const router = new VueRouter({
  routes
});

export default router;

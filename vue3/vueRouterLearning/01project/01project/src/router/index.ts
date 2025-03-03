import { createRouter, createWebHistory } from 'vue-router';
import type { Router, RouteRecordRaw } from 'vue-router';

import HomeView from '@/views/myHome/MyHome.vue';
import ShopCart from '@/views/shopCart/ShopCart.vue';
import GoodsList from '@/views/goods/goodsList/GoodsList.vue';
import GoodsInfo from '@/views/goods/goodsInfo/GoodsInfo.vue';
import Test1 from '@/views/test1/Test1.vue';
import Test1Child1 from '@/views/test1/Test1Child1.vue';
import Test2 from '@/views/test2/Test2.vue';
import Test2Left from '@/views/test2/Test2Left.vue';
import Test2Right from '@/views/test2/Test2Right.vue';
/**
 * 所有的路由都是不区分大小写的，并且能匹配带有或不带有尾部斜线的路由。例如，路由 /users 将匹配 /users、/users/、甚至 /Users/
 *  strict 为 true，不会匹配到最后的斜线
 * sensitive 为 true，字符大小区分大小写
 */

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: HomeView,
    name: 'home',
  },
  {
    path: '/goodsList',
    component: GoodsList,
    name: 'goodsList',
  },
  {
    path: '/:goodsId/goodsInfo', // 如果在使用的时候，path 配合 params 那么会忽略 params，以 path 为主
    component: GoodsInfo,
    name: 'goodsInfo',
    props: true, // 将 goodsId 作为 prop 传递给 GoodsInfo 组件
  },
  {
    path: '/shopCart',
    component: ShopCart,
    name: 'shopCart'
  },
  {
    path: '/test1',
    component: Test1,
    name: 'test1',
    children: [
      {
        path: '',
        name: 'test1Child', // 所有的命名路由都应该是独一无二的，如果为多个路由添加相同的名称，那么路由器只会保留最后的一条
        redirect: { name: 'test1Child1' }
      },
      {
        path: 'test1Child1', // 注意，以 / 开头的嵌套路径将被视为根路径，子路由一般都不会在最前面加 /
        component: Test1Child1,
        name: 'test1Child1',
      }
    ]
  },
  {
    path: '/test2',
    name: 'test2',
    component: Test2,
    children: [
      {
        path: '',
        name: 'test2child',
        redirect: {
          name: 'test2child1'
        },
      },
      {
        path: 'test2child1',
        name: 'test2child1',
        components: {
          left: Test2Left,
          right: Test2Right,
        }
      }
    ],

  }
];

const router: Router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
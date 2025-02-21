import VueRouter from 'vue-router';

import HomeView from '@/views/home/HomeView.vue';
import MenuView from '@/views/menu/MenuView.vue';
import GoodsInfoView from '@/views/goodsInfo/GoodsInfoView.vue';
import OrderView from '@/views/orders/OrderView.vue';
import OrderListView from '@/views/orders/orderList/OrderListView.vue';
import OrderDetailView from '@/views/orders/orderDetail/OrderDetailView.vue';
import NotFindView from '@/views/notFind/NotFindView.vue';


const routes = [
  {
    path: '/',
    // 路由重定向
    // redirect: '/home',
    redirect: to => {
      to;
      return {
        path: '/home'
      }
    },
  },
  {
    path: '/home',
    // alias: '/selfHome', // 别名
    alias: ['/selfHome', '/myselfHome'], // 别名
    // component: HomeView,
    components: {
      default: HomeView,
      menu: MenuView,
    }
  },
  {
    // 动态路由
    path: '/goodsInfo/:goodsId',
    component: GoodsInfoView,
  },
  {
    path: '/order',
    component: OrderView,
    meta: { // 路由原信息
      a: 1,
    },
    children: [
      {
        // 嵌套路由，使用 / 会被当成根路径
        path: 'orderList',
        component: OrderListView,
        beforeEnter: (to, from, next) => {
          to;
          from;
          next();
        }
      },
      {
        // 命名路由
        name: 'orderDetail',
        path: ':id/orderDetail',
        component: () => {
          return new Promise(resolve => {
            setTimeout(() => { resolve(OrderDetailView) }, 1000)
          });
        },
        props: true, // 将 id 作为 props 传递给组件
        // props: { add: 12 } // 给组件传递 props id，且值为 12 
        // props: route => ({ id: route.query.id }) // 给组件传递 props id，且值为 route.query.id
      }
    ],
  },
  {
    path: '*',
    component: NotFindView,
  }
];

const router = new VueRouter({
  mode: 'history',
  routes,
  scrollBehavior (to, from, savedPosition) {
    // 每次切换到路由的时候滚动到页面
    to;
    from;
    savedPosition; // 该参数只有在通过浏览器的前进后退按钮触的才可以使用
    // return 期望滚动到哪个的位置  {x,y} | {selector, offset? {x,y}} | falsy 
  }
});


// 全局前置守卫
router.beforeEach((to, from, next) => {
  to.matched.forEach(recorde => {
    // meta 路由元信息可以用这种方式访问，都存在 matched 数组里面，每一个路由层级都可以添加 meta，最中的路由会集合该路由上每层的 meta，形成一个数组 matched 也会挂在 $route 上 $route.mnatched
    recorde.meta.a
  })
  to;
  from;
  // next('/home');
  next(); // 如果没有调用 next()，导航一直处于 等待状态
  // 如果两个都放开的话，按照这个顺序，会进入死循环，先进入 '/home'，在进入到 原先的，这样就触发了一次导航，又会进入这个全局前置守卫，然后又按照之前的进行一次，然后又一次这个触发 ...
  // 如果是 先 next() 在 next('/home'); 先继续当前 再进入到 '/home'， 触发了一次导航，再次进入到这个守卫里面 继续当前的路由（也就是 '/home'），然后又 进入到 '/home'，这个时候没有再触发导航
});

// 全局解析守卫
router.beforeResolve((to, from, next) => {
  // 组件内所有的守卫 异步路由组件被解析完后调用（但是依旧是导航被确认之前调用）
  to;
  from;
  next();
});

// 全局后置钩子
router.afterEach((to, from) => {
  to;
  from;
});

/**
 * 完整的导航解析流程
 * 1. 导航被触发（导航：路由正在发生变化）
 * 2. 在失活的组件里面调用 beforeRouteLeave 守卫
 * 3. 调用全局的 beforeEach 守卫
 * 4. 在重用的组件里面调用 beforeRouteUpdate
 * 5. 在路由配置里调用 beforeEnter
 * 6. 解析异步路由组件
 * 7. 在被激活的组件里面调用 beforeRouteEnter
 * 8. 调用全局的 beforeResolve 守卫
 * 9. 导航被确认
 * 10. 调用全局的 afterEach 钩子
 * 11. 触发 DOM 更新
 * 12. 调用 beforeRouteEnter 守卫中传给 next 的回调函数，创建好的组件实例会作为回调函数的参数输入
 */



export default router;

import { createRouter, createWebHistory } from 'vue-router';
import type { Router, RouteRecordRaw } from 'vue-router';
import { inject } from 'vue';

import HomeView from '@/views/myHome/MyHome.vue';
import ShopCart from '@/views/shopCart/ShopCart.vue';
import GoodsList from '@/views/goods/goodsList/GoodsList.vue';
import GoodsInfo from '@/views/goods/goodsInfo/GoodsInfo.vue';
import Test1 from '@/views/test1/Test1.vue';
import Test1Child1 from '@/views/test1/Test1Child1.vue';
import Test2 from '@/views/test2/Test2.vue';
import Test2Left from '@/views/test2/Test2Left.vue';
const Test2Right = () => import(/* webpackChunkName: "name1" */'@/views/test2/Test2Right.vue'); // 这里会使用懒加载
// 可以定义一个更加复杂的函数，只要返回的是一个 promise 就可以
/**
 * 所有的路由都是不区分大小写的，并且能匹配带有或不带有尾部斜线的路由。例如，路由 /users 将匹配 /users、/users/、甚至 /Users/
 *  strict 为 true，不会匹配到最后的斜线
 * sensitive 为 true，字符大小区分大小写
 */

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'root',
    meta: {
      info: 'root',
    },
    redirect: '/home',
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
    beforeEnter(to, from) { // 路由独享的守卫，还可以是一个数组，每一项是一个函数
      // 注意，不会在 params、query 或 hash 改变时触发
      // debugger
      if (from.name !== 'goodsList') {
        return false;
      }
    }
  },
  {
    path: '/shopCart',
    component: ShopCart,
    name: 'shopCart',
  },
  {
    path: '/test1',
    component: Test1,
    name: 'test1',
    beforeEnter(to, from) {
      // debugger
      // 如果是从其他无关的路由进入到这个路由的子路由（或者直接在浏览器输入这个路由的子路由），那么会在第一次的时候进入这个路由独享守卫，和子路由的独享守卫；但是在切换到其他子路由的时候，不会进入这个独享路由守卫
      // 只有在 从一个不同的 路由导航时，才会被触发
    },
    meta: {
      name1: 'test1'
    },
    children: [
      {
        path: '',
        name: 'test1Child', // 所有的命名路由都应该是独一无二的，如果为多个路由添加相同的名称，那么路由器只会保留最后的一条
        redirect: {
          name: 'test1Child1',
        },
        beforeEnter(to, from) {
          // debugger
        },
      },
      {
        path: 'test1Child1', // 注意，以 / 开头的嵌套路径将被视为根路径，子路由一般都不会在最前面加 /
        component: Test1Child1,
        name: 'test1Child1',
        meta: {
          name2: 'test1Child1',
          // name1: 'test1Child1'
        },
        beforeEnter(to, from) {
          // debugger
        }
      },
      {
        path: 'test1Child2', // 注意，以 / 开头的嵌套路径将被视为根路径，子路由一般都不会在最前面加 /
        component: Test1Child1,
        name: 'test1Child2',
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
  linkActiveClass: 'router-link-active', // 默认的活跃路由的类名
  linkExactActiveClass: 'router-link-exact-active', // 默认的精准活跃路由的类名
  // 还可以 <RouterLink activeClass="" exactActiveClass="" > 进行设置
  history: createWebHistory(),
  routes,
  scrollBehavior(to, form, savedPosition) {
    // 第三个参数只有在点击浏览器的前进或者后退的时候才有效
    debugger
    // return 期望滚动到的位置
  },
});


// 全局前置守卫
// a -> b，b 重定向到 c 的时候，只会触发一次全局前置守卫 to 是 c，from 是 a
router.beforeEach((to, from) => {
  // .matched 会返回整条路由信息，是一数组，/test1/test1Child1 -》 可以获取到对应的 mate 信息，注意这里取到的是没有合并的
  // .meta 会将这个路由上到此为止的每一个 meta 信息进行合并，如果有重复的，子的会覆盖父的
  const provide1 = inject('provide1');
  // debugger
  if (to.name === 'goodsList' && from.name === 'shopCart') {
    // 注意如果是直接修改浏览器地址，from 是 / ，而且获取不到根路径中获取的内容
    // return false; // return false 会中断跳转，不会产生浏览器记录，且不会进入其他的守卫中
    /*  return { // 这里会产生一个浏览器记录，是 from.name -> home 的记录，现在的 to.name 的记录是没有的
       name: 'home',
     }; */
    // return true;
    // 如果是 return true 或者是 undefined 就会继续进入下一个导航守卫
  };
});

// 全局解析守卫，解析守卫刚好会在导航被确认之前、所有组件内守卫和异步路由组件被解析之后调用
// a -> b，b 重定向到 c 的时候，只会执行一次全局解析守卫 to 是 c，from 是 a
router.beforeResolve((to, from) => {
  // 如果是 beforeEach 中 return 过来的，那么 from 是 beforeEach 的 from，而不是 beforeEach 的 to
  const provide1 = inject('provide1');
  // debugger

});

// 全局后置钩子
// a -> b，b 重定向到 c 的时候，只会执行一次全局后置钩子 to 是 c，from 是 a
router.afterEach((to, from) => {
  const provide1 = inject('provide1');
  // debugger
});

// 在导航内的全局注入，可以导航守卫中使用 inject()


// 路由独享的守卫，可以直接在路由上定义的守卫 beforeEnter

// 组件里面的守卫 Test1.vue 中有示例
// beforeRouteEnter
// beforeRouteUpdate
// beforeRouteLeave


/**
 * 完整的导航解析流程：
 * 1.导航被触发。
 * 2.在失活的组件里调用 beforeRouteLeave 守卫。
 * 3.调用全局的 beforeEach 守卫。
 * 4.在重用的组件里调用 beforeRouteUpdate 守卫(2.2+)。
 * 5.在路由配置里调用 beforeEnter。
 * 6.解析异步路由组件。
 * 7.在被激活的组件里调用 beforeRouteEnter。
 * 8.调用全局的 beforeResolve 守卫(2.5+)。
 * 9.导航被确认。
 * 10.调用全局的 afterEach 钩子。
 * 11.触发 DOM 更新。
 * 12.调用 beforeRouteEnter 守卫中传给 next 的回调函数，创建好的组件实例会作为回调函数的参数传入。
 * 
 * 注意 beforeCraete 声明周期钩子都是在 afterEnter 之后执行的
 */

export default router;
import Vue from "vue";
import VueRouter from "vue-router";

import HomeList from "@/views/HomeList.vue";
import TestView from "@/views/TestView.vue";
import TestViewHead from "@/views/TestViewHead.vue";
import TestViewMain from "@/views/TestViewMain.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeList
  },
  {
    path: '/test',
    name: 'test',
    component: TestView,
    children: [
      {
        path: ':compName',
        name: 'testComponent',
        props: {
          head: true,
          main: true,
        },
        components: {
          head: TestViewHead,
          main: TestViewMain,
        }
      }
    ]
  },
];

const router = new VueRouter({
  routes,
});
export default router;
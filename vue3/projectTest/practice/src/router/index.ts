import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw, Router } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: {
      name: 'practiceList',
    },
  },
  {
    path: '/practiceList',
    name: 'practiceList',
    component: () => import('../views/PracticeListView.vue'),
  },
  {
    path: '/practice',
    name: 'practice',
    component: () => import('../views/PracticeDetailView.vue'),
    children: [
      {
        path: 'modelTest',
        name: 'modelTest',
        meta: {
          testInfo: {
            name: 'model',
          },
        },
        component: () => import('../views/modelTest/ModelTestView.vue'),
      },
      {
        path: 'templateRefTest',
        name: 'templateRefTest',
        meta: {
          testInfo: {
            name: 'templateRef',
          },
        },
        component: () =>
          import('../views/templateRefTest/TemplateRefTestView.vue'),
      },
      {
        path: 'slotTest',
        name: 'slotTest',
        meta: {
          testInfo: {
            name: 'slot',
          },
        },
        component: () => import('../views/slotTest/SlotTestView.vue'),
      },
      {
        path: 'JSXTest',
        name: 'JSXTest',
        meta: {
          testInfo: {
            name: 'JSX',
          },
        },
        component: () => import('../views/JSXTest/JSXTestView.vue'),
      },
    ],
  },
];

const router: Router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

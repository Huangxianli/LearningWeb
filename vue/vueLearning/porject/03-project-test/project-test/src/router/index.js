import VueRouter from "vue-router";

import HomeView from "@/views/HomeView.vue";
import DepartmentDashboard from "@/views/DepartmentDashboard.vue";
import PersonalDashboard from "@/views/PersonalDashboard.vue";
import ProjectList from "@/views/ProjectList.vue";
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    children: [
      {
        path: '/departmentDashboard',
        name: 'departmentDashboard',
        components: {
          'right-content': DepartmentDashboard,
        }
      },
      {
        path: '/personalDashboard',
        name: 'personalDashboard',
        components: {
          'right-content': PersonalDashboard,
        }
      },
      {
        path: '/projectList',
        name: 'projectList',
        components: {
          'right-content': ProjectList,
        }
      }

    ]
  }
];

const router = new VueRouter({ routes });

export default router;
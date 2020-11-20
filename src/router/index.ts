import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "Login" */ '../views/Login.vue')
  },
  {
    path: '/analytics',
    name: 'Analytics',
    component: () => import(/* webpackChunkName: "Analytics" */ '../views/Analytics.vue')
  },
  {
    path: '/projects',
    name: 'Projects',
    component: () => import(/* webpackChunkName: "Projects" */ '../views/Projects.vue')
  },
  {
    path: '/templates',
    name: 'Templates',
    component: () => import(/* webpackChunkName: "Templates" */ '../views/Templates.vue')
  },
  {
    path: '/mailing',
    name: 'Mailing',
    component: () => import(/* webpackChunkName: "Mailing" */ '../views/Mailing.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router;

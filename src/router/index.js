import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/dump',
    name: 'dump',
    component: () => import('../views/DumpView.vue')
  },
  {
    path: '/next-contest',
    name: 'next-contest',
    component: () => import('../views/NextContest.vue')
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('../views/TestView.vue')
  },
  {
    path: '/update',
    name: 'test-update',
    component: () => import('../views/TestUpdate.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

import { createRouter, createWebHistory } from 'vue-router'
import SearchPage from '@/pages/SearchPage.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'search', component: SearchPage },
    { path: '/sobre', name: 'about', component: () => import('@/pages/AboutPage.vue') },
    { path: '/contribuir', name: 'contribute', component: () => import('@/pages/ContributePage.vue') },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
  scrollBehavior: () => ({ top: 0 }),
})

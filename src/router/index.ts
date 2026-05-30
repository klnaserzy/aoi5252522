import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/tweet', name: 'tweet', component: () => import('../views/TweetView.vue') },
    { path: '/about', name: 'about', component: () => import('../views/AboutView.vue') },
    { path: '/merch', name: 'merch', component: () => import('../views/MerchView.vue') },
    {
      path: '/location',
      name: 'location',
      component: () => import('../views/LocationView.vue'),
    },
    { path: '/chat', name: 'chat', component: () => import('../views/ChatView.vue') },
    {
      path: '/:catchAll(.*)',
      name: 'NotFound',
      component: () => import('../views/NotFound.vue'),
    },
  ],
})

export default router

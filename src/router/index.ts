import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/all-docs',
      name: 'AllDocs',
      component: () => import("@/components/Docs/all-docs.vue")
    },
    {
      path: '/leafer',
      name: 'Leafer',
      children: [
        {
          path: 'ball',
          name: "ball",
          component: () => import('@/components/Leafer/Ball/ball-index.vue')
        }
      ]
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
})

export default router

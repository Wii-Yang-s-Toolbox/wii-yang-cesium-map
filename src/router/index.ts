import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/home',
      component: () => import('@/layouts/DefaultLayout.vue'),
      children: [
        {
          path: 'home',
          name: 'Home',
          component: () => import('@/views/Home/index.vue'),
        },
      ],
    },
  ],
})

export default router

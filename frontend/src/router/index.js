import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/Profile.vue'),
    meta: { requiresAuth: true }
  },
  // {
  //   path: '/feed',
  //   name: 'Feed',
  //   component: () => import('../views/Feed.vue'),
  //   meta: { requiresAuth: true }
  // },
  // {
  //   path: '/notification',
  //   name: 'Notification',
  //   component: () => import('../views/Notification.vue'),
  //   meta: { requiresAuth: true }
  // },
  // {
  //   path: '/editor',
  //   name: 'Editor',
  //   component: () => import('../views/Editor.vue'),
  //   meta: { requiresAuth: true }
  // }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// router.beforeEach((to, from, next) => {
//   const token = useAuthStore().token // 判断用户是否已登录
//   if (to.matched.some(record => record.meta.requiresAuth) && !token) {
//     next('/login')
//   } else {
//     next()
//   }
// })

export default router

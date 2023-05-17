import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/feed'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/Profile.vue')
    // meta: { requiresAuth: true }
  },
  {
    path: '/feed',
    name: 'Feed',
    component: () => import('../views/Feed.vue')
    // meta: { requiresAuth: true }
  },
  {
    path: '/feed/detail',
    name: 'Detail',
    component: () => import('../views/Detail.vue')
  },
  {
    path: '/notification',
    name: 'Notification',
    component: () => import('../views/Notification.vue')
  },
  {
    path: '/editor',
    name: 'Editor',
    component: () => import('../views/Editor.vue')
  }
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

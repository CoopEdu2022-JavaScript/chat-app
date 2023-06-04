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
  {
    path: '/usersettings',
    name: "UserSettings",
    component: () => import("../views/UserSettings.vue")
  },
  {
    path: '/postblog',
    name: 'PostBlog',
    component: () => import('../views/PostBlog.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/feed',
    name: 'Feed',
    component: () => import('../views/Feed.vue'),
  },
  {
    path: '/likes',
    name: 'Likes',
    component: () => import('../views/Likes.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/replies',
    name: 'Replies',
    component: () => import('../views/Replies.vue')
  },
  {
    path: '/postsnapshot',
    name: 'PostSnapShot',
    component: () => import('../views/PostSnapShot.vue')
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

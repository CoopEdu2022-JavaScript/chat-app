import { createRouter, createWebHashHistory } from 'vue-router'
import { useAuthStore } from '../../store/auth'
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
    component: () => import("../views/UserSettings.vue"),
    meta: { requiresAuth: true }
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
    meta: { requiresAuth: true }
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
    component: () => import('../views/Replies.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/postsnapshot',
    name: 'PostSnapShot',
    component: () => import('../views/PostSnapShot.vue'),
    meta: { requiresAuth: true }
  },
  {
    path:'/post',
    name:'Post',
    component: ()=>import('../components/Post.vue'),
    meta: {requiresAuth:true}
  },
  {
    path:'/comment',
    name:'Comment',
    component:()=>import('../views/Comments.vue'),
    meta: {requiresAuth:true}
  },
  {
    path:'/searchresult',
    name:'Searchresult',
    component:()=>import('../views/searchresult.vue'),
    meta: {requiresAuth:true}
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

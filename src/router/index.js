// src/router/index.js

// 1. 导入必要的函数和组件
import { createRouter, createWebHistory } from 'vue-router'
import { authState } from '../store/auth' // 用于导航守卫判断登录状态

// 导入所有页面（视图）组件
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import LoginView from '../views/LoginView.vue'
import FirebaseSigninView from '@/views/FirebaseSigninView.vue'
import FirebaseRegisterView from '@/views/FirebaseRegisterView.vue'
import AddBookView from '@/views/AddBookView.vue';
import WeatherView from '@/views/WeatherView.vue';
import CountBookAPI from '../views/CountBookAPI.vue';

// 2. 定义所有路由规则
const routes = [
  // 主页 (注册表单)
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  // “关于”页面，需要登录才能访问
  {
    path: '/about',
    name: 'about',
    component: AboutView,
    meta: { requiresAuth: true } // meta字段，用于标记需要认证
  },
  // 我们自己实现的简单登录页
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  // Firebase 登录页
  {
    path: '/FireLogin',
    name: 'FireLogin',
    component: FirebaseSigninView
  },
  // Firebase 注册页
  {
    path: '/FireRegister',
    name: 'FireRegister',
    component: FirebaseRegisterView
  },
  {
    path: '/addbook',
    name: 'AddBook',
    component: AddBookView
  },
  {
    path: '/WeatherCheck',
    name: 'WeatherCheck',
    component: WeatherView
  },
  {
    path: '/CountBookAPI',
    name: 'CountBookAPI',
    component: CountBookAPI
  }
]

// 3. 创建路由实例
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// 4. 创建全局导航守卫 (用于保护需要登录的页面)
router.beforeEach((to, from, next) => {
  // 检查目标路由是否需要认证
  if (to.meta.requiresAuth && !authState.isAuthenticated) {
    // 如果需要认证，但用户未登录，则重定向到我们自己的登录页
    next({ name: 'login' })
  } else {
    // 否则，正常访问
    next()
  }
})

// 5. 导出路由实例
export default router
// src/store/auth.js
import { reactive } from 'vue'

// 创建一个响应式的对象来存储认证状态
export const authState = reactive({
  isAuthenticated: false,
  user: null
})

// 模拟的登录方法
export const authMethods = {
  login(username, password) {
    // 在真实应用中，这里会是API请求
    // 现在，我们使用硬编码的凭据
    if (username === 'user' && password === 'password') {
      authState.isAuthenticated = true
      authState.user = { name: username }
      return true // 登录成功
    }
    return false // 登录失败
  },

  logout() {
    authState.isAuthenticated = false
    authState.user = null
  }
}
<template>
  <header class="d-flex justify-content-center py-3">
    <ul class="nav nav-pills">
      <li class="nav-item">
        <router-link to="/" class="nav-link" active-class="active">Home</router-link>
      </li>
      <li v-if="authState.isAuthenticated" class="nav-item">
        <router-link to="/about" class="nav-link" active-class="active">About</router-link>
      </li>
      <li v-if="!authState.isAuthenticated" class="nav-item">
        <router-link to="/login" class="nav-link" active-class="active">Login</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/FireLogin" class="nav-link" active-class="active">Firebase Login</router-link>
      </li>

      <li class="nav-item">
        <router-link to="/addbook" class="nav-link" active-class="active">Add Book</router-link>
      </li>
      <li v-if="authState.isAuthenticated" class="nav-item">
        <button @click="handleLogout" class="btn btn-link nav-link">Logout</button>
      </li>
      <li class="nav-item">
    <router-link to="/WeatherCheck" class="nav-link" active-class="active">Get Weather</router-link>
  </li>
  <li class="nav-item">
    <router-link to="/CountBookAPI" class="nav-link" active-class="active">Count Book API</router-link>
  </li>
    </ul>
  </header>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { authState, authMethods } from '../store/auth' // 引入认证状态和方法

const router = useRouter()

const handleLogout = () => {
  authMethods.logout()
  router.push('/login') // 退出后跳转到登录页
}
</script>

<style scoped>
/* 让按钮看起来像链接 */
.btn-link {
  text-decoration: none;
}
</style>
<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">Login</div>
          <div class="card-body">
            <form @submit.prevent="handleLogin">
              <div class="mb-3">
                <label for="username" class="form-label">Username</label>
                <input type="text" class="form-control" id="username" v-model="username" />
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="password" class="form-control" id="password" v-model="password" />
              </div>
              <p v-if="errorMsg" class="text-danger">{{ errorMsg }}</p>
              <button type="submit" class="btn btn-primary">Login</button>
            </form>
          </div>
        </div>
        <p class="mt-3 text-center text-muted">Hint: username is 'user', password is 'password'</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { authMethods } from '../store/auth' // 引入我们创建的 auth 方法

const username = ref('')
const password = ref('')
const errorMsg = ref(null)

const router = useRouter()

const handleLogin = () => {
  const success = authMethods.login(username.value, password.value)
  if (success) {
    // 登录成功，跳转到 'About' 页面或主页
    router.push('/about')
  } else {
    // 登录失败，显示错误信息
    errorMsg.value = 'Invalid username or password.'
  }
}
</script>
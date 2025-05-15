<template>
  <div class="col-md-5 login-right">
    <div class="login-box">
      <div class="mb-4">
        <h3 class="text-pixel">Hi, Welcome Back👋</h3>
        <p>Please Enter Your Account Details</p>
      </div>
      <div v-if="alertMessage" :class="['alert', 'alert-' + alertType]" role="alert">
        <i :class="['fa-solid', ico]" class="me-2"></i>{{ alertMessage }}
      </div>
      <form @submit.prevent="handleLogin">
        <div class="form-floating mb-4">
          <input
            type="text"
            class="form-control"
            :class="{ 'form-control-alert': usernameError }"
            id="floatingUsername"
            placeholder="Username"
            v-model="username"
          />
          <label for="floatingEmail">Username</label>
        </div>
        <div class="form-floating mb-4 position-relative">
          <input
            :type="showPassword ? 'text' : 'password'"
            class="form-control"
            :class="{ 'form-control-alert': passwordError }"
            id="floatingPassword"
            placeholder="Password"
            v-model="password"
          />
          <label for="floatingPassword">Password</label>
          <span
            class="position-absolute top-50 end-0 translate-middle-y me-3"
            style="cursor: pointer"
          >
            <i
              class="fa-solid"
              :class="showPassword ? 'fa-eye-slash' : 'fa-eye'"
              @click="togglePassword"
              style="
                position: absolute;
                top: 50%;
                right: 20px;
                transform: translateY(-50%);
                cursor: pointer;
              "
            >
            </i>
          </span>
        </div>
        <div class="d-flex justify-content-between align-items-center mb-4">
          <div class="form-check">
            <input class="form-check-input" type="checkbox" id="rememberMe" v-model="rememberMe" />
            <label class="form-check-label" for="rememberMe"> Remember me </label>
          </div>
          <!-- <a href="#" class="text-decoration-none">Forgot password?</a> -->
        </div>
        <div class="d-grid">
          <button type="submit" class="btn btn-primary">Log In</button>
        </div>
        <p class="text-center mt-4">
          Don't have an account?
          <!-- <a href="/signup" class="text-decoration-none"> -->
          <router-link to="/auth/signup" style="text-decoration: none"> Sign up </router-link>
          <!-- </a> -->
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()
const username = ref('')
const password = ref('')
const rememberMe = ref(false)
const showPassword = ref(false)
const usernameError = ref(false)
const passwordError = ref(false)

const alertMessage = ref('')
const alertType = ref('')
const ico = ref('')

const togglePassword = () => {
  showPassword.value = !showPassword.value
}
const handleLogin = async () => {
  // Reset error
  usernameError.value = !username.value
  passwordError.value = !password.value

  if (usernameError.value || passwordError.value) return

  try {
    // const response = await axios.post('http://localhost:8086/api/auth/signin', {
    const response = await axios.post('http://34.41.43.239:8086/api/auth/signin', {
      username: username.value,
      password: password.value,
    })

    const { status, message, payload } = response.data
    console.log('✅ Login Success:', message)
    console.log('✅ status:', status)
    console.log('📦 Payload:', payload)

    if (status === '200 OK' && payload) {
      alertType.value = 'success'
      alertMessage.value = message
      ico.value = 'fa-circle-check'

      // Simpan token & username
      localStorage.setItem('token', payload.token)
      localStorage.setItem('loggedInUser', payload.username)
      localStorage.setItem('roles', payload.role)
      localStorage.setItem('api', payload.apiKey)

      if (rememberMe.value) {
        localStorage.setItem('username', username.value)
        // localStorage.setItem('password', password.value)
      } else {
        localStorage.removeItem('username')
        localStorage.removeItem('password')
      }

      // Optional: redirect ke halaman lain
      router.push('/dashboard/monitor')
    } else {
      alertType.value = 'warning'
      alertMessage.value = 'check username or password' || 'Login gagal.'
      ico.value = 'fa-triangle-exclamation'
    }
  } catch (error) {
    console.error('Login Error:', error)
    if (error.response && error.response.data) {
      alertType.value = 'danger'
      alertMessage.value = error.response.data.message || 'Login failed.'
      ico.value = 'fa-circle-xmark'
    } else {
      alertType.value = 'danger'
      alertMessage.value = 'Network or server error.'
      ico.value = 'fa-circle-xmark'
    }
  }
}

onMounted(() => {
  const savedEmail = localStorage.getItem('email')
  const savedPassword = localStorage.getItem('password')

  if (savedEmail && savedPassword) {
    email.value = savedEmail
    password.value = savedPassword
    rememberMe.value = true
  }
})
</script>

<style scoped>
.form-control:focus {
  border-bottom: 3px solid #4f46e5;
  box-shadow: none;
}

.form-control-alert {
  border-bottom: 3px solid #e54646;
  box-shadow: none;
}

.btn-primary {
  background-color: #0d6efd;
  border: none;
  padding: 10px 20px;
}

.btn-primary:hover {
  background-color: #4edb81;
}
</style>

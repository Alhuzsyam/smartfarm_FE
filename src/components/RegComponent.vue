<template>
  <div class="col-md-5 login-right">
    <div class="login-box">
      <div class="mb-4">
        <h3 class="text-pixel">It's, Sign Up Form 📝</h3>
        <p>Please Enter Your Account Details</p>
      </div>
      <form @submit.prevent="handleRegist">
        <div v-if="alertMessage" :class="['alert', 'alert-' + alertType]" role="alert">
          <i :class="['fa-solid', ico]" class="me-2"></i>{{ alertMessage }}
        </div>

        <!-- Username -->
        <div class="form-floating mb-4">
          <input
            type="text"
            class="form-control"
            :class="{ 'form-control-alert': usernameError }"
            placeholder="Username"
            id="floatingUsername"
            v-model="username"
          />
          <label for="floatingUsername">Username</label>
        </div>

        <!-- Password -->
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
              style="right: 20px"
            ></i>
          </span>
          <small class="text-warning" :class="showError ? 'd-inline' : 'd-none'">
            Password min 8 karakter
          </small>
        </div>

        <!-- Role -->
        <div class="form-floating mb-4">
          <select
            class="form-select"
            id="floatingRole"
            v-model="role"
            :class="{ 'form-control-alert': roleError }"
          >
            <option disabled value="">Choose Role</option>
            <option value="watering">watering</option>
            <option value="fertilization">fertilization</option>
          </select>
          <label for="floatingRole">Role</label>
        </div>

        <div class="d-grid">
          <button type="submit" class="btn btn-primary">Sign Up</button>
        </div>

        <p class="text-center mt-4">
          Already have an account?
          <router-link to="/auth/login" class="text-decoration-none"> Login </router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const username = ref('')
const password = ref('')
const role = ref('')

const showPassword = ref(false)
const usernameError = ref(false)
const passwordError = ref(false)
const roleError = ref(false)
const showError = ref(false)

const alertMessage = ref('')
const alertType = ref('')
const ico = ref('')

const togglePassword = () => {
  showPassword.value = !showPassword.value
}

const handleRegist = async () => {
  usernameError.value = !username.value
  passwordError.value = !password.value
  roleError.value = !role.value

  if (usernameError.value || passwordError.value || roleError.value) return

  if (password.value.length < 8) {
    showError.value = true
    return
  }

  showError.value = false

  try {
    // const response = await axios.post('http://localhost:8086/api/auth/signup', {
    const response = await axios.post('http://34.41.43.239:8086/api/auth/signup', {
      username: username.value,
      password: password.value,
      roles: role.value,
    })

    if (response.data.status === '200 OK') {
      alertType.value = 'success'
      alertMessage.value = response.data.message
      ico.value = 'fa-circle-check'
    } else {
      alertType.value = 'warning'
      alertMessage.value = response.data.message
      ico.value = 'fa-triangle-exclamation'
    }

    username.value = ''
    password.value = ''
    role.value = ''
  } catch (error) {
    alertType.value = 'danger'
    if (error.response) {
      alertMessage.value = error.response.data.message || 'Register failed.'
      ico.value = 'fa-circle-xmark'
    } else {
      alertMessage.value = 'Network or server error.'
    }
  }
}
</script>

<style scoped>
.form-control:focus,
.form-select:focus {
  border-bottom: 3px solid #4f46e5;
  box-shadow: none;
}

.form-control-alert,
.form-select.form-control-alert {
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

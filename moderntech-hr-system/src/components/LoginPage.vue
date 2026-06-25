<script setup>
import { ref, computed } from 'vue'

const username = ref('')
const password = ref('')
const errors = ref({ username: '', password: '' })
const showPassword = ref(false)
const loginError = ref('')

const isFormValid = computed(() => {
  return username.value.trim().length > 0 && password.value.trim().length > 0
})

const emit = defineEmits(['login-success'])

function validateField(field) {
  if (field === 'username') {
    errors.value.username = username.value.trim() ? '' : 'Username is required'
  }
  if (field === 'password') {
    errors.value.password = password.value.trim() ? '' : 'Password is required'
  }
}

function handleLogin() {
  validateField('username')
  validateField('password')

  if (!isFormValid.value) {
    loginError.value = 'Please fill in all fields'
    return
  }

  if (username.value === 'admin' && password.value === 'admin123') {
    loginError.value = ''
    emit('login-success')
  } else {
    loginError.value = 'Invalid username or password'
  }
}
</script>

<template>
  <div class="d-flex align-items-center justify-content-center min-vh-100 bg-light">
    <div class="card shadow" style="max-width: 420px; width: 100%;">
      <div class="card-body p-4">
        <div class="text-center mb-4">
          <h3 class="card-title mb-1">ModernTech Solutions</h3>
          <p class="text-muted mb-0">HR Management System</p>
        </div>

        <div v-if="loginError" class="alert alert-danger py-2">{{ loginError }}</div>

        <form @submit.prevent="handleLogin" novalidate>
          <div class="mb-3">
            <label for="username" class="form-label">Username</label>
            <input
              id="username"
              v-model="username"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors.username }"
              placeholder="Enter username"
              @blur="validateField('username')"
            />
            <div class="invalid-feedback">{{ errors.username }}</div>
          </div>

          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <div class="input-group">
              <input
                id="password"
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                class="form-control"
                :class="{ 'is-invalid': errors.password }"
                placeholder="Enter password"
                @blur="validateField('password')"
              />
              <button class="btn btn-outline-secondary" type="button" @click="showPassword = !showPassword">
                {{ showPassword ? 'Hide' : 'Show' }}
              </button>
              <div class="invalid-feedback">{{ errors.password }}</div>
            </div>
          </div>

          <div class="d-grid">
            <button type="submit" class="btn btn-primary btn-lg">Sign In</button>
          </div>
        </form>

        <div class="mt-3 text-center">
          <small class="text-muted">
            Demo credentials: <strong>admin</strong> / <strong>admin123</strong>
          </small>
        </div>
      </div>
    </div>
  </div>
</template>

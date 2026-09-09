<script setup lang="ts">
import {ref} from 'vue'
import {useRouter} from 'vue-router'
import axios from 'axios'

const router = useRouter()

const username = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

const handleLogin = async () => {
  try {
    error.value = ''
    loading.value = true

    const response = await axios.post(
        'http://localhost:8080/api/auth/login',
        {
          username: username.value,
          password: password.value
        }
    )

    // JWT tokenni saqlaymiz
    localStorage.setItem('token', response.data.token)

    // Home sahifaga o'tamiz
    await router.push('/home')

  } catch (e) {
    console.error('Login failed:', e)

    error.value = 'Login yoki parol noto‘g‘ri'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="login-page">

    <div class="login-card">

      <div class="login-header">
        <h1>Kirish</h1>
        <p>Hisobingizga kiring</p>
      </div>

      <form @submit.prevent="handleLogin">

        <p v-if="error" class="error-message">
          {{ error }}
        </p>

        <div class="form-group">
          <label for="username">
            Login
          </label>

          <input
              id="username"
              v-model="username"
              type="text"
              placeholder="Loginni kiriting"
              autocomplete="username"
              required
          />
        </div>

        <div class="form-group">
          <label for="password">
            Parol
          </label>

          <input
              id="password"
              v-model="password"
              type="password"
              placeholder="Parolni kiriting"
              autocomplete="current-password"
              required
          />
        </div>

        <button
            type="submit"
            class="login-button"
            :disabled="loading"
        >
          {{ loading ? 'Kutilmoqda...' : 'Kirish' }}
        </button>

      </form>

      <div class="register-link">
        <span>Hisobingiz yo‘qmi?</span>

        <button @click="router.push('/register')">
          Ro‘yxatdan o‘tish
        </button>
      </div>

    </div>

  </div>
</template>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f4f6f9;
  padding: 20px;
}

.login-card {
  width: 100%;
  max-width: 400px;
  background: white;
  padding: 35px;
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
}

.login-header {
  text-align: center;
  margin-bottom: 30px;
}

.login-header h1 {
  margin: 0 0 8px;
  font-size: 28px;
  color: #1f2937;
}

.login-header p {
  margin: 0;
  color: #6b7280;
  font-size: 14px;
}

.form-group {
  margin-bottom: 18px;
}

.form-group label {
  display: block;
  margin-bottom: 7px;
  font-size: 14px;
  font-weight: 600;
  color: #374151;
}

.form-group input {
  width: 100%;
  height: 44px;
  box-sizing: border-box;
  padding: 0 13px;

  border: 1px solid #d1d5db;
  border-radius: 7px;

  outline: none;
  font-size: 14px;

  transition: 0.2s;
}

.form-group input:focus {
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.form-group input::placeholder {
  color: #9ca3af;
}

.error-message {
  margin: 0 0 15px;
  padding: 10px 12px;

  border-radius: 6px;

  background: #fee2e2;
  color: #dc2626;

  font-size: 14px;
}

.login-button {
  width: 100%;
  height: 45px;

  border: none;
  border-radius: 7px;

  background: #2563eb;
  color: white;

  font-size: 15px;
  font-weight: 600;

  cursor: pointer;
  transition: 0.2s;
}

.login-button:hover {
  background: #1d4ed8;
}

.login-button:active {
  transform: scale(0.99);
}

.login-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.register-link {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;

  margin-top: 22px;

  font-size: 14px;
  color: #6b7280;
}

.register-link button {
  border: none;
  background: transparent;

  color: #2563eb;
  font-weight: 600;

  cursor: pointer;
}

.register-link button:hover {
  text-decoration: underline;
}
</style>
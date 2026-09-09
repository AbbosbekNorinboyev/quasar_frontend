<script setup lang="ts">
import {ref} from 'vue'
import {register} from "@/service/userService.ts"
import {useRouter} from 'vue-router'

const router = useRouter()

const fullName = ref('')
const phoneNumber = ref('')
const email = ref('')
const username = ref('')
const password = ref('')
const birthDate = ref('')
const errorMessage = ref('')

const handleRegister = async () => {
  errorMessage.value = ''

  try {
    await register({
      fullName: fullName.value,
      phoneNumber: phoneNumber.value,
      email: email.value,
      username: username.value,
      password: password.value,
      birthDate: birthDate.value,
    })

    await router.push('/login')
  } catch (error: unknown) {
    errorMessage.value = error instanceof Error
      ? error.message
      : 'Ro‘yxatdan o‘tishda xatolik yuz berdi'
  }
}
</script>

<template>
  <div class="register-page">
    <div class="register-card">

      <div class="register-header">
        <h1>Ro‘yxatdan o‘tish</h1>
        <p>Yangi hisob yaratish</p>
      </div>

      <form @submit.prevent="handleRegister">

        <div class="form-group">
          <label>To‘liq ism</label>
          <input
              v-model="fullName"
              type="text"
              placeholder="Ism Familiya"
              required
          />
        </div>

        <div class="form-group">
          <label>Telefon raqam</label>
          <input
              v-model="phoneNumber"
              type="text"
              placeholder="+998901234567"
              required
          />
        </div>

        <div class="form-group">
          <label>Email</label>
          <input
              v-model="email"
              type="text"
              placeholder="email@gmail.com"
              required
          />
        </div>

        <div class="form-group">
          <label>Username</label>
          <input
              v-model="username"
              type="text"
              placeholder="username"
              required
          />
        </div>

        <div class="form-group">
          <label>Parol</label>
          <input
              v-model="password"
              type="password"
              placeholder="********"
              required
          />
        </div>

        <div class="form-group">
          <label>Tug‘ilgan sana</label>
          <input
              v-model="birthDate"
              type="date"
              required
          />
        </div>

        <button type="submit" class="register-button">
          Ro‘yxatdan o‘tish
        </button>

        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      </form>

      <div class="login-link">
        <span>Hisobingiz bormi?</span>
        <button @click="router.push('/login')">
          Login
        </button>
      </div>

    </div>
  </div>
</template>

<style scoped>
.register-page {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f4f6f9;
  padding: 20px;
}

.register-card {
  width: 100%;
  max-width: 450px;
  background: white;
  padding: 35px;
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
}

.register-header {
  text-align: center;
  margin-bottom: 30px;
}

.register-header h1 {
  margin: 0 0 8px;
  font-size: 28px;
  color: #1f2937;
}

.register-header p {
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
  box-sizing: border-box;
  height: 44px;
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

/* Rolelarni tanlang */
.roles-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 12px;
  border: 1px solid #d1d5db;
  border-radius: 7px;
}

.role-item {
  display: flex !important;
  align-items: center;
  gap: 8px;
  margin: 0 !important;
  font-weight: 400 !important;
  cursor: pointer;
}

.role-item input {
  width: auto;
  height: auto;
  cursor: pointer;
}

.role-item span {
  font-size: 14px;
  color: #374151;
}

.register-button {
  width: 100%;
  height: 45px;
  margin-top: 8px;
  border: none;
  border-radius: 7px;
  background: #2563eb;
  color: white;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.2s;
}

.register-button:hover {
  background: #1d4ed8;
}

.register-button:active {
  transform: scale(0.99);
}

.error-message {
  margin: 12px 0 0;
  color: #dc2626;
  font-size: 14px;
  text-align: center;
}

.login-link {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  margin-top: 22px;
  font-size: 14px;
  color: #6b7280;
}

.login-link button {
  border: none;
  background: transparent;
  color: #2563eb;
  font-weight: 600;
  cursor: pointer;
}

.login-link button:hover {
  text-decoration: underline;
}
</style>
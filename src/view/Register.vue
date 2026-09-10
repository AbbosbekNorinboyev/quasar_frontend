<script setup lang="ts">
import {ref} from 'vue'
import {useRouter} from 'vue-router'
import {matEmail, matLock, matPerson, matPhone} from '@quasar/extras/material-icons'
import {getErrorMessage, register} from '@/service/authService'

const router = useRouter()
const form = ref({
  fullName: '',
  phoneNumber: '',
  email: '',
  username: '',
  password: '',
  confirmPassword: '',
  birthDate: '',
})
const loading = ref(false)
const errorMessage = ref('')
const showPassword = ref(false)

const submit = async () => {
  errorMessage.value = ''
  loading.value = true

  try {
    await register({
      fullName: form.value.fullName.trim(),
      phoneNumber: form.value.phoneNumber.trim(),
      email: form.value.email.trim(),
      username: form.value.username.trim(),
      password: form.value.password,
      birthDate: form.value.birthDate,
    })
    await router.replace({path: '/login', query: {registered: '1'}})
  } catch (error) {
    errorMessage.value = getErrorMessage(error, 'Ro‘yxatdan o‘tish amalga oshmadi.')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <q-page class="auth-page">
    <q-card class="auth-card" flat bordered>
      <q-card-section class="text-center q-pb-none">
        <q-avatar color="primary" text-color="white" size="56px">
          <q-icon :name="matPerson" size="30px"/>
        </q-avatar>
        <div class="text-h5 text-weight-bold q-mt-md">Ro‘yxatdan o‘tish</div>
        <div class="text-body2 text-grey-7 q-mt-xs">Yangi admin hisobini yarating</div>
      </q-card-section>

      <q-card-section>
        <q-banner v-if="errorMessage" rounded class="bg-red-1 text-negative q-mb-md">
          {{ errorMessage }}
        </q-banner>

        <q-form class="q-gutter-sm" @submit.prevent="submit">
          <q-input v-model="form.fullName" outlined label="To‘liq ism" :rules="[(v) => !!v || 'Ism kiriting']"/>
          <q-input v-model="form.username" outlined label="Username" autocomplete="username" :rules="[(v) => !!v || 'Username kiriting']"/>
          <q-input v-model="form.email" outlined label="Email" type="email" autocomplete="email" :rules="[(v) => !!v || 'Email kiriting']">
            <template #prepend><q-icon :name="matEmail"/></template>
          </q-input>
          <q-input v-model="form.phoneNumber" outlined label="Telefon raqami" :rules="[(v) => !!v || 'Telefon kiriting']">
            <template #prepend><q-icon :name="matPhone"/></template>
          </q-input>
          <q-input v-model="form.birthDate" outlined label="Tug‘ilgan sana" type="date"/>
          <q-input
            v-model="form.password"
            outlined
            label="Parol"
            :type="showPassword ? 'text' : 'password'"
            autocomplete="new-password"
            :rules="[(v) => v.length >= 8 || 'Parol kamida 8 belgidan iborat bo‘lsin']"
          >
            <template #prepend><q-icon :name="matLock"/></template>
            <template #append>
              <q-icon :name="showPassword ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="showPassword = !showPassword"/>
            </template>
          </q-input>
          <q-input
            v-model="form.confirmPassword"
            outlined
            label="Parolni tasdiqlang"
            type="password"
            :rules="[(v) => v === form.password || 'Parollar mos emas']"
          />

          <q-btn type="submit" color="primary" label="Hisob yaratish" class="full-width q-mt-md" size="lg" :loading="loading"/>
        </q-form>
      </q-card-section>

      <q-card-section class="text-center text-body2">
        Hisobingiz bormi?
        <q-btn flat dense no-caps color="primary" label="Kirish" to="/login"/>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<style scoped>
.auth-page {
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 24px;
  background: #f5f7fb;
}

.auth-card {
  width: min(100%, 520px);
}
</style>

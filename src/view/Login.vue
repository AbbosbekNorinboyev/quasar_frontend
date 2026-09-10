<script setup lang="ts">
import {ref} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import {matLock, matPerson} from '@quasar/extras/material-icons'
import {getErrorMessage, login} from '@/service/authService'

const router = useRouter()
const route = useRoute()
const username = ref('')
const password = ref('')
const loading = ref(false)
const errorMessage = ref('')
const showPassword = ref(false)

const submit = async () => {
  errorMessage.value = ''
  loading.value = true

  try {
    await login({username: username.value.trim(), password: password.value})
    await router.replace('/dashboard')
  } catch (error) {
    errorMessage.value = getErrorMessage(error, 'Login amalga oshmadi. Maʼlumotlarni tekshiring.')
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
          <q-icon :name="matLock" size="30px"/>
        </q-avatar>
        <div class="text-h5 text-weight-bold q-mt-md">Xush kelibsiz</div>
        <div class="text-body2 text-grey-7 q-mt-xs">Admin panelga kirish</div>
      </q-card-section>

      <q-card-section>
        <q-banner v-if="route.query.registered" rounded class="bg-green-1 text-positive q-mb-md">
          Hisob muvaffaqiyatli yaratildi. Endi tizimga kiring.
        </q-banner>
        <q-banner v-if="errorMessage" rounded class="bg-red-1 text-negative q-mb-md">
          {{ errorMessage }}
        </q-banner>

        <q-form class="q-gutter-md" @submit.prevent="submit">
          <q-input
            v-model="username"
            outlined
            label="Username"
            autocomplete="username"
            :rules="[(value) => !!value || 'Username kiriting']"
          >
            <template #prepend><q-icon :name="matPerson"/></template>
          </q-input>

          <q-input
            v-model="password"
            outlined
            label="Parol"
            :type="showPassword ? 'text' : 'password'"
            autocomplete="current-password"
            :rules="[(value) => !!value || 'Parol kiriting']"
          >
            <template #prepend><q-icon :name="matLock"/></template>
            <template #append>
              <q-icon
                :name="showPassword ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="showPassword = !showPassword"
              />
            </template>
          </q-input>

          <q-btn type="submit" color="primary" label="Kirish" class="full-width" size="lg" :loading="loading"/>
        </q-form>
      </q-card-section>

      <q-card-section class="text-center text-body2">
        Hisobingiz yo‘qmi?
        <q-btn flat dense no-caps color="primary" label="Ro‘yxatdan o‘tish" to="/register"/>
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
  width: min(100%, 440px);
}
</style>

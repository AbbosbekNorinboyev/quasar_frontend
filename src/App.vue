<script setup lang="ts">
import {computed, onMounted, ref, watch} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import {
  matAdminPanelSettings,
  matDashboard,
  matMenu,
  matNotificationsNone,
  matPeople,
  matSettings,
} from '@quasar/extras/material-icons'
import {authState, getMe, isAuthenticated, logout} from '@/service/authService'

const leftDrawerOpen = ref(true)
const route = useRoute()
const router = useRouter()

const signOut = async () => {
  logout()
  await router.replace('/login')
}

const loadCurrentUser = async () => {
  if (route.meta.public || !isAuthenticated()) {
    return
  }

  try {
    await getMe()
  } catch (error) {
    console.error('Foydalanuvchi maʼlumotlarini yuklashda xatolik:', error)
  }
}

onMounted(loadCurrentUser)
watch(() => route.meta.public, loadCurrentUser)

const userInitials = computed(() => {
  const fullName =
    authState.user?.fullName ||
    authState.user?.name ||
    ''

  const parts = fullName.trim().split(/\s+/)

  if (!fullName.trim()) {
    return 'U'
  }

  const firstName = parts[0]?.charAt(0) ?? ''

  const lastName =
    parts.length > 1
      ? parts[parts.length - 1]?.charAt(0) ?? ''
      : ''

  return `${firstName}${lastName}`.toUpperCase()
})
</script>

<template>
  <q-layout v-if="route.meta.public" view="lHh Lpr lFf">
    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>

  <q-layout v-else view="lHh Lpr lFf">

    <!-- HEADER -->
    <q-header elevated class="bg-white text-dark">
      <q-toolbar>

        <q-btn
            flat
            dense
            round
            :icon="matMenu"
            aria-label="Menu"
            @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title class="text-weight-bold">
          Admin Panel
        </q-toolbar-title>

        <q-btn
            flat
            round
            :icon="matNotificationsNone"
        />

        <q-btn
            flat
            round
            :icon="matSettings"
            to="/settings"
        />

        <q-btn
            flat
            round
            icon="logout"
            @click="signOut"
        >
          <q-tooltip>Chiqish</q-tooltip>
        </q-btn>

      </q-toolbar>
    </q-header>


    <!-- SIDEBAR -->
    <q-drawer
        v-model="leftDrawerOpen"
        show-if-above
        bordered
        :width="260"
    >

      <q-list padding>

        <!-- LOGO -->
        <q-item class="q-mb-md">

          <q-item-section avatar>
            <q-avatar color="primary" text-color="white">
              {{ userInitials }}
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-weight-bold">
              {{ authState.user?.fullName || authState.user?.name || 'Foydalanuvchi' }}
            </q-item-label>

            <q-item-label caption>
              {{ authState.user?.role || 'User' }}
            </q-item-label>
          </q-item-section>

        </q-item>

        <q-separator class="q-mb-md"/>


        <!-- DASHBOARD -->
        <q-item
            clickable
            v-ripple
            to="/dashboard"
            exact
        >
          <q-item-section avatar>
            <q-icon :name="matDashboard"/>
          </q-item-section>

          <q-item-section>
            Dashboard
          </q-item-section>
        </q-item>


        <!-- USERS -->
        <q-item
            clickable
            v-ripple
            to="/users"
        >
          <q-item-section avatar>
            <q-icon :name="matPeople"/>
          </q-item-section>

          <q-item-section>
            Users
          </q-item-section>
        </q-item>


        <!-- ROLES -->
        <q-item
            clickable
            v-ripple
            to="/roles"
        >
          <q-item-section avatar>
            <q-icon :name="matAdminPanelSettings"/>
          </q-item-section>

          <q-item-section>
            Roles
          </q-item-section>
        </q-item>

      </q-list>

    </q-drawer>


    <!-- CONTENT -->
    <q-page-container>
      <router-view/>
    </q-page-container>

  </q-layout>
</template>
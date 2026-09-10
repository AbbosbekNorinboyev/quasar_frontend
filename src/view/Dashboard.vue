<script setup lang="ts">
import {computed, onMounted, ref} from 'vue'
import {
  matBadge,
  matHowToReg,
  matMailOutline,
  matPeople,
  matSchedule,
  matShield,
  matTrendingUp,
} from '@quasar/extras/material-icons'
import {getUsers} from '@/service/userService.ts'
import {getRoles} from '@/service/roleService.ts'

type User = {
  id: number
  fullName: string
  phoneNumber: string
  email: string
  username: string
  birthDate: string
  status: string
  createdAt: string
  updatedAt: string
}

const users = ref<User[]>([])
const usersLoading = ref(false)
const totalUsers = ref(0)
const activeUsers = computed(() =>
  users.value.filter((user) => user.status?.toUpperCase() === 'ACTIVE').length
)
const pendingInvites = computed(() =>
  users.value.filter((user) => {
    const status = user.status?.toUpperCase()
    return status === 'PENDING'
  }).length
)

const getUserInitials = (fullName?: string): string => {
  const parts = fullName?.trim().split(/\s+/).filter(Boolean) ?? []

  if (parts.length === 0) {
    return 'U'
  }

  const firstInitial = parts[0]?.charAt(0) ?? ''
  const lastInitial = parts.length > 1
    ? parts[parts.length - 1]?.charAt(0) ?? ''
    : ''

  return `${firstInitial}${lastInitial}`.toUpperCase()
}

const loadUsers = async () => {
  usersLoading.value = true

  try {
    const response = await getUsers()

    users.value = response.data.data
    totalUsers.value = response.data.elements
  } catch (error) {
    console.error('Users yuklashda xatolik:', error)
  } finally {
    usersLoading.value = false
  }
}

type Role = {
  id: number
  name: string
  status: string
  createdAt: string
  updatedAt: string
}

const roles = ref<Role[]>([])
const rolesLoading = ref(false)
const totalRoles = ref(0)

const loadRoles = async () => {
  rolesLoading.value = true

  try {
    const response = await getRoles()

    roles.value = response.data.data
    totalRoles.value = response.data.elements
  } catch (error) {
    console.error('Roles yuklashda xatolik:', error)
  } finally {
    rolesLoading.value = false
  }
}

onMounted(() => {
  loadUsers()
  loadRoles()
})
</script>

<template>
  <q-page class="q-pa-lg page-background">
    <div class="content-wrapper">

      <!-- Page heading -->
      <div class="page-heading q-mb-lg">
        <div class="text-h4 text-weight-bold">
          Dashboard
        </div>

        <div class="text-body2 text-grey-7 q-mt-xs">
          Manage your users and access permissions from one place.
        </div>
      </div>

      <!-- Statistics -->
      <div class="row q-col-gutter-md q-mb-lg">

        <!-- Total users -->
        <div class="col-12 col-sm-6 col-md-3">
          <q-card flat bordered class="stat-card">
            <q-card-section>
              <div class="row items-start justify-between">
                <div>
                  <div class="text-caption text-grey-7">
                    Total users
                  </div>

                  <div class="text-h4 text-weight-bold q-mt-sm">
                    {{ totalUsers }}
                  </div>

                  <div class="text-caption text-positive q-mt-sm">
                    <q-icon :name="matTrendingUp"/>
                    12% this month
                  </div>
                </div>

                <q-avatar
                    color="blue-1"
                    text-color="primary"
                    :icon="matPeople"
                />
              </div>
            </q-card-section>
          </q-card>
        </div>

        <!-- Active users -->
        <div class="col-12 col-sm-6 col-md-3">
          <q-card flat bordered class="stat-card">
            <q-card-section>
              <div class="row items-start justify-between">
                <div>
                  <div class="text-caption text-grey-7">
                    Active users
                  </div>

                  <div class="text-h4 text-weight-bold q-mt-sm">
                    {{ activeUsers }}
                  </div>

                  <div class="text-caption text-positive q-mt-sm">
                    <q-icon :name="matTrendingUp"/>
                    8% this month
                  </div>
                </div>

                <q-avatar
                    color="green-1"
                    text-color="positive"
                    :icon="matHowToReg"
                />
              </div>
            </q-card-section>
          </q-card>
        </div>

        <!-- Total roles -->
        <div class="col-12 col-sm-6 col-md-3">
          <q-card flat bordered class="stat-card">
            <q-card-section>
              <div class="row items-start justify-between">
                <div>
                  <div class="text-caption text-grey-7">
                    Total roles
                  </div>

                  <div class="text-h4 text-weight-bold q-mt-sm">
                    {{ totalRoles }}
                  </div>

                  <div class="text-caption text-grey-6 q-mt-sm">
                    2 custom roles
                  </div>
                </div>

                <q-avatar
                    color="purple-1"
                    text-color="deep-purple"
                    :icon="matBadge"
                />
              </div>
            </q-card-section>
          </q-card>
        </div>

        <!-- Pending invites -->
        <div class="col-12 col-sm-6 col-md-3">
          <q-card flat bordered class="stat-card">
            <q-card-section>
              <div class="row items-start justify-between">
                <div>
                  <div class="text-caption text-grey-7">
                    Pending invites
                  </div>

                  <div class="text-h4 text-weight-bold q-mt-sm">
                    {{ pendingInvites }}
                  </div>

                  <div class="text-caption text-warning q-mt-sm">
                    <q-icon :name="matSchedule"/>
                    Needs attention
                  </div>
                </div>

                <q-avatar
                    color="orange-1"
                    text-color="orange-8"
                    :icon="matMailOutline"
                />
              </div>
            </q-card-section>
          </q-card>
        </div>

      </div>

      <!-- Recent users + Roles overview -->
      <div class="row q-col-gutter-lg">

        <!-- Recent users -->
        <div class="col-12 col-lg-7">
          <q-card flat bordered>

            <q-card-section class="row items-center justify-between">
              <div>
                <div class="text-h6 text-weight-bold">
                  Recent users
                </div>

                <div class="text-caption text-grey-6 q-mt-xs">
                  Latest users added to the system
                </div>
              </div>

              <q-btn
                  flat
                  color="primary"
                  label="View all"
                  no-caps
                  to="/users"
              />
            </q-card-section>

            <q-separator/>

            <!-- Loading -->
            <div
                v-if="usersLoading"
                class="row justify-center q-pa-lg"
            >
              <q-spinner
                  color="primary"
                  size="30px"
              />
            </div>

            <!-- Users -->
            <q-list
                v-else
                separator
            >
              <q-item
                  v-for="user in users.slice(0, 3)"
                  :key="user.id"
                  class="q-py-md"
              >

                <!-- Avatar -->
                <q-item-section avatar>
                  <q-avatar
                      color="primary"
                      text-color="white"
                  >
                    {{ getUserInitials(user.fullName) }}
                  </q-avatar>
                </q-item-section>

                <!-- User info -->
                <q-item-section>
                  <q-item-label class="text-weight-medium">
                    {{ user.fullName }}
                  </q-item-label>

                  <q-item-label caption>
                    {{ user.email }}
                  </q-item-label>
                </q-item-section>

                <!-- Status -->
                <q-item-section side>
                  <q-chip
                      dense
                      :color="
                user.status === 'ACTIVE'
                  ? 'green-1'
                  : 'grey-3'
              "
                      :text-color="
                user.status === 'ACTIVE'
                  ? 'positive'
                  : 'grey-7'
              "
                  >
                    {{ user.status }}
                  </q-chip>
                </q-item-section>

              </q-item>
            </q-list>

            <!-- Empty -->
            <div
                v-if="!usersLoading && users.length === 0"
                class="text-center text-grey-6 q-pa-lg"
            >
              No users found
            </div>

          </q-card>
        </div>

        <!-- Roles overview -->
        <div class="col-12 col-lg-5">
          <q-card flat bordered>

            <q-card-section class="row items-center justify-between">
              <div>
                <div class="text-h6 text-weight-bold">
                  Roles overview
                </div>

                <div class="text-caption text-grey-6 q-mt-xs">
                  Users by assigned role
                </div>
              </div>

              <q-btn
                  flat
                  color="primary"
                  label="Manage"
                  no-caps
                  to="/roles"
              />
            </q-card-section>

            <q-separator/>

            <q-list
                v-if="!rolesLoading"
                separator
            >
              <q-item
                  v-for="role in roles.slice(0, 3)"
                  :key="role.id"
                  class="q-py-md"
              >

                <q-item-section avatar>
                  <q-avatar
                      color="purple-1"
                      text-color="deep-purple"
                      :icon="matShield"
                  />
                </q-item-section>

                <q-item-section>
                  <q-item-label class="text-weight-medium">
                    {{ role.name }}
                  </q-item-label>

                  <q-item-label caption>
                    {{ role.status }}
                  </q-item-label>
                </q-item-section>

                <q-item-section side>
                  <q-badge
                      :color="role.status === 'ACTIVE' ? 'positive' : 'negative'"
                      :label="role.status"
                  />
                </q-item-section>

              </q-item>
            </q-list>

            <q-card-section v-else class="text-center">
              <q-spinner
                  color="primary"
                  size="30px"
              />
            </q-card-section>

          </q-card>
        </div>

      </div>

    </div>
  </q-page>
</template>

<style scoped>
.page-background {
  min-height: calc(100vh - 64px);
}

.content-wrapper {
  width: min(100%, 1280px);
  margin: 0 auto;
}

.stat-card {
  height: 100%;
}

@media (max-width: 599px) {
  .page-background {
    padding: 20px 14px;
  }
}
</style>

<script setup lang="ts">
import {computed, ref} from 'vue'

type NavItem = {
  label: string
  icon: string
  value: string
}

type User = {
  name: string
  email: string
  role: string
  status: 'Active' | 'Inactive'
  initials: string
  color: string
}

type Role = {
  name: string
  description: string
  users: number
  color: string
}

const drawerOpen = ref(true)
const activePage = ref('dashboard')

const navItems: NavItem[] = [
  {label: 'Dashboard', icon: 'dashboard', value: 'dashboard'},
  {label: 'Users', icon: 'people', value: 'users'},
  {label: 'Roles', icon: 'admin_panel_settings', value: 'roles'},
]

const users: User[] = [
  {
    name: 'Ali Valiyev',
    email: 'ali.valiyev@example.com',
    role: 'Administrator',
    status: 'Active',
    initials: 'AV',
    color: 'primary',
  },
  {
    name: 'Husanboy Jorayev',
    email: 'husanboy.jorayev@example.com',
    role: 'Manager',
    status: 'Active',
    initials: 'HJ',
    color: 'deep-purple',
  },
  {
    name: 'Sardor Rahimov',
    email: 'sardor.rahimov@example.com',
    role: 'User',
    status: 'Inactive',
    initials: 'SR',
    color: 'teal',
  },
]

const roles: Role[] = [
  {
    name: 'Administrator',
    description: 'Full access to all system resources',
    users: 4,
    color: 'primary',
  },
  {
    name: 'Manager',
    description: 'Manage users and operational data',
    users: 12,
    color: 'deep-purple',
  },
  {
    name: 'User',
    description: 'Access assigned features and resources',
    users: 86,
    color: 'teal',
  },
]

const pageTitle = computed(() => {
  const item = navItems.find((navItem) => navItem.value === activePage.value)
  return item?.label ?? 'Dashboard'
})

const selectPage = (page: string) => {
  activePage.value = page
}
</script>

<template>
  <q-layout view="hHh LpR fFf" class="app-shell">
    <q-header bordered class="bg-white text-dark">
      <q-toolbar class="app-toolbar">
        <q-btn
            flat
            round
            dense
            icon="menu"
            color="grey-8"
            aria-label="Toggle navigation"
            @click="drawerOpen = !drawerOpen"
        />

        <q-toolbar-title class="text-weight-bold q-ml-sm">
          <span class="brand-mark">B</span>
          BRB Admin
        </q-toolbar-title>

        <q-btn flat round icon="notifications_none" color="grey-7" aria-label="Notifications">
          <q-badge floating rounded color="negative">3</q-badge>
        </q-btn>
        <q-separator vertical inset class="q-mx-md"/>
        <q-avatar color="primary" text-color="white" size="36px">AV</q-avatar>
        <div class="q-ml-sm gt-xs">
          <div class="text-weight-medium">Ali Valiyev</div>
          <div class="text-caption text-grey-6">Administrator</div>
        </div>
        <q-btn flat round dense icon="expand_more" color="grey-7" aria-label="Open profile menu"/>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="drawerOpen" show-if-above bordered :width="250" class="bg-white">
      <div class="drawer-content">
        <div class="drawer-label">MAIN MENU</div>
        <q-list padding>
          <q-item
              v-for="item in navItems"
              :key="item.value"
              v-ripple
              clickable
              :active="activePage === item.value"
              active-class="nav-item--active"
              class="nav-item q-mb-xs"
              @click="selectPage(item.value)"
          >
            <q-item-section avatar>
              <q-icon :name="item.icon" size="21px"/>
            </q-item-section>
            <q-item-section>{{ item.label }}</q-item-section>
          </q-item>
        </q-list>

        <q-separator class="q-my-md"/>
        <div class="drawer-label">SYSTEM</div>
        <q-list padding>
          <q-item v-ripple clickable class="nav-item">
            <q-item-section avatar>
              <q-icon name="settings" size="21px"/>
            </q-item-section>
            <q-item-section>Settings</q-item-section>
          </q-item>
          <q-item v-ripple clickable class="nav-item">
            <q-item-section avatar>
              <q-icon name="help_outline" size="21px"/>
            </q-item-section>
            <q-item-section>Help center</q-item-section>
          </q-item>
        </q-list>

        <div class="drawer-footer">
          <q-icon name="security" color="primary" size="24px"/>
          <div class="q-ml-sm">
            <div class="text-weight-medium">Secure workspace</div>
            <div class="text-caption text-grey-6">Your data is protected</div>
          </div>
        </div>
      </div>
    </q-drawer>

    <q-page-container>
      <q-page class="q-pa-lg page-background">
        <div class="content-wrapper">
          <div class="page-heading row items-center justify-between q-mb-lg">
            <div>
              <div class="text-h4 text-weight-bold">{{ pageTitle }}</div>
              <div class="text-body2 text-grey-7 q-mt-xs">
                Manage your users and access permissions from one place.
              </div>
            </div>
            <q-btn
                v-if="activePage !== 'dashboard'"
                unelevated
                color="primary"
                icon="add"
                :label="activePage === 'users' ? 'Add user' : 'Add role'"
                no-caps
            />
          </div>

          <template v-if="activePage === 'dashboard'">
            <div class="row q-col-gutter-md q-mb-lg">
              <div class="col-12 col-sm-6 col-md-3">
                <q-card flat bordered class="stat-card">
                  <q-card-section>
                    <div class="row items-start justify-between">
                      <div>
                        <div class="text-caption text-grey-7">Total users</div>
                        <div class="text-h4 text-weight-bold q-mt-sm">102</div>
                        <div class="text-caption text-positive q-mt-sm">
                          <q-icon name="trending_up"/>
                          12% this month
                        </div>
                      </div>
                      <q-avatar color="blue-1" text-color="primary" icon="people"/>
                    </div>
                  </q-card-section>
                </q-card>
              </div>
              <div class="col-12 col-sm-6 col-md-3">
                <q-card flat bordered class="stat-card">
                  <q-card-section>
                    <div class="row items-start justify-between">
                      <div>
                        <div class="text-caption text-grey-7">Active users</div>
                        <div class="text-h4 text-weight-bold q-mt-sm">98</div>
                        <div class="text-caption text-positive q-mt-sm">
                          <q-icon name="trending_up"/>
                          8% this month
                        </div>
                      </div>
                      <q-avatar color="green-1" text-color="positive" icon="how_to_reg"/>
                    </div>
                  </q-card-section>
                </q-card>
              </div>
              <div class="col-12 col-sm-6 col-md-3">
                <q-card flat bordered class="stat-card">
                  <q-card-section>
                    <div class="row items-start justify-between">
                      <div>
                        <div class="text-caption text-grey-7">Total roles</div>
                        <div class="text-h4 text-weight-bold q-mt-sm">8</div>
                        <div class="text-caption text-grey-6 q-mt-sm">2 custom roles</div>
                      </div>
                      <q-avatar color="purple-1" text-color="deep-purple" icon="badge"/>
                    </div>
                  </q-card-section>
                </q-card>
              </div>
              <div class="col-12 col-sm-6 col-md-3">
                <q-card flat bordered class="stat-card">
                  <q-card-section>
                    <div class="row items-start justify-between">
                      <div>
                        <div class="text-caption text-grey-7">Pending invites</div>
                        <div class="text-h4 text-weight-bold q-mt-sm">6</div>
                        <div class="text-caption text-warning q-mt-sm">
                          <q-icon name="schedule"/>
                          Needs attention
                        </div>
                      </div>
                      <q-avatar color="orange-1" text-color="orange-8" icon="mail_outline"/>
                    </div>
                  </q-card-section>
                </q-card>
              </div>
            </div>

            <div class="row q-col-gutter-lg">
              <div class="col-12 col-lg-7">
                <q-card flat bordered>
                  <q-card-section class="row items-center justify-between">
                    <div>
                      <div class="text-h6 text-weight-bold">Recent users</div>
                      <div class="text-caption text-grey-6 q-mt-xs">Latest users added to the system</div>
                    </div>
                    <q-btn flat color="primary" label="View all" no-caps @click="selectPage('users')"/>
                  </q-card-section>
                  <q-separator/>
                  <q-list separator>
                    <q-item v-for="user in users" :key="user.email" class="q-py-md">
                      <q-item-section avatar>
                        <q-avatar :color="user.color" text-color="white">{{ user.initials }}</q-avatar>
                      </q-item-section>
                      <q-item-section>
                        <q-item-label class="text-weight-medium">{{ user.name }}</q-item-label>
                        <q-item-label caption>{{ user.email }}</q-item-label>
                      </q-item-section>
                      <q-item-section side>
                        <q-chip
                            dense
                            :color="user.status === 'Active' ? 'green-1' : 'grey-3'"
                            :text-color="user.status === 'Active' ? 'positive' : 'grey-7'"
                        >
                          {{ user.status }}
                        </q-chip>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-card>
              </div>

              <div class="col-12 col-lg-5">
                <q-card flat bordered>
                  <q-card-section class="row items-center justify-between">
                    <div>
                      <div class="text-h6 text-weight-bold">Roles overview</div>
                      <div class="text-caption text-grey-6 q-mt-xs">Users by assigned role</div>
                    </div>
                    <q-btn flat color="primary" label="Manage" no-caps @click="selectPage('roles')"/>
                  </q-card-section>
                  <q-separator/>
                  <q-list separator>
                    <q-item v-for="role in roles" :key="role.name" class="q-py-md">
                      <q-item-section avatar>
                        <q-avatar :color="`${role.color}-1`" :text-color="role.color" icon="shield"/>
                      </q-item-section>
                      <q-item-section>
                        <q-item-label class="text-weight-medium">{{ role.name }}</q-item-label>
                        <q-item-label caption>{{ role.description }}</q-item-label>
                      </q-item-section>
                      <q-item-section side class="text-weight-bold">{{ role.users }}</q-item-section>
                    </q-item>
                  </q-list>
                </q-card>
              </div>
            </div>
          </template>

          <q-card v-else flat bordered>
            <q-card-section class="row items-center justify-between">
              <div>
                <div class="text-h6 text-weight-bold">{{ pageTitle }} list</div>
                <div class="text-caption text-grey-6 q-mt-xs">
                  Keep your workspace access organized and up to date.
                </div>
              </div>
              <q-input dense outlined placeholder="Search" class="search-input">
                <template #prepend>
                  <q-icon name="search"/>
                </template>
              </q-input>
            </q-card-section>
            <q-separator/>
            <q-list v-if="activePage === 'users'" separator>
              <q-item v-for="user in users" :key="user.email" class="q-py-md">
                <q-item-section avatar>
                  <q-avatar :color="user.color" text-color="white">{{ user.initials }}</q-avatar>
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-weight-medium">{{ user.name }}</q-item-label>
                  <q-item-label caption>{{ user.email }}</q-item-label>
                </q-item-section>
                <q-item-section class="gt-xs">{{ user.role }}</q-item-section>
                <q-item-section side>
                  <q-chip dense :color="user.status === 'Active' ? 'green-1' : 'grey-3'"
                          :text-color="user.status === 'Active' ? 'positive' : 'grey-7'">
                    {{ user.status }}
                  </q-chip>
                </q-item-section>
                <q-item-section side>
                  <q-btn flat round dense icon="more_vert"/>
                </q-item-section>
              </q-item>
            </q-list>
            <q-list v-else separator>
              <q-item v-for="role in roles" :key="role.name" class="q-py-md">
                <q-item-section avatar>
                  <q-avatar :color="`${role.color}-1`" :text-color="role.color" icon="shield"/>
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-weight-medium">{{ role.name }}</q-item-label>
                  <q-item-label caption>{{ role.description }}</q-item-label>
                </q-item-section>
                <q-item-section side>{{ role.users }} users</q-item-section>
                <q-item-section side>
                  <q-btn flat round dense icon="more_vert"/>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<style scoped>
.app-shell {
  background: #f5f7fb;
}

.app-toolbar {
  min-height: 64px;
  padding: 0 24px;
}

.brand-mark {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  margin-right: 8px;
  border-radius: 8px;
  background: #1976d2;
  color: #fff;
  font-size: 18px;
}

.drawer-content {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 26px 14px 18px;
}

.drawer-label {
  padding: 0 14px;
  color: #9aa3b2;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
}

.nav-item {
  min-height: 46px;
  border-radius: 9px;
  color: #697386;
}

.nav-item--active {
  background: #eaf2ff;
  color: #1976d2;
  font-weight: 600;
}

.drawer-footer {
  display: flex;
  align-items: center;
  margin-top: auto;
  padding: 14px;
  border-radius: 10px;
  background: #f5f8ff;
}

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

.search-input {
  width: 220px;
}

@media (max-width: 599px) {
  .app-toolbar {
    padding: 0 12px;
  }

  .page-background {
    padding: 20px 14px;
  }

  .page-heading {
    align-items: flex-start;
    gap: 16px;
  }

  .search-input {
    width: 140px;
  }
}
</style>

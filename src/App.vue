<script setup lang="ts">
import {ref} from 'vue'
import {
  matAdminPanelSettings,
  matDashboard,
  matHelpOutline,
  matMenu,
  matNotificationsNone,
  matPeople,
  matSchedule,
  matSettings,
} from '@quasar/extras/material-icons'

const leftDrawerOpen = ref(true)
</script>

<template>
  <q-layout view="lHh Lpr lFf">

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
              A
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-weight-bold">
              Admin Panel
            </q-item-label>

            <q-item-label caption>
              Management
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


        <q-separator class="q-my-md"/>


        <!-- ACTIVITY -->
        <q-item
            clickable
            v-ripple
            to="/activity"
        >
          <q-item-section avatar>
            <q-icon :name="matSchedule"/>
          </q-item-section>

          <q-item-section>
            Activity
          </q-item-section>
        </q-item>


        <!-- SETTINGS -->
        <q-item
            clickable
            v-ripple
            to="/settings"
        >
          <q-item-section avatar>
            <q-icon :name="matSettings"/>
          </q-item-section>

          <q-item-section>
            Settings
          </q-item-section>
        </q-item>


        <!-- HELP -->
        <q-item
            clickable
            v-ripple
            to="/help"
        >
          <q-item-section avatar>
            <q-icon :name="matHelpOutline"/>
          </q-item-section>

          <q-item-section>
            Help
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
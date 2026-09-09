<script setup lang="ts">
import {ref} from 'vue'

const leftDrawerOpen = ref(true)
</script>

<template>
  <q-layout view="lHh Lpr lFf">

    <!-- HEADER -->
    <q-toolbar>

      <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
      />

      <q-toolbar-title>
        Admin Panel
      </q-toolbar-title>

    </q-toolbar>

    <!-- Sidebar -->
    <q-drawer
        v-model="leftDrawerOpen"
        show-if-above
        bordered
        :width="250"
    >

      <q-list padding>

        <!-- Logo / title -->
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


        <!-- Dashboard -->
        <q-item
            clickable
            v-ripple
            to="/dashboard"
            exact
        >
          <q-item-section avatar>
            <q-icon name="dashboard"/>
          </q-item-section>

          <q-item-section>
            Dashboard
          </q-item-section>
        </q-item>


        <!-- Users -->
        <q-item
            clickable
            v-ripple
            to="/users"
        >
          <q-item-section avatar>
            <q-icon name="people"/>
          </q-item-section>

          <q-item-section>
            Users
          </q-item-section>
        </q-item>


        <!-- Roles -->
        <q-item
            clickable
            v-ripple
            to="/roles"
        >
          <q-item-section avatar>
            <q-icon name="admin_panel_settings"/>
          </q-item-section>

          <q-item-section>
            Roles
          </q-item-section>
        </q-item>


        <q-separator class="q-my-md"/>


        <!-- Settings -->
        <q-item
            clickable
            v-ripple
            to="/settings"
        >
          <q-item-section avatar>
            <q-icon name="settings"/>
          </q-item-section>

          <q-item-section>
            Settings
          </q-item-section>
        </q-item>

      </q-list>

    </q-drawer>


    <!-- Page content -->
    <q-page-container>
      <router-view/>
    </q-page-container>

  </q-layout>
</template>
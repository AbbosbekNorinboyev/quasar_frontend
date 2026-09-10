<script setup lang="ts">
import {
  matPerson,
  matEmail,
  matPhone,
  matNotificationsNone,
  matSecurity,
  matLock,
  matSave,
} from '@quasar/extras/material-icons'

import {ref} from 'vue'

const fullName = ref('Ali Valiyev')
const email = ref('ali.valiyev@example.com')
const phoneNumber = ref('+998 90 123 45 67')

const emailNotifications = ref(true)
const systemNotifications = ref(true)
const twoFactor = ref(false)

const saveSettings = () => {
  console.log('Settings saved')
}
</script>

<template>
  <q-page class="q-pa-lg page-background">

    <div class="content-wrapper">

      <!-- Header -->
      <div class="q-mb-lg">
        <div class="text-h4 text-weight-bold">
          Settings
        </div>

        <div class="text-body2 text-grey-7 q-mt-xs">
          Manage your account and system preferences.
        </div>
      </div>


      <!-- Profile -->
      <q-card flat bordered class="q-mb-lg">

        <q-card-section>
          <div class="text-h6 text-weight-bold">
            Profile
          </div>

          <div class="text-caption text-grey-6 q-mt-xs">
            Update your personal information.
          </div>
        </q-card-section>

        <q-separator/>

        <q-card-section>

          <div class="row q-col-gutter-md">

            <!-- Full name -->
            <div class="col-12 col-md-6">
              <q-input
                  v-model="fullName"
                  outlined
                  label="Full name"
              >
                <template #prepend>
                  <q-icon :name="matPerson"/>
                </template>
              </q-input>
            </div>

            <!-- Email -->
            <div class="col-12 col-md-6">
              <q-input
                  v-model="email"
                  outlined
                  label="Email"
                  type="email"
              >
                <template #prepend>
                  <q-icon :name="matEmail"/>
                </template>
              </q-input>
            </div>

            <!-- Phone -->
            <div class="col-12 col-md-6">
              <q-input
                  v-model="phoneNumber"
                  outlined
                  label="Phone number"
              >
                <template #prepend>
                  <q-icon :name="matPhone"/>
                </template>
              </q-input>
            </div>

          </div>

        </q-card-section>

      </q-card>


      <!-- Notifications -->
      <q-card flat bordered class="q-mb-lg">

        <q-card-section>
          <div class="text-h6 text-weight-bold">
            Notifications
          </div>

          <div class="text-caption text-grey-6 q-mt-xs">
            Choose which notifications you want to receive.
          </div>
        </q-card-section>

        <q-separator/>

        <q-list>

          <q-item>
            <q-item-section avatar>
              <q-icon
                  :name="matEmail"
                  color="primary"
                  size="24px"
              />
            </q-item-section>

            <q-item-section>
              <q-item-label>
                Email notifications
              </q-item-label>

              <q-item-label caption>
                Receive important updates via email.
              </q-item-label>
            </q-item-section>

            <q-item-section side>
              <q-toggle v-model="emailNotifications"/>
            </q-item-section>
          </q-item>

          <q-separator inset/>

          <q-item>
            <q-item-section avatar>
              <q-icon
                  :name="matNotificationsNone"
                  color="primary"
                  size="24px"
              />
            </q-item-section>

            <q-item-section>
              <q-item-label>
                System notifications
              </q-item-label>

              <q-item-label caption>
                Receive notifications about system activity.
              </q-item-label>
            </q-item-section>

            <q-item-section side>
              <q-toggle v-model="systemNotifications"/>
            </q-item-section>
          </q-item>

        </q-list>

      </q-card>


      <!-- Security -->
      <q-card flat bordered class="q-mb-lg">

        <q-card-section>
          <div class="text-h6 text-weight-bold">
            Security
          </div>

          <div class="text-caption text-grey-6 q-mt-xs">
            Manage your account security.
          </div>
        </q-card-section>

        <q-separator/>

        <q-list>

          <q-item>
            <q-item-section avatar>
              <q-icon
                  :name="matSecurity"
                  color="primary"
                  size="24px"
              />
            </q-item-section>

            <q-item-section>
              <q-item-label>
                Two-factor authentication
              </q-item-label>

              <q-item-label caption>
                Add an extra layer of security to your account.
              </q-item-label>
            </q-item-section>

            <q-item-section side>
              <q-toggle v-model="twoFactor"/>
            </q-item-section>
          </q-item>

          <q-separator inset/>

          <q-item
              clickable
              v-ripple
          >
            <q-item-section avatar>
              <q-icon
                  :name="matLock"
                  color="primary"
                  size="24px"
              />
            </q-item-section>

            <q-item-section>
              <q-item-label>
                Change password
              </q-item-label>

              <q-item-label caption>
                Update your account password.
              </q-item-label>
            </q-item-section>

            <q-item-section side>
              <q-icon
                  name="chevron_right"
                  color="grey-6"
              />
            </q-item-section>
          </q-item>

        </q-list>

      </q-card>


      <!-- Save -->
      <div class="row justify-end">
        <q-btn
            unelevated
            color="primary"
            :icon="matSave"
            label="Save changes"
            no-caps
            @click="saveSettings"
        />
      </div>

    </div>

  </q-page>
</template>

<style scoped>
.page-background {
  min-height: calc(100vh - 64px);
}

.content-wrapper {
  width: min(100%, 1000px);
  margin: 0 auto;
}
</style>

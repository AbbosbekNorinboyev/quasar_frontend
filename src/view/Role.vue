<script setup lang="ts">
import {onMounted, ref} from 'vue'
import {matAdd, matMoreVert, matShield} from '@quasar/extras/material-icons'
import {getRoles} from '@/service/roleService'

const roles = ref<any>([])
const loading = ref(false)

const loadRoles = async () => {
  try {
    loading.value = true
    roles.value = await getRoles()
  } catch (error) {
    console.error('Roles yuklashda xatolik:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadRoles()
})
</script>

<template>
  <div>
    <div class="row items-center justify-between q-mb-lg">
      <div>
        <div class="text-h4 text-weight-bold">
          Roles
        </div>
        <div class="text-body2 text-grey-7 q-mt-xs">
          Manage system roles
        </div>
      </div>

      <q-btn
          color="primary"
          unelevated
          no-caps
          :icon="matAdd"
          label="Add role"
      />
    </div>

    <q-card flat bordered>
      <q-card-section>
        <div class="text-h6 text-weight-bold">
          Roles list
        </div>
      </q-card-section>

      <q-separator/>

      <q-list separator>
        <q-item
            v-for="role in roles"
            :key="role.id"
            class="q-py-md"
        >
          <q-item-section avatar>
            <q-avatar
                color="blue-1"
                text-color="primary"
                :icon="matShield"
            />
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-weight-medium">
              {{ role.name }}
            </q-item-label>

            <q-item-label caption>
              {{ role.description }}
            </q-item-label>
          </q-item-section>

          <q-item-section side>
            <q-btn
                flat
                round
                dense
                :icon="matMoreVert"
            />
          </q-item-section>
        </q-item>
      </q-list>

      <q-inner-loading :showing="loading">
        <q-spinner color="primary" size="40px"/>
      </q-inner-loading>
    </q-card>
  </div>
</template>
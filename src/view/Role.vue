<script setup lang="ts">
import {onMounted, ref} from 'vue'
import {getRoles} from '@/service/roleService.ts'
import {
  matAdd,
  matEdit,
  matDelete,
  matRefresh,
  matSearch
} from '@quasar/extras/material-icons'
import {formatDate} from '@/utils/date.ts';

type Role = {
  id: number
  name: string
  status: string
  createdAt: string
  updatedAt: string
}

const roles = ref<Role[]>([])
const loading = ref(false)
const search = ref('')

const columns = [
  {
    name: 'id',
    label: 'ID',
    field: 'id',
    align: 'left' as const,
    sortable: true
  },
  {
    name: 'name',
    label: 'Name',
    field: 'name',
    align: 'left' as const,
    sortable: true
  },
  {
    name: 'status',
    label: 'Status',
    field: 'status',
    align: 'left' as const,
    sortable: true
  },
  {
    name: 'createdAt',
    label: 'Created At',
    field: 'createdAt',
    align: 'left' as const,
    sortable: true
  },
  {
    name: 'updatedAt',
    label: 'Updated At',
    field: 'updatedAt',
    align: 'left' as const,
    sortable: true
  },
  {
    name: 'actions',
    label: 'Actions',
    field: 'actions',
    align: 'right' as const
  }
]

const loadRoles = async () => {
  loading.value = true

  try {
    const response = await getRoles()

    roles.value = response.data.data
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
  <q-page class="q-pa-lg">

    <!-- Header -->
    <div class="row items-center justify-between q-mb-lg">

      <div>
        <div class="text-h5 text-weight-bold">
          Roles
        </div>

        <div class="text-grey-7">
          Manage system roles
        </div>
      </div>

      <q-btn
          color="primary"
          :icon="matAdd"
          label="Add Role"
      />

    </div>


    <!-- Search -->
    <div class="row items-center q-mb-md">

      <q-input
          v-model="search"
          outlined
          dense
          clearable
          placeholder="Search role..."
          class="col-12 col-sm-4"
      >
        <template #prepend>
          <q-icon :name="matSearch"/>
        </template>
      </q-input>

      <q-btn
          flat
          round
          :icon="matRefresh"
          class="q-ml-sm"
          :loading="loading"
          @click="loadRoles"
      >
        <q-tooltip>
          Refresh
        </q-tooltip>
      </q-btn>

    </div>


    <!-- Table -->
    <q-card flat bordered>

      <q-table
          :rows="roles"
          :columns="columns"
          :loading="loading"
          :filter="search"
          row-key="id"
          flat
      >

        <!-- Status -->
        <template #body-cell-status="props">

          <q-td :props="props">

            <q-badge
                :color="props.value === 'ACTIVE' ? 'positive' : 'negative'"
                :label="props.value"
            />

          </q-td>

        </template>


        <!-- Created At -->
        <template #body-cell-createdAt="props">
          <q-td :props="props">
            {{ formatDate(props.value) }}
          </q-td>

        </template>


        <!-- Updated At -->
        <template #body-cell-updatedAt="props">

          <q-td :props="props">
            {{ formatDate(props.value) }}
          </q-td>

        </template>


        <!-- Actions -->
        <template #body-cell-actions="props">

          <q-td :props="props">

            <q-btn
                flat
                round
                dense
                :icon="matEdit"
                color="primary"
            >
              <q-tooltip>
                Edit
              </q-tooltip>
            </q-btn>

            <q-btn
                flat
                round
                dense
                :icon="matDelete"
                color="negative"
            >
              <q-tooltip>
                Delete
              </q-tooltip>
            </q-btn>

          </q-td>

        </template>

      </q-table>

    </q-card>

  </q-page>
</template>
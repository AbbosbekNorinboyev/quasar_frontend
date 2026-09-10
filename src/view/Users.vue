<script setup lang="ts">
import {onMounted, ref} from 'vue'
import {getUsers} from '@/service/userService.ts'
import {matAdd, matDelete, matEdit, matRefresh, matSearch} from '@quasar/extras/material-icons'
import {formatDate} from '@/utils/date.ts';

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
    name: 'fullName',
    label: 'Full Name',
    field: 'fullName',
    align: 'left' as const,
    sortable: true
  },
  {
    name: 'phoneNumber',
    label: 'Phone',
    field: 'phoneNumber',
    align: 'left' as const,
    sortable: true
  },
  {
    name: 'email',
    label: 'Email',
    field: 'email',
    align: 'left' as const,
    sortable: true
  },
  {
    name: 'username',
    label: 'Username',
    field: 'username',
    align: 'left' as const,
    sortable: true
  },
  {
    name: 'birthDate',
    label: 'Birth Date',
    field: 'birthDate',
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

const loadUsers = async () => {
  loading.value = true

  try {
    const response = await getUsers()

    users.value = response.data.data
  } catch (error) {
    console.error('Users yuklashda xatolik:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadUsers()
})
</script>

<template>
  <q-page class="q-pa-lg">

    <!-- Header -->
    <div class="row items-center justify-between q-mb-lg">

      <div>
        <div class="text-h5 text-weight-bold">
          Users
        </div>

        <div class="text-grey-7">
          Manage system users
        </div>
      </div>

      <q-btn
          color="primary"
          :icon="matAdd"
          label="Add User"
      />

    </div>


    <!-- Search -->
    <div class="row items-center q-mb-md">

      <q-input
          v-model="search"
          outlined
          dense
          clearable
          placeholder="Search user..."
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
          @click="loadUsers"
      >
        <q-tooltip>
          Refresh
        </q-tooltip>
      </q-btn>

    </div>


    <!-- Table -->
    <q-card flat bordered>

      <q-table
          :rows="users"
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
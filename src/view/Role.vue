<script setup lang="ts">
import {onMounted, ref} from 'vue'
import {getRoles, createRole, updateRole} from '@/service/roleService.ts'
import {
  matAdd,
  matEdit,
  matDelete,
  matRefresh,
  matSearch
} from '@quasar/extras/material-icons'
import {formatDate} from '@/utils/date.ts';
import {type Status, statusOptions} from '@/types/Status'

type Role = {
  id: number
  name: string
  status: Status
  createdAt: string
  updatedAt: string
}

const roles = ref<Role[]>([])
const loading = ref(false)
const search = ref('')

// Create uchun form
const createForm = ref({
  name: ''
})

// Update uchun form
const updateForm = ref({
  name: '',
  status: ''
})

const showCreateModal = ref(false)
const showUpdateModal = ref(false)
const createLoading = ref(false)
const updateLoading = ref(false)
const createError = ref('')
const updateError = ref('')
const updateFormRef = ref()

// Edit qilinayotgan role ID
const editingId = ref<number | null>(null)

// =========================
// OPEN CREATE MODAL
// =========================
const openCreateModal = () => {

  createForm.value = {
    name: '',
  }

  createError.value = ''
  showCreateModal.value = true
}

// =========================
// OPEN UPDATE MODAL
// =========================
const openUpdateModal = (role: any) => {
  // Qaysi role edit qilinayotganini saqlaymiz
  editingId.value = role.id

  // Role ma'lumotlarini update formga joylaymiz
  updateForm.value = {
    name: role.name,
    status: role.status
  }

  updateError.value = ''
  showUpdateModal.value = true
}

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

// =========================
// CREATE ROLE
// =========================
const handleCreate = async () => {
  createError.value = ''
  createLoading.value = true

  try {

    const request = {
      name: createForm.value.name,
    }

    console.log('Create request:', request)

    await createRole(request)

    // Modalni yopish
    showCreateModal.value = false

    // Formani tozalash
    createForm.value = {
      name: '',
    }

    // Jadvalni qayta yuklash
    await loadRoles()

  } catch (e: any) {

    console.error('Create district error:', e)

    createError.value =
        e?.response?.data?.message ||
        'Role yaratishda xatolik yuz berdi'

  } finally {
    createLoading.value = false
  }
}

// =========================
// UPDATE ROLE
// =========================
const handleUpdate = async () => {

  // ID bo'lmasa update qilmaymiz
  if (editingId.value === null) {
    return
  }

  updateError.value = ''

  const isValid = await updateFormRef.value?.validate()
  if (!isValid) {
    return
  }

  updateLoading.value = true

  try {
    const updateRequest = {
      name: updateForm.value.name.trim(),
      status: updateForm.value.status
    }

    const response = await updateRole(editingId.value, updateRequest)

    if (response.data?.success === false || response.data?.code === 400) {
      updateError.value = response.data?.message || 'Roleni yangilashda xatolik yuz berdi'
      return
    }

    // Modalni yopamiz
    showUpdateModal.value = false
    editingId.value = null

    await loadRoles()
  } catch (e: any) {
    console.error('Error updating role:', e)

    updateError.value =
        e?.response?.data?.message ||
        'Roleni yangilashda xatolik yuz berdi'
  } finally {
    updateLoading.value = false
  }
}
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
          @click="openCreateModal"
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
                @click="openUpdateModal(props.row)"
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

    <!-- Role yaratish -->
    <q-dialog v-model="showCreateModal">
      <q-card style="min-width: 350px; max-width: 520px;">
        <q-card-section>
          <div class="text-h6 text-weight-bold">Yangi role yaratish</div>
        </q-card-section>

        <q-card-section>
          <q-input v-model="createForm.name" outlined label="Role nomi"/>

          <div v-if="createError" class="text-negative q-mt-sm">{{ createError }}</div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
              flat
              color="negative"
              label="Bekor qilish"
              @click="showCreateModal = false"/>
          <q-btn
              color="primary"
              label="Yaratish"
              :loading="createLoading"
              @click="handleCreate"/>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Role yangilash -->
    <q-dialog v-model="showUpdateModal" persistent>
      <q-card style="min-width: 350px; max-width: 520px">
        <q-card-section>
          <div class="text-h6 text-weight-bold">
            Role ni tahrirlash
          </div>
        </q-card-section>

        <q-card-section>
          <q-form ref="updateFormRef" @submit.prevent="handleUpdate">
          <q-input
              v-model="updateForm.name"
              outlined
              label="Role nomi"
              class="q-mb-md"
              :rules="[(value) => !!value?.trim() || 'Role nomini kiriting']"
          />

          <q-select
              v-model="updateForm.status"
              outlined
              label="Status"
              :options="statusOptions"
              :rules="[(value) => !!value || 'Statusni tanlang']"
          />

          <div
              v-if="updateError"
              class="text-negative q-mt-sm"
          >
            {{ updateError }}
          </div>
          </q-form>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
              flat
              color="negative"
              label="Bekor qilish"
              @click="showUpdateModal = false"
          />

          <q-btn
              color="primary"
              label="Saqlash"
              :loading="updateLoading"
              @click="handleUpdate"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

  </q-page>
</template>
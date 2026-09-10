<script setup lang="ts">
import {onMounted, ref} from 'vue'
import {getUsers, createUser, updateUser} from '@/service/userService.ts'
import {getRoles} from '@/service/roleService.ts'
import {matAdd, matDelete, matEdit, matRefresh, matSearch} from '@quasar/extras/material-icons'
import {formatDate} from '@/utils/date.ts';
import {type Status, statusOptions} from "@/types/Status.ts";

type User = {
  id: number
  fullName: string
  phoneNumber: string
  email: string
  username: string
  birthDate: string
  status: Status
  createdAt: string
  updatedAt: string
}

type Role = {
  id: number
  name: string
  status: string
}

const users = ref<User[]>([])
const roles = ref<Role[]>([])
const loading = ref(false)
const search = ref('')

const showCreateModal = ref(false)
const showUpdateModal = ref(false)
const createLoading = ref(false)
const updateLoading = ref(false)
const createError = ref('')
const updateError = ref('')
const showPassword = ref(false)
const createFormRef = ref()
const updateFormRef = ref()

// Edit qilinayotgan role ID
const editingId = ref<number | null>(null)

// Create uchun form
const createForm = ref({
  fullName: '',
  phoneNumber: '',
  email: '',
  username: '',
  password: '',
  birthDate: '',
  roleIds: [] as number[],
})

// Update uchun form
const updateForm = ref({
  fullName: '',
  phoneNumber: '',
  email: '',
  username: '',
  password: '',
  birthDate: '',
  status: '',
})

// =========================
// OPEN CREATE MODAL
// =========================
const openCreateModal = () => {
  createForm.value = {
    fullName: '',
    phoneNumber: '',
    email: '',
    username: '',
    password: '',
    birthDate: '',
    roleIds: [],
  }
  createError.value = ''
  showPassword.value = false
  showCreateModal.value = true
}

// =========================
// OPEN UPDATE MODAL
// =========================
const openUpdateModal = (user: any) => {
  // Qaysi role edit qilinayotganini saqlaymiz
  editingId.value = user.id

  // Role ma'lumotlarini update formga joylaymiz
  updateForm.value = {
    fullName: user.fullName ?? '',
    phoneNumber: user.phoneNumber ?? '',
    email: user.email ?? '',
    username: user.username ?? '',
    password: '',
    birthDate: user.birthDate ?? '',
    status: user.status ?? 'ACTIVE'
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

const loadRoles = async () => {
  try {
    const response = await getRoles()
    roles.value = response.data.data
  } catch (error) {
    console.error('Roles yuklashda xatolik:', error)
  }
}

onMounted(() => {
  loadUsers()
  loadRoles()
})

const handleCreate = async () => {
  createError.value = ''

  const isValid = await createFormRef.value?.validate()
  if (!isValid) {
    return
  }

  createLoading.value = true

  try {
    const response = await createUser({
      fullName: createForm.value.fullName.trim(),
      phoneNumber: createForm.value.phoneNumber.trim(),
      email: createForm.value.email.trim(),
      username: createForm.value.username.trim(),
      password: createForm.value.password,
      birthDate: createForm.value.birthDate,
      roleIds: createForm.value.roleIds,
    })

    if (response.data?.success === false || response.data?.code === 400) {
      createError.value = response.data?.message ?? 'User yaratishda xatolik yuz berdi'
      return
    }

    showCreateModal.value = false
    await loadUsers()
  } catch (error) {
    const response = (error as { response?: { data?: { message?: string } } }).response
    createError.value = response?.data?.message ?? 'User yaratishda xatolik yuz berdi'
  } finally {
    createLoading.value = false
  }
}

const handleUpdate = async () => {

  // ID bo'lmasa update qilmaymiz
  if (editingId.value === null) {
    return
  }

  updateError.value = ''

  const isValid = await updateFormRef.value?.validate()
  if (isValid === false) {
    return
  }

  updateLoading.value = true

  try {
    const updateRequest: {
      fullName: string
      phoneNumber: string
      email: string
      username: string
      birthDate: string
      status: string
      password?: string
    } = {
      fullName: updateForm.value.fullName.trim(),
      phoneNumber: updateForm.value.phoneNumber.trim(),
      email: updateForm.value.email.trim(),
      username: updateForm.value.username.trim(),
      birthDate: updateForm.value.birthDate,
      status: updateForm.value.status,
    }

    if (updateForm.value.password.trim()) {
      updateRequest.password = updateForm.value.password
    }

    const response = await updateUser(editingId.value, updateRequest)

    if (response.data?.success === false || response.data?.code === 400) {
      updateError.value = response.data?.message ?? 'Userni yangilashda xatolik yuz berdi'
      return
    }

    // Modalni yopamiz
    showUpdateModal.value = false
    editingId.value = null

    await loadUsers()
  } catch (e: any) {
    console.error('Error updating user:', e)

    updateError.value =
        e?.response?.data?.message ||
        'Userni yangilashda xatolik yuz berdi'
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

    <!--  User yaratish  -->
    <q-dialog v-model="showCreateModal" persistent>
      <q-card class="create-user-card">
        <q-card-section>
          <div class="text-h6 text-weight-bold">Yangi user yaratish</div>
          <div class="text-caption text-grey-7 q-mt-xs">
            User maʼlumotlarini kiriting
          </div>
        </q-card-section>

        <q-card-section>
          <q-form ref="createFormRef" class="q-gutter-sm" @submit.prevent="handleCreate">
            <q-input
                v-model="createForm.fullName"
                outlined
                label="Full name"
                :rules="[(value) => !!value || 'Full name kiriting']"
            />

            <q-input
                v-model="createForm.username"
                outlined
                label="Username"
                :rules="[(value) => !!value || 'Username kiriting']"
            />

            <div class="row q-col-gutter-sm">
              <div class="col-12 col-sm-6">
                <q-input
                    v-model="createForm.email"
                    outlined
                    type="email"
                    label="Email"
                    :rules="[(value) => !!value || 'Email kiriting']"
                />
              </div>

              <div class="col-12 col-sm-6">
                <q-input
                    v-model="createForm.phoneNumber"
                    outlined
                    label="Phone number"
                    :rules="[(value) => !!value || 'Telefon raqam kiriting']"
                />
              </div>
            </div>

            <div class="row q-col-gutter-sm">
              <div class="col-12 col-sm-6">
                <q-input
                    v-model="createForm.birthDate"
                    outlined
                    type="date"
                    label="Birth date"
                />
              </div>

              <div class="col-12 col-sm-6">
                <q-select
                    v-model="createForm.roleIds"
                    outlined
                    multiple
                    emit-value
                    map-options
                    option-label="name"
                    option-value="id"
                    label="Roles"
                    :options="roles"
                />
              </div>
            </div>

            <q-input
                v-model="createForm.password"
                outlined
                label="Password"
                :type="showPassword ? 'text' : 'password'"
                :rules="[(value) => value.length >= 8 || 'Password kamida 8 belgidan iborat bo‘lsin']"
            >
              <template #append>
                <q-icon
                    :name="showPassword ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="showPassword = !showPassword"
                />
              </template>
            </q-input>

            <q-banner v-if="createError" rounded class="bg-red-1 text-negative">
              {{ createError }}
            </q-banner>

            <q-card-actions align="right" class="q-px-none">
              <q-btn
                  flat
                  color="negative"
                  label="Bekor qilish"
                  @click="showCreateModal = false"/>
              <q-btn
                  color="primary"
                  label="Yaratish"
                  type="submit"
                  :loading="createLoading"
              />
            </q-card-actions>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!--  User yangilash -->
    <q-dialog v-model="showUpdateModal" persistent>
      <q-card style="min-width: 350px; max-width: 520px">
        <q-card-section>
          <div class="text-h6 text-weight-bold">
            User ni tahrirlash
          </div>
        </q-card-section>

        <q-card-section>
          <q-form ref="updateFormRef" class="q-gutter-sm" @submit.prevent="handleUpdate">
          <q-input
              outlined
              label="Ism familiya"
              v-model="updateForm.fullName"
              :rules="[(value) => !!value?.trim() || 'Ism familiya kiriting']"
          />

          <q-input
              outlined
              label="Telefon raqami"
              v-model="updateForm.phoneNumber"
              :rules="[(value) => !!value?.trim() || 'Telefon raqamini kiriting']"
          />

          <q-input
              outlined
              label="Email"
              v-model="updateForm.email"
              :rules="[(value) => !!value?.trim() || 'Email kiriting']"
          />

          <q-input
              outlined
              label="Username"
              v-model="updateForm.username"
              :rules="[(value) => !!value?.trim() || 'Username kiriting']"
          />

          <q-input
              outlined
              label="Tugilgan sanasi"
              v-model="updateForm.birthDate"
              type="date"
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
              type="submit"
              :loading="updateLoading"
              @click="handleUpdate"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

  </q-page>
</template>

<style scoped>
.create-user-card {
  width: min(100%, 680px);
}
</style>
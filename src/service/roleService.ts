import api from '@/api/axios.ts'

const API_URL = '/roles'

export function getRoles() {
    return api.get(`${API_URL}/getAll`)
}

export function createRole(data: any) {
    return api.post(`${API_URL}/create`, data)
}

export function updateRole(roleId: number, data: any) {
    return api.post(`${API_URL}/update/${roleId}`, data)
}

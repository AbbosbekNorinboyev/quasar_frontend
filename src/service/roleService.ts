import api from '@/api/axios.ts'

const API_URL = '/roles'

export function getRoles() {
    return api.get(`${API_URL}/getAll`)
}

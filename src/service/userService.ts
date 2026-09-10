import api from '@/api/axios'

const API_URL = '/users'

export type User = {
    id?: number | string
    name: string
    email: string
    username?: string
    phoneNumber?: string
    role?: string
    status?: string
}

export function getUsers(
    // params: {
    // page?: number,
    // size?: number,
    // id?: number,
    // fullName?: string,
    // phoneNumber?: string,
    // email?: string,
    // username?: string,
    // birthDate?: string,
    // roleId?: number,
    // status?: string,
    // createdAt?: string,
    // updatedAt?: string
    // }
) {
    return api.get(`${API_URL}/getAll`)
}

export function createUser(data: any) {
    return api.post(`${API_URL}/create`, data)
}

export const getUser = async (id: number | string): Promise<User> => {
    const response = await api.get<User>(`/users/${id}`)
    return response.data
}

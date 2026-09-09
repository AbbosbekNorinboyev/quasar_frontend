import api, {clearAccessToken, setAccessToken} from '@/api/axios'

const API_URL = '/users'

export type RegisterRequest = {
    fullName: string
    phoneNumber: string
    email: string
    username: string
    password: string
    birthDate: string
    roleIds?: number[]
}

export interface LoginRequest {
    username: string
    password: string
}

export type User = {
    id?: number | string
    name: string
    email: string
    username?: string
    phoneNumber?: string
    role?: string
    status?: string
}

export type AuthResponse = {
    accessToken?: string
    access_token?: string
    token?: string
    refreshToken?: string
    refresh_token?: string
    user?: User
}

const getToken = (response: AuthResponse): string | undefined =>
    response.accessToken ?? response.access_token ?? response.token

export const register = (request: RegisterRequest) => {
    return api.post(`${API_URL}/register`, request)
}

export const login = (request: LoginRequest) => {
    return api.post(`${API_URL}/login`, request)
}

export const logout = (): void => {
    clearAccessToken()
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

export const getUser = async (id: number | string): Promise<User> => {
    const response = await api.get<User>(`/users/${id}`)
    return response.data
}

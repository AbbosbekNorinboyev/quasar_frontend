import {reactive} from 'vue'
import api, {clearAccessToken, getAccessToken, setAccessToken} from '@/api/axios'

const USER_KEY = 'auth_user'

export type AuthUser = {
  id?: number | string
  fullName?: string
  name?: string
  email?: string
  username?: string
  phoneNumber?: string
  role?: string
}

export type RegisterRequest = {
  fullName: string
  phoneNumber: string
  email: string
  username: string
  password: string
  birthDate: string
}

export type LoginRequest = {
  username: string
  password: string
}

type AuthPayload = {
  accessToken?: string
  access_token?: string
  token?: string
  user?: AuthUser
}

const storedUser = localStorage.getItem(USER_KEY)

export const authState = reactive<{ user: AuthUser | null }>({
  user: storedUser ? JSON.parse(storedUser) as AuthUser : null,
})

const extractPayload = (data: AuthPayload | { data?: AuthPayload }): AuthPayload => {
  if ('data' in data && data.data) {
    return data.data
  }

  return data
}

const saveSession = (data: AuthPayload | { data?: AuthPayload }): void => {
  const payload = extractPayload(data)
  const token = payload.accessToken ?? payload.access_token ?? payload.token

  if (!token) {
    throw new Error('Server JWT token qaytarmadi.')
  }

  setAccessToken(token)
  authState.user = payload.user ?? null

  if (authState.user) {
    localStorage.setItem(USER_KEY, JSON.stringify(authState.user))
  } else {
    localStorage.removeItem(USER_KEY)
  }
}

export const register = (request: RegisterRequest) =>
  api.post('/users/register', request)

export const login = async (request: LoginRequest) => {
  const response = await api.post<AuthPayload | { data?: AuthPayload }>('/users/login', request)
  saveSession(response.data)
  return response
}

export const logout = (): void => {
  clearAccessToken()
  localStorage.removeItem(USER_KEY)
  authState.user = null
}

export const isAuthenticated = (): boolean => Boolean(getAccessToken())

export const getErrorMessage = (error: unknown, fallback: string): string => {
  if (typeof error === 'object' && error !== null && 'response' in error) {
    const response = error.response as { data?: { message?: string; error?: string } }
    return response.data?.message ?? response.data?.error ?? fallback
  }

  return error instanceof Error ? error.message : fallback
}

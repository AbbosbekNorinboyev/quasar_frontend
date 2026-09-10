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

type ApiUserResponse = {
  data?: AuthUser | ApiUserResponse
  result?: AuthUser | ApiUserResponse
  payload?: AuthUser | ApiUserResponse
  user?: AuthUser
  success?: boolean
  message?: string
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
  code?: number | string
  success?: boolean
  status?: string
  accessToken?: string
  access_token?: string
  token?: string
  jwt?: string
  jwtToken?: string
  message?: string
  user?: AuthUser
  data?: AuthPayload
  result?: AuthPayload
  payload?: AuthPayload
}

const storedUser = localStorage.getItem(USER_KEY)

export const authState = reactive<{ user: AuthUser | null }>({
  user: storedUser ? JSON.parse(storedUser) as AuthUser : null,
})

const extractPayload = (data: AuthPayload): AuthPayload => {
  let payload = data

  for (let depth = 0; depth < 4; depth += 1) {
    const nested = payload.data ?? payload.result ?? payload.payload

    if (!nested) {
      break
    }

    payload = nested
  }

  return payload
}

const saveSession = (data: AuthPayload): void => {
  const payload = extractPayload(data)

  if (payload.success === false || String(payload.code) === '401') {
    throw new Error(payload.message || 'Username yoki parol noto‘g‘ri.')
  }

  const token = payload.accessToken
    ?? payload.access_token
    ?? payload.token
    ?? payload.jwt
    ?? payload.jwtToken
    ?? payload.message

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
  const response = await api.post<AuthPayload>('/users/login', request)
  saveSession(response.data)
  return response
}

const extractUser = (data: AuthUser | ApiUserResponse): AuthUser => {
  let payload: AuthUser | ApiUserResponse = data

  for (let depth = 0; depth < 4; depth += 1) {
    if ('user' in payload && payload.user) {
      return payload.user
    }

    const nested = 'data' in payload
      ? payload.data
      : 'result' in payload
        ? payload.result
        : 'payload' in payload
          ? payload.payload
          : undefined

    if (!nested) {
      break
    }

    payload = nested
  }

  return payload as AuthUser
}

export const getMe = async (): Promise<AuthUser> => {
  const response = await api.get<AuthUser | ApiUserResponse>('/users/me')
  const user = extractUser(response.data)

  authState.user = user
  localStorage.setItem(USER_KEY, JSON.stringify(user))
  return user
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

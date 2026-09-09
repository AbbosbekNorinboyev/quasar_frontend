import api, {clearAccessToken, setAccessToken} from '@/api/axios'

export type User = {
  id?: number | string
  name: string
  email: string
  username?: string
  phoneNumber?: string
  role?: string
  status?: string
}

export type RegisterPayload = {
  fullName: string
  phoneNumber: string
  email: string
  username: string
  password: string
  birthDate: string
}

export type LoginPayload = {
  username: string
  password: string
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

export const register = async (payload: RegisterPayload): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/auth/register', payload)
  const token = getToken(response.data)

  if (token) {
    setAccessToken(token)
  }

  return response.data
}

export const login = async (payload: LoginPayload): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/auth/login', payload)
  const token = getToken(response.data)

  if (!token) {
    throw new Error('Login response does not contain a JWT access token')
  }

  setAccessToken(token)
  return response.data
}

export const logout = (): void => {
  clearAccessToken()
}

export const getUsers = async (): Promise<User[]> => {
  const response = await api.get<User[]>('/users')
  return response.data
}

export const getUser = async (id: number | string): Promise<User> => {
  const response = await api.get<User>(`/users/${id}`)
  return response.data
}

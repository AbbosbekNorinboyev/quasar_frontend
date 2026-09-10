import axios from 'axios'

const ACCESS_TOKEN_KEY = 'access_token'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:9090/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

export const getAccessToken = (): string | null => localStorage.getItem(ACCESS_TOKEN_KEY)

export const setAccessToken = (token: string): void => {
  localStorage.setItem(ACCESS_TOKEN_KEY, token)
}

export const clearAccessToken = (): void => {
  localStorage.removeItem(ACCESS_TOKEN_KEY)
}

api.interceptors.request.use((config) => {
  const token = getAccessToken()

  if (token) {
    config.headers.Authorization = ['Bearer', token].join(' ')
  }

  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      clearAccessToken()
    }

    return Promise.reject(error)
  },
)

export default api

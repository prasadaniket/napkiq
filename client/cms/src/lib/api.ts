import axios from 'axios'
import { getToken, getRefreshToken, saveTokens, clearSession } from '@/lib/auth'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://so-ta1t.onrender.com/api'

export const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
})

// Attach JWT from cookie to every request
api.interceptors.request.use((config) => {
  const token = getToken()
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

let isRefreshing = false
let refreshQueue: Array<(token: string) => void> = []

import { replaceStoneOven } from '@/utils/normalize'

// On 401 — try to refresh token once, then redirect to login
api.interceptors.response.use(
  (response) => {
    if (response.data) {
      response.data = replaceStoneOven(response.data)
    }
    return response
  },
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      const refreshToken = getRefreshToken()

      if (refreshToken) {
        if (isRefreshing) {
          // Queue requests while refresh is in progress
          return new Promise((resolve) => {
            refreshQueue.push((newToken) => {
              originalRequest.headers.Authorization = `Bearer ${newToken}`
              resolve(api(originalRequest))
            })
          })
        }

        isRefreshing = true
        try {
          const { data } = await axios.post(`${BASE_URL}/auth/refresh`, { refreshToken })
          const newToken = data.token

          saveTokens(newToken, data.refreshToken)

          // Flush queued requests
          refreshQueue.forEach((cb) => cb(newToken))
          refreshQueue = []

          originalRequest.headers.Authorization = `Bearer ${newToken}`
          return api(originalRequest)
        } catch {
          // Refresh failed — clear session and redirect
          clearSession()
          if (typeof window !== 'undefined') {
            window.location.href = '/login'
          }
        } finally {
          isRefreshing = false
        }
      } else {
        // No refresh token — go to login
        clearSession()
        if (typeof window !== 'undefined') {
          window.location.href = '/login'
        }
      }
    }

    return Promise.reject(error)
  }
)

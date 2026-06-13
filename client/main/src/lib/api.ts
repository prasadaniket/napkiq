import axios from 'axios'
import { mockApi } from './mock-api'

const realApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://so-ta1t.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Attach JWT token to CMS requests
realApi.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('cms_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
  }
  return config
})

import { replaceStoneOven } from '../utils/normalize'

// Redirect to login on 401
realApi.interceptors.response.use(
  (response) => {
    if (response.data) {
      response.data = replaceStoneOven(response.data)
    }
    return response
  },
  (error) => {
    if (error.response?.status === 401 && typeof window !== 'undefined') {
      const isCmsRoute = window.location.pathname.startsWith('/cms')
      if (isCmsRoute) {
        localStorage.removeItem('cms_token')
        localStorage.removeItem('cms_user')
        window.location.href = '/cms/login'
      }
    }
    return Promise.reject(error)
  }
)

const isMock = process.env.NEXT_PUBLIC_MOCK_API === 'true'

export const api = (isMock ? mockApi : realApi) as typeof realApi

// utils/axios.js
import axios from 'axios'
import { getSession } from 'next-auth/react'

const customFetch = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,

  // withCredentials: false, // tidak perlu kalau pakai Bearer token
  timeout: 60_000 // opsional, biar request gak ngegantung
})

// === Request Interceptor: sisipkan Bearer token ke semua request ===
customFetch.interceptors.request.use(
  async config => {
    // pastikan object headers ada
    config.headers = config.headers || {}

    // Ambil token dari NextAuth session (client-side)
    try {
      const session = await getSession()
      const token = session?.user?.accessToken

      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    } catch {
      // kalau getSession gagal, biarkan request jalan tanpa Authorization
    }

    // Catatan: untuk FormData, JANGAN set Content-Type manual.
    // Axios otomatis set boundary multipart saat body-nya instanceof FormData.

    return config
  },
  error => Promise.reject(error)
)

// === Response Interceptor: biarkan slice yang handle 401/err lainnya ===
customFetch.interceptors.response.use(
  res => res,
  error => {
    // Jangan swallow error—lempar ke thunk biar handleLogout/toast jalan
    return Promise.reject(error)
  }
)

export default customFetch

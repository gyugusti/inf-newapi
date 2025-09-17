import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

// ---- Prisma singleton (hindari koneksi dobel saat HMR di dev)
const globalForPrisma = globalThis
const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export const getUniqueValues = (data, key) => {
  if (!Array.isArray(data)) return []

  return [...new Set(data.map(item => item?.[key]))].filter(Boolean)
}

// Normalisasi expiry: terima ISO / epoch detik / epoch ms
const toEpochMs = value => {
  if (!value) return null
  if (typeof value === 'number') return value > 1e12 ? value : value * 1000

  if (typeof value === 'string') {
    const num = Number(value)

    if (!Number.isNaN(num)) return num > 1e12 ? num : num * 1000
    const t = Date.parse(value)

    return Number.isNaN(t) ? null : t
  }

  return null
}

export const authOptions = {
  debug: true,
  adapter: PrismaAdapter(prisma),

  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
        token: { label: 'Token', type: 'text' }
      },
      async authorize(credentials) {
        // Virtual Login (admin via token)
        if (credentials?.token) {
          try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/virtualLogin/${credentials.token}`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ token: credentials.token })
            })

            const raw = await res.json()
            const user = raw?.response

            if (res.ok && user) {
              const level = getUniqueValues(user.akses_inspeksi, 'nama')

              return {
                id: user.id,
                username: user.username,
                token: user.token,
                expired_token: user.expired_token ?? Date.now(),
                fas_id: user.fas_id,
                insp_master_id: user.insp_master_id,
                roles: level,
                accessToken: user.token,
                isVirtual: true
              }
            }

            return null
          } catch (err) {
            console.error('Virtual login error:', err)

            return null
          }
        }

        // Normal login (username/password)
        if (!process.env.NEXT_PUBLIC_API_URL) {
          console.error('❌ NEXT_PUBLIC_API_URL tidak ditemukan.')

          return null
        }

        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              username: credentials?.username,
              password: credentials?.password
            })
          })

          const data = await res.json()

          if (!res.ok) {
            console.error('❌ Gagal autentikasi:', data?.message)

            return null
          }

          const u = data.response
          const level = getUniqueValues(u?.akses_inspeksi, 'nama')

          return {
            id: u.id,
            username: u.username,
            token: u.token,
            expired_token: u.expired_token ?? Date.now(),
            fas_id: u.fas_id,
            insp_master_id: u.insp_master_id,
            roles: level,
            accessToken: u.token
          }
        } catch (err) {
          console.error('❌ Error di authorize:', err?.message || err)

          return null
        }
      }
    })
  ],

  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60
  },

  pages: {
    signIn: '/login',
    error: '/api/auth/error'
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.token || user.accessToken
        token.accessTokenExpires = user.expired_token
        token.id = user.id
        token.username = user.username
        token.fas_id = user.fas_id
        token.insp_master_id = user.insp_master_id
        token.roles = user.roles
        token.isVirtual = Boolean(user.isVirtual)
      }

      const expMs = toEpochMs(token.accessTokenExpires)

      if (expMs !== null && expMs < Date.now()) {
        console.warn('⚠️ Token expired, menghapus session...')

        return { expired: true }
      }

      return token
    },

    async session({ session, token }) {
      if (token?.expired || !token?.accessToken) {
        console.warn('⚠️ Token tidak valid.')

        return { ...session, user: null }
      }

      session.user = {
        id: token.id,
        name: token.username,
        accessToken: token.accessToken,
        accessTokenExpires: token.accessTokenExpires,
        fas_id: token.fas_id,
        insp_master_id: token.insp_master_id,
        roles: token.roles,
        isVirtual: Boolean(token.isVirtual)
      }

      return session
    }
  }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
